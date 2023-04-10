import officeLocations from './office-locations.json';

const getOfficeLocation = (office_id = '') => {
	const officeLocation = officeLocations.find((office_location) => office_location.value === office_id);

	return officeLocation.label;
};

export default getOfficeLocation;
