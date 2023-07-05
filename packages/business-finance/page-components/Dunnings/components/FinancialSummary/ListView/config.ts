const config = {
	showHeader   : true,
	headerStyles : {
		background   : '#fff',
		marginTop    : '20px',
		padding      : '20px',
		color        : 'black',
		fontWeight   : '600',
		borderBottom : '2px solid #f68b21',
	},
	bodyStyles: {
		color      : ' #333333',
		fontWeight : '400',
		fontSize   : '14px',
		lineHeight : '30px',
		fontStyle  : 'normal',
	},
	fields: [
		{
			label : 'Customer Name',
			key   : 'tradePartyDetailName',
			func  : 'renderName',
			span  : 1.7,
		},
		{
			label : 'Total Outstanding',
			key   : 'outstandingAmount',
			func  : 'renderOutstandingAmount',
			span  : 1.7,

		},
		{
			label : 'On Account',
			key   : 'onAccountAmount',
			func  : 'renderOnAccount',
			span  : 1.7,

		},
		{
			label : 'Currency',
			key   : 'ledCurrency',
			span  : 1.7,

		},
		{
			label : 'Credit Controller',
			key   : 'organizationStakeholderName',
			func  : 'renderCreditController',
			span  : 1.7,

		},
		{
			label : 'Entity Code',
			key   : 'entityCode',
			span  : 1.7,

		},
		{
			label : 'Communication History',
			key   : 'communication',
			span  : 1.7,

		},
	],
};

export default config;
