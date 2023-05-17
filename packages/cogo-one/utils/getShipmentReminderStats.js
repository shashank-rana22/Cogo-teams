const getShipmentReminderStats = (shipmentData) => [
	{ label: 'Today', value: shipmentData?.dayCount, target: 25, key: 'today' },
	{ label: 'This Week', value: shipmentData?.weekCount, target: 25, key: 'week' },
	{ label: 'This Month', value: shipmentData?.monthCount, target: 25, key: 'month' },
];
export default getShipmentReminderStats;
