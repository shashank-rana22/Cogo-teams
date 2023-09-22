import options from '../configurations/service-release-trigger-mapping';

const TRIGGER_OPTIONS_FIELDS = [
	'fcl_freight-short_transit-import',
	'fcl_freight-short_transit-export',
	'fcl_freight-long_transit-import',
	'fcl_freight-long_transit-export',
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
