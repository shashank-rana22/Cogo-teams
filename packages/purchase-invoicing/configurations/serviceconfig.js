import getFormattedAmount from '../common/helpers/formatAmount';

export const serviceConfig = (service) => [
	{
		label : service || '',
		span  : 4.5,
		key   : 'service',
	},
	{
		label : 'Currency',
		span  : 1,
		key   : 'currency',
	},
	{
		label : 'Rate',
		span  : 2.5,
		key   : 'rate',
	},
	{
		label : 'Exc. Rate',
		span  : 1,
		key   : 'exchange_rate',
	},
	{
		label : 'Quantity',
		span  : 1,
		key   : 'quantity',
	},
	{
		label : 'Tax Amt.',
		span  : 2.5,
		key   : 'tax_amount',
	},
	{
		label : 'Cost',
		span  : 2,
		key   : 'cost',
	},
];

export const renderFunction = {
	service       : (item) => (<div>{item?.name}</div>),
	currency      : (item) => (<div>{item?.currency}</div>),
	rate          : (item) => (<div>{item?.price}</div>),
	exchange_rate : (item) => (<div>{item?.exchange_rate?.toFixed(2)}</div>),
	quantity      : (item) => (<div>{item?.quantity}</div>),
	tax_amount    : (item) => (<div>{getFormattedAmount(item?.tax_price || 0, item?.currency)}</div>),
	cost          : (item) => (<div>{getFormattedAmount(item?.tax_total_price || 0, item?.currency)}</div>),
};
