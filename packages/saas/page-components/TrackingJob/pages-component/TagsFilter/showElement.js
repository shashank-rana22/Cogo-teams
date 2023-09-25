const getShowElements = ({ activeTab, controls = [] }) => {
	const showElements = controls.reduce((pv, cv) => {
		const { name = '' } = cv || {};

		let showElement = true;
		if (
			((name === 'shipping_line' || name === 'tags' || name === 'container_bill_no')
            && activeTab !== 'ocean_tracking')
		) {
			showElement = false;
		}
		if (
			(name === 'truck_no'
            && activeTab !== 'truck_tracking')
		) {
			showElement = false;
		}
		if (
			(name === 'serial_id'
            && activeTab === 'air_tracking')
		) {
			showElement = false;
		}

		if (
			name === 'airway_bill_no' && activeTab !== 'air_tracking'
		) {
			showElement = false;
		}
		return { ...pv, [name]: showElement };
	}, {});
	return showElements;
};

export default getShowElements;
