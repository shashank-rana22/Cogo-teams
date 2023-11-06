function buttonOptions({
	setModalData = () => {},
	eachMessage = {},
	activeMessageCard = {},
}) {
	return [
		{
			children : 'Details',
			onClick  : (e) => {
				e.stopPropagation();
				setModalData({
					message : eachMessage,
					room    : activeMessageCard,
				});
			},
		},
	];
}

export default buttonOptions;
