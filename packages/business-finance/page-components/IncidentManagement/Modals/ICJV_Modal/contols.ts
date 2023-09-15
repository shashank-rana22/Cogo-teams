interface Props {
	t?: Function;
}
const getControls = ({ t = () => {} }:Props) => [
	{
		Header   : t('incidentManagement:jv_number_header'),
		accessor : 'jvNum',
		id       : 'jv_number',
	},
	{
		Header   : t('incidentManagement:entity_label'),
		accessor : 'entityCode',
		id       : 'entity',
	},
	{
		Header   : t('incidentManagement:business_partner_label'),
		accessor : 'tradePartyName',
		id       : 'business_partner',
	},
	{
		Header   : t('incidentManagement:select_category_placeholder'),
		accessor : 'category',
		id       : 'category',
	},
	{
		Header   : t('incidentManagement:type_header'),
		accessor : 'type',
		id       : 'type',
	},
	{
		Header   : t('incidentManagement:currency_label'),
		accessor : 'currency',
		id       : 'currency',
	},
	{
		Header   : t('incidentManagement:exc_rate_label'),
		accessor : 'exchangeRate',
		id       : 'exc_rate',
	},
	{
		Header   : t('incidentManagement:amount_label'),
		accessor : 'amount',
		id       : 'amount',
	},
	{
		Header   : t('incidentManagement:description_header'),
		accessor : 'description',
		id       : 'description',
	},
];
export default getControls;
