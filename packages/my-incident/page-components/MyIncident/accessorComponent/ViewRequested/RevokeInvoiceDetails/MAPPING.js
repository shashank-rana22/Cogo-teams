const getComponentMapping = ({ data = {} }) => [
	{
		label    : 'Details',
		key      : 'invoice',
		subItems : [
			{
				subLabel : 'Invoice no. ',
				subKey   : 'invoice_no',
				value    : data?.invoiceNumber || '...',
			},
			{
				subLabel : 'Cancellation Reason',
				subKey   : 'cancel_reason',
				value    : data?.cancelReason || '...',
			},
		],
	},

];

export default getComponentMapping;
