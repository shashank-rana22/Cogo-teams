export const ALLOT_BANK_CONFIG = {
	showHeader   : true,
	pageLimit    : 20,
	headerStyles : {
		borderRadius : '8px',
		background   : 'none',
		color        : 'black',
		marginLeft   : '8px',
	},
	bodyStyles: {
		color      : ' #333333',
		fontWeight : '400',
		fontSize   : '12px',
		borderTop  : '1.8px solid #F68B21',
	},
	fields: [
		{
			key  : 'select',
			span : 0.5,
			func : 'renderRadio',
		},
		{
			key   : 'bankAccounts',
			label : 'Bank Accounts',
			span  : 2.5,
			func  : 'renderBankDetails',
		},
		{
			label : 'Currency',
			key   : 'currency',
			func  : 'renderCurrency',
			span  : 1,
		},
		{
			label : 'Allocated Funds',
			key   : 'allocatedAmount',
			func  : 'renderAmountWithDetails',
			span  : 3.5,
		},
		{
			label : '',
			func  : 'renderPopoverIcon',
			span  : 0.7,
		},
		{
			label : 'Utilized Amount',
			key   : 'utilizedAmount',
			func  : 'renderAmount',
			span  : 1.5,
		},
		{
			label : 'Balance',
			key   : 'balance',
			func  : 'renderAmount',
			span  : 1.3,
		},
		{
			label : '',
			span  : 0.7,
			func  : 'renderRequestButton',
		},
	],
};
