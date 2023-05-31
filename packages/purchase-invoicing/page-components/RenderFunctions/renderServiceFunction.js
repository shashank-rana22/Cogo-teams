import getFormattedAmount from '../../common/helpers/formatAmount';

export const renderFunction = {
	service       : (item) => (<div>{item?.name}</div>),
	currency      : (item) => (<div>{item?.currency}</div>),
	rate          : (item) => (<div>{item?.price}</div>),
	exchange_rate : (item) => (<div>{item?.exchange_rate?.toFixed(2)}</div>),
	quantity      : (item) => (<div>{item?.quantity}</div>),
	tax_amount    : (item) => (<div>{getFormattedAmount(item?.tax_price || 0, item?.currency)}</div>),
	cost          : (item) => (<div>{getFormattedAmount(item?.tax_total_price || 0, item?.currency)}</div>),
};
