export const getTabs = (activeTab) => {
	const tabs = [
		{
			name: 'place_booking',
			title: 'Place Booking',
		},
		{
			name: 'upload_bn',
			title: 'Upload BN',
		},
		{
			name: 'completed',
			title: 'Completed',
		},
		{
			name: 'cancelled',
			title: 'Cancelled',
		},
	];
	const additionalTab = {
		fcl_freight: [
			{
				name: 'container_pick_up',
				title: 'Container Pick Up',
			},
		],
		air_freight: [
			{
				name: 'bn_uploaded',
				title: 'BN Uploaded',
			},
		],
	};
	if (additionalTab[activeTab]) {
		tabs.splice(2, 0, ...additionalTab[activeTab]);
	}
	return tabs;
};

export const tab_filter_mapping = (activeTab) => {
	const in_progress = [
		'shipment_received',
		'confirmed_by_importer_exporter',
		'in_progress',
	];

	const shipment_state = {
		in_progress,
		completed: [...in_progress, 'completed'],
		cancelled: ['cancelled'],
	};

	const filters = {
		place_booking: {
			place_booking_task: true,
		},
		upload_bn: {
			upload_bn_task: true,
		},
		container_pick_up: {
			container_pick_up_task: true,
		},
		bn_uploaded: {
			bn_uploaded_task: true,
		},
		completed: {
			completed_task: true,
		},
	};

	return {
		...filters[activeTab],
		state: shipment_state[activeTab] || shipment_state.in_progress,
	};
};