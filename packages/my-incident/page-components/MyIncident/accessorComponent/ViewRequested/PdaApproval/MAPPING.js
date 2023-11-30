import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

const getFormatDate = (newdate) => {
	const [date, time] = newdate?.split(' ') || [];
	const [day, month, year] = date.split('-');
	const reversedDate = `${month}-${day}-${year} ${time}`;

	return formatDate(
		{ date: reversedDate, dateformat: GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'], formatType: 'date' },
	);
};

const getComponentMapping = ({ data = {} }) => [
	{
		label    : 'PDA APPROVAL',
		key      : 'pda_approval',
		subItems : [
			{
				subLabel : 'Shipment Id',
				subKey   : 'sid',
				value    : data?.sid || '...',
			},
			{
				subLabel : 'Total Buy Price',
				subKey   : 'buy_price',
				value    : data?.totalBuyPrice || '...',
			},
			{
				subLabel : 'Entity Code',
				subKey   : 'entity_code',
				value    : data?.entity || '...',
			},
			{
				subLabel : 'Registration Number',
				subKey   : 'regd_num',
				value    : data?.registrationNo || '...',
			},
		],
	},
	{
		label    : 'Invoice Details',
		key      : 'invoice_details',
		subItems : [
			{
				subLabel : 'Destination',
				subKey   : 'destination',
				value    : data?.placeOfDestination || '...',
			},
			{
				subLabel : 'Supply',
				subKey   : 'supply',
				value    : data?.placeOfSupply || '...',
			},
			{
				subLabel : 'Tax Applicable',
				subKey   : 'tax_aplicable',
				value    : data?.isTaxApplicable ? 'True' : 'False',
			},
			{
				subLabel : 'Document Date',
				subKey   : 'doc_date',
				value    : getFormatDate(data?.documentDate || ''),
			},
			{
				subLabel : 'Due Date',
				subKey   : 'due_date',
				value    : getFormatDate(data?.dueDate || ''),
			},
		],
	},
];

export default getComponentMapping;
