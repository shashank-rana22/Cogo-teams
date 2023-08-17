export const handleTruckServices = (allTruckDetails) => {
	const trucks = Object.entries(allTruckDetails)?.reduce((acc, [key, values]) => {
		Object.keys(values || []).forEach((truckItem) => {
			const eachTruck = allTruckDetails[key][truckItem] || [];
			eachTruck.forEach((truck) => acc.push(truck));
		});

		return acc;
	}, []);
	return trucks;
};

export const handleServiceIdForTruck = (allTrucks, services) => {
	const tempTrucks = [...(allTrucks || [])];
	services.forEach((serviceItem) => {
		tempTrucks.some((tempTruck) => {
			const temp = tempTruck;
			if (tempTruck.truck_type === serviceItem.truck_type && !tempTruck.isSelect) {
				temp.service_id = serviceItem.id;
				temp.isSelect = true;
				return true;
			}
			return false;
		});
	});

	return tempTrucks;
};
