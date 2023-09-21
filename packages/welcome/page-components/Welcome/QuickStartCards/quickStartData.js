const getQuickStartCardsData = (t) => [
	{
		icon_url : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/5e55951dc5c767209d2a814ab67513ed.png',
		heading  : t('welcome:courses_and_reading_heading'),
		title    : t('welcome:courses_and_reading_title'),
		desc     : t('welcome:courses_and_reading_desc'),
		href     : {
			label : t('welcome:courses_and_reading_label'),
			url   : 'https://cogofreight.sharepoint.com/sites/TheCogoAcademy',
		},
		tag: {
			icon:
			'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/5ee4739e9bb4824e5c4dfbe28d653825.png',
			courses_text     : t('welcome:courses_and_reading_text'),
			assignments_text : t('welcome:tests_and_reading_text'),
		},
	},
	{
		icon_url : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/fe815422ac1e8452fb632963d08b89e4.png',
		heading  : t('welcome:frequently_answered_heading'),
		title    : t('welcome:frequently_answered_title'),
		desc     : t('welcome:frequently_answered_desc'),
		href     : {
			label : t('welcome:frequently_answered_label'),
			url   : '/learning/faq',
		},
		tag: {
			icon : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ecaf5d5b92d1df3a2fdc8640c75c1b3f.png',
			text : t('welcome:frequently_answered_text'),
		},
	},
	{
		icon_url : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/fcdbcbfa0579ec5e2cab4fbdbcf3461b.png',
		heading  : t('welcome:self_assessment_heading'),
		title    : t('welcome:self_assessment_title'),
		desc     : t('welcome:self_assessment_desc'),
		href     : {
			label : t('welcome:self_assessment_label'),
			url   : '/learning/tests/dashboard',
		},
		tag: {
			icon : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/bfbd2c04474a1b6b03e66d9aa0a9f444.png',
			text : t('welcome:self_assessment_text'),
		},
	},
];
export default getQuickStartCardsData;
