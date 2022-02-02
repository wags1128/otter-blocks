const attributes = {
	id: {
		type: 'string'
	},
	style: {
		type: 'string',
		default: 'grid'
	},
	postTypes: {
		type: 'array',
		default: []
	},
	columns: {
		type: 'number',
		default: 3
	},
	template: {
		type: 'array',
		default: [
			'category',
			'title',
			'meta',
			'description'
		]
	},
	categories: {
		type: 'array',
		items: {
			type: 'object'
		}
	},
	postsToShow: {
		type: 'number',
		default: 5
	},
	order: {
		type: 'string',
		default: 'desc'
	},
	orderBy: {
		type: 'string',
		default: 'date'
	},
	offset: {
		type: 'number',
		default: 0
	},
	imageSize: {
		type: 'string',
		default: 'full'
	},
	imageBoxShadow: {
		type: 'boolean',
		default: true
	},
	displayFeaturedImage: {
		type: 'boolean',
		default: true
	},
	displayCategory: {
		type: 'boolean',
		default: true
	},
	displayTitle: {
		type: 'boolean',
		default: true
	},
	titleTag: {
		type: 'string',
		default: 'h5'
	},
	displayMeta: {
		type: 'boolean',
		default: true
	},
	displayDescription: {
		type: 'boolean',
		default: true
	},
	excerptLength: {
		type: 'number',
		default: 100
	},
	displayDate: {
		type: 'boolean',
		default: true
	},
	displayAuthor: {
		type: 'boolean',
		default: true
	},
	displayComments: {
		type: 'boolean',
		default: true
	},
	displayPostCategory: {
		type: 'boolean',
		default: false
	},
	displayReadMoreLink: {
		type: 'boolean',
		default: false
	},
	cropImage: {
		type: 'boolean',
		default: false
	},
	enableCustomFontSize: {
		type: 'boolean'
	},
	customFontSize: {
		type: 'number'
	},
	borderRadius: {
		type: 'number'
	},
	textAlign: {
		type: 'string'
	},
	verticalAlign: {
		type: 'string'
	},
	enableFeaturedPost: {
		type: 'boolean'
	},
	featuredPost: {
		type: 'string'
	}
};

export default attributes;
