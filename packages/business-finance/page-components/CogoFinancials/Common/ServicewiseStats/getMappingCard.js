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
		stats : `${invoiceCount} Invoices | ${jobCount} Shipments`,
	},
	{
		label : 'Estimated Cost',
		key   : 'estimatedCost',
		value : displayAmount(mainCardData[`estimatedCost${taxType}`], currency),
		stats : `${invoiceCount} Invoices | ${jobCount} Shipments`,
	},
	{
		label : 'Estimated Profit',
		key   : 'estimatedProfit',
		value : displayAmount(mainCardData[`estimatedProfit${taxType}`], currency),
		stats : `${invoiceCount} Invoices | ${jobCount} Shipments`,
	},
];

export default getMappingCard;
