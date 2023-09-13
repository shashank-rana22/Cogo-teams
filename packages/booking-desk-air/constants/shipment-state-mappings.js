const getShipmentStateMappings = (t = () => {}) => [
	{
		name  : 'ongoing',
		title : t('airBookingDesk:shipment_state_ongoing'),
	},
	{
		name  : 'completed',
		title : t('airBookingDesk:shipment_state_completed'),
	},
	{
		name  : 'cancelled',
		title : t('airBookingDesk:shipment_state_cancelled'),
	},
];
export default getShipmentStateMappings;
