import formatCount from '../../utils/formatCount';

const DEFAULT_VALUE = 0;

const getMappingCard = ({
	displayAmount = () => {},
	mainCardData = {}, taxType = '',
	currency = '',
	invoiceCount = 0, jobCount = 0,
}) => [
	{
		label : 'Estimated Revenue',
		key   : 'estimatedRevenue',
		value : displayAmount(mainCardData[`estimatedRevenue${taxType}`], currency),
		stats : `${formatCount(invoiceCount)} Invoices | ${formatCount(jobCount)} Shipments`,
	},
	{
		label : 'Estimated Cost',
		key   : 'estimatedCost',
		value : displayAmount(mainCardData[`estimatedCost${taxType}`], currency),
		stats : `${formatCount(invoiceCount)} Invoices | ${formatCount(jobCount)} Shipments`,
	},
	{
		label       : 'Estimated Profit',
		key         : 'estimatedProfit',
		value       : displayAmount(mainCardData[`estimatedProfit${taxType}`], currency),
		stats       : `${formatCount(invoiceCount)} Invoices | ${formatCount(jobCount)} Shipments`,
		profitColor : Number(mainCardData[`estimatedProfit${taxType}`] || DEFAULT_VALUE) > DEFAULT_VALUE
			? '#abcd62' : '#ee3425',
	},
];

export default getMappingCard;
