const DEFAULT_UNIT = 1;
interface Props {
	t?: Function;
}
export const getOverHeadConfigs = ({ t = () => {} }:Props) => [
	{
		Header   : t('incidentManagement:name_header'),
		accessor : 'name',
		id       : 'name',
	},
	{
		Header   : t('incidentManagement:unit_header'),
		accessor : 'unit',
		id       : 'unit',
		Cell     : () => DEFAULT_UNIT,
	},
	{
		Header   : t('incidentManagement:currency_label'),
		accessor : 'currency',
		id       : 'currency',
	},
	{
		Header   : t('incidentManagement:exc_rate_label'),
		accessor : 'exchangeRate',
		id       : 'exchangeRate',
	},
	{
		Header   : t('incidentManagement:price_header'),
		accessor : 'price',
		id       : 'price',
	},
	{
		Header   : t('incidentManagement:quantity_header'),
		accessor : 'quantity',
		id       : 'quantity',
	},
	{
		Header   : t('incidentManagement:sub_total_header'),
		accessor : 'subTotal',
		id       : 'subTotal',
	},
	{
		Header   : t('incidentManagement:grand_total'),
		accessor : 'total',
		id       : 'grandTotal',
	},
];
