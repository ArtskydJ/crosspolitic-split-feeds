module.exports = podcast_rss_text => {
	const [ , begin_channel, all_items, end_channel ] = podcast_rss_text.match(/^([\s\S]+?(?=<item>))(<item>[\s\S]+<\/item>)([\s\S]+)$/)
	const [ , ...items ] = all_items.replace(/<\/item>/g, '').split(/<item>/).map(i => `<item>${i}</item>`)
	return { begin_channel, items, end_channel }
}
