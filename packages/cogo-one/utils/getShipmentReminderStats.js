const getShipmentReminderStats = (shipmentData) => [
	{ label: 'This Week', value: shipmentData?.weekCount, target: 6, key: 'week' },
	{ label: 'This Month', value: shipmentData?.monthCount, target: 25, key: 'month' },
];
export default getShipmentReminderStats;
