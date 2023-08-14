import formatCount from '../../utils/formatCount';

const DEFAULT_VALUE = 0;

const getCardData = ({
	displayAmount = () => {}, mainCardData = {},
	invoiceCount = 0, taxType = '', currency = '', jobCount = 0,
}) => [
	{
		label : 'Estimated Revenue',
		value : displayAmount(mainCardData[`estimatedRevenue${taxType}`], currency),
		stats : `${formatCount(invoiceCount)} Invoices | ${formatCount(jobCount)} Shipments`,
	},
	{
		label : 'Estimated Cost',
		value : displayAmount(mainCardData[`estimatedCost${taxType}`], currency),
		stats : `${formatCount(invoiceCount)} Invoices | ${formatCount(jobCount)} Shipments`,
	},
	{
		label       : 'Estimated Profit',
		value       : displayAmount(mainCardData[`estimatedProfit${taxType}`], currency),
		stats       : `${formatCount(invoiceCount)} Invoices | ${formatCount(jobCount)} Shipments`,
		profitColor : Number(mainCardData[`estimatedProfit${taxType}`] || DEFAULT_VALUE) > DEFAULT_VALUE
			? '#abcd62' : '#ee3425',
	},
];

export default getCardData;
