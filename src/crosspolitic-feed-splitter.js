const fs = require(`fs`)
const path = require(`path`)
const fetch = require(`node-fetch`)

const split_rss = require(`./split-rss.js`)
const new_feed_definitions = require('./new-feed-definitions.js')

const fetch2 = (...args) => {
	return fetch(...args)
		.then(r => {
			if (!r.ok) {
				throw new Error(r.status)
			}
			return r.text()
		})
}

const resolve = filename => path.join(__dirname, filename)
const read_file = filename => fs.readFileSync(resolve(filename), { encoding: `utf-8` })
const write_file = (filename, text) => fs.writeFileSync(resolve(filename), text, { encoding: `utf-8` })
const write_file_json = (filename, obj) => write_file(resolve(filename), JSON.stringify(obj, null, `\t`))

const get_rss_url = rss_name => `https://artskydj.github.io/crosspolitic-split-feeds/rss/${ rss_name }`

const main = async() => {
	const body = await fetch2(`https://crosspolitic.com/feed/podcast`)
	write_file(`../tmp/crosspolitic.rss`, body)
	// const body = read_file(`../tmp/crosspolitic.rss`)

	const { begin_channel, items, end_channel } = split_rss(body)

	const bins = {}

	items.forEach(rss_item => {
		const [ , item_title ] = rss_item.match(/<title>(.+?)<\/title>/)
		const { rss_name } =
			new_feed_definitions.matches.find(({ regex }) => regex.test(item_title)) ||
			new_feed_definitions.default

		if (!bins[rss_name]) {
			bins[rss_name] = []
		}
		bins[rss_name].push(rss_item)
	})

	const all_new_feed_definitions = [
		...new_feed_definitions.matches,
		new_feed_definitions.default,
	]

	all_new_feed_definitions.forEach(({ rss_name, title }) => {
		const new_begin_channel = begin_channel
			.replace(/<title>.+?<\/title>/, `<title>FLF - ${ title }</title>`)
			.replace(/<atom:link href=".+?"/, `<atom:link href="${ get_rss_url(rss_name) }"`)
		const new_feed_items = bins[rss_name]
		const new_feed = [ new_begin_channel, ...new_feed_items, end_channel ].join(``)
		write_file(`../rss/${ rss_name }`, new_feed)
	})

	const markdown_list = all_new_feed_definitions
		.map(({ rss_name, title }) => `- [${ title }](${ get_rss_url(rss_name) })`)
		.join(`\n`)
	const current_readme = read_file(`../README.md`)
	const new_readme = current_readme
		.replace(
			/<!-- autogenerated below -->[\s\S]*?<!-- autogenerated above -->/,
			`<!-- autogenerated below -->\n${ markdown_list }\n<!-- autogenerated above -->`
		)
	write_file(`../README.md`, new_readme)
}

main()
