const rateNotSatisfactoryControls = ({ freight_price_currency = '', unit = '' }) => [
	{
		label         : `Indicative Rate (${unit})`,
		type          : 'price-select',
		name          : 'unsatisfactory_rate.preferred_freight_rate',
		value         : { currency: freight_price_currency },
		rules         : { required: 'Enter valid Rate', min: 1 },
		span          : 12,
		divWidth      : '100%',
		elementStyles : { width: 'calc(50% - 12px)' },
	},
	{
		label    : 'Remarks',
		type     : 'textarea',
		name     : 'unsatisfactory_rate.remarks',
		rows     : 3,
		divWidth : 'calc(50% - 12px)',
		span     : 6,
	},
	{
		label     : 'Upload Feedback Doc',
		type      : 'upload',
		name      : 'unsatisfactory_rate.file_upload',
		accept    : 'image/*,.jpg,.png,.svg,.pdf,.doc,.docx',
		span      : 6,
		divWidth  : 'calc(50% - 12px)',
		draggable : true,
	},
];

export default rateNotSatisfactoryControls;
