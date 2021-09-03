module.exports = {
	matches: [
		 { regex: /^AD\b/,                       rss_name: 'adrobles.rss',          title: 'AD Robles'                     },
		 { regex: /^Campus Preacher LIVE:/i,     rss_name: 'campus.rss',            title: 'Campus Preacher LIVE'          },
		 { regex: /^Daily News Brief for/i,      rss_name: 'dailynews.rss',         title: 'Daily News Brief'              },
		 { regex: /^DOANE!T/i,                   rss_name: 'darrendoane.rss',       title: 'DOANE!T'                       },
		 { regex: /^MATT:/i,                     rss_name: 'mattwilliams.rss',      title: 'Matt Williams'                 },
		 { regex: /^MidWeek ?Fix/i,              rss_name: 'midweekfix.rss',        title: 'MidWeek Fix'                   },
		 { regex: /^REFORMGELICAL:/i,            rss_name: 'reformgelical.rss',     title: 'Reformgelical'                 },
		 { regex: /^The Patriarchy Podcast:/i,   rss_name: 'patriarchy.rss',        title: 'The Patriarchy Podcast'        },
		 { regex: /^The Theology Pugcast:/i,     rss_name: 'theologypugcast.rss',   title: 'The Theology Pugcast'          },
		 { regex: /^Waterbreak/i,                rss_name: 'waterbreak.rss',        title: 'Waterbreak w/ The Waterboy'    }
	],
	default: {                                 rss_name: 'everythingelse.rss',    title: 'Fight Laugh Feast (No Series)' }
}
