const controls = [
	{
		label   : 'Status',
		name    : 'status',
		type    : 'multiSelect',
		options : [
			{ label: 'Active', value: 'active' },
			{ label: 'Inactive', value: 'inactive' },
		],
	},
	{
		label   : 'State',
		name    : 'state',
		type    : 'multiSelect',
		options : [
			{ label: 'Overview', value: 'overview' },
			{ label: 'Specification', value: 'specification' },
			{ label: 'Audience', value: 'audience' },
			{ label: 'Curriculum', value: 'curriculum' },
			{ label: 'Completion', value: 'completion' },
			{ label: 'Pre publish', value: 'pre_publish' },
			{ label: 'Published', value: 'published' },
		],
	},
	{
		label    : 'Filter By Tags',
		name     : 'faq_tag_id',
		type     : 'asyncSelect',
		multiple : true,
		asyncKey : 'faq_tags',
	},
	{
		label    : 'Filter By Topics',
		name     : 'faq_topic_id',
		type     : 'asyncSelect',
		multiple : true,
		asyncKey : 'faq_topics',
	},
];

export default controls;
