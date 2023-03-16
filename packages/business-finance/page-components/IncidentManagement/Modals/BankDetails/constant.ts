export const options = (isEditable:boolean) => [
	{
		label    : 'Approve',
		value    : 'true',
		name     : '',
		disabled : !isEditable,
	},
	{
		label    : 'Reject',
		value    : 'false',
		name     : '',
		disabled : !isEditable,
	}];

export const optionsManual = (isEditable:boolean) => [
	{ label: 'Penny Testing', value: 'PENNY', name: '', disabled: !isEditable },
	{ label: 'Manual Verification', value: 'MANUAL', name: '', disabled: !isEditable },
];
