const formatData = ({ bookingCount, active, callCount }) => {
	const data = [
		{
			eventType : 'Booking',
			booked    : bookingCount,
		},
		{
			eventType : 'Chats',
			chats     : active,
		},
		{
			eventType : 'Calls',
			calls     : callCount,
		},
	];

	return data;
};

export default formatData;
