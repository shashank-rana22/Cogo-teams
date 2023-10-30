import options from '../configurations/service-release-trigger-mapping';

const TRIGGER_OPTIONS_FIELDS = [
	'fcl_freight-import-short_transit',
	'fcl_freight-export-short_transit',
	'fcl_freight-import-long_transit',
	'fcl_freight-export-long_transit',
	'air_freight-import',
	'air_freight-export',
];

const getReleaseTriggerOptions = ({ service = '' }) => {
	if (!TRIGGER_OPTIONS_FIELDS.includes(service.value)) {
		return [];
	}

	const [serviceName] = service.value.split('_');

	return options[serviceName] || [];
};

export default getReleaseTriggerOptions;
