const KAM_TYPES = ['booking_agent', 'destination_booking_agent', 'origin_booking_agent'];

const userLoggedIn = ({ shipment_data = {} }) => {
	const { stakeholders = [] } = shipment_data || {};

	let kamLoggedIn = null;

	stakeholders.forEach((item) => {
		if (KAM_TYPES.includes(item?.stakeholder_type)) {
			kamLoggedIn = item?.stakeholder_type;
		}
	});

	return {
		kamLoggedIn: kamLoggedIn || 'booking_agent',
	};
};

export default userLoggedIn;
