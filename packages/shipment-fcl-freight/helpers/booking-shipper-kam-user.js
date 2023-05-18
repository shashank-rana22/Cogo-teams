const kamTypes = ['booking_agent', 'destination_booking_agent', 'origin_booking_agent'];

const userLoggedIn = ({ shipment_data = {} }) => {
	const { stakeholders = [] } = shipment_data || {};

	let kamLoggedIn = false;

	stakeholders.forEach((item) => {
		if (kamTypes.includes(item?.stakeholder_type)) {
			kamLoggedIn = item?.stakeholder_type;
		}
	});

	return {
		kamLoggedIn,
	};
};

export default userLoggedIn;
