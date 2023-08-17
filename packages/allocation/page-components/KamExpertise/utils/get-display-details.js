const getDisplayDetails = ({ shipment_mode, details }) => {
	const oceanAttributes = ['container_count', 'container_size', 'volume', 'weight', 'hs_codes'];

	let arr = [];

	const displayContainerSizes = () => {
		const containerDetails = (details?.container_size || []).map((item) => {
			if (item.includes('HC')) {
				return item;
			}
			return `${item}ft`;
		});

		return containerDetails;
	};

	if (shipment_mode === 'ocean') {
		arr = oceanAttributes.map((attr) => {
			switch (attr) {
				case 'container_count':
					return `${details?.container_count} Ctrs`;
				case 'container_size':
					return displayContainerSizes().join(', ');
				case 'volume':
					return `${details?.volume} cbm`;
				case 'weight':
					return `${details?.weight} kg`;
				case 'hs_codes':
					return details?.hs_codes.join('  ');
				default:
					return null;
			}
		});
	}

	return arr;
};

export default getDisplayDetails;
