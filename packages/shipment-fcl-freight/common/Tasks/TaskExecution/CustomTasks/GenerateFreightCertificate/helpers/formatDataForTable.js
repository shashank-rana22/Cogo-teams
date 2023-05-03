const formatDataForTable = (services, data) => {
	const servicesdata = services?.filter(
		(service) => service?.service_type === 'fcl_freight_service',
	);

	const containersData = data?.map((item, idx) => ({
		serial_no        : idx + 1,
		container_number : item?.container_number,
		container_size   : item?.container_size,
		container_type   : item?.container_type,
		is_hazardous     : false,
	}));

	(containersData || []).forEach((element, idx) => {
		const temp = (servicesdata || []).filter(
			(service) => service?.container_size === element?.container_size,
		);
		containersData[idx].is_hazardous = temp?.[0]?.is_hazardous || false;
	});

	const getControls = () => {
		if (containersData?.length) {
			return containersData?.reduce((previousControls, currentItem) => {
				const { serial_no, container_size, container_type } = currentItem || {};

				const itemControl = {
					name    : `is_hazardous-${serial_no}`,
					type    : 'select',
					options : [
						{
							label : 'Hazardous',
							value : `hazardous-${container_size}-${container_type}`,
						},
						{
							label : 'Non-Hazardous',
							value : `non_hazardous-${container_size}-${container_type}`,
						},
					],
					placeholder    : 'Select...',
					defaultOptions : true,
				};

				return [...(previousControls || {}), { ...itemControl }];
			}, []);
		}

		return [];
	};

	const controls = getControls();

	return {
		containersData,
		controls,
	};
};

export default formatDataForTable;
