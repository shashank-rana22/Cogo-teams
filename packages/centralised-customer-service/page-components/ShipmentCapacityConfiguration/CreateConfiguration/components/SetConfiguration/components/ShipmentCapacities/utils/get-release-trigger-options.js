import options from '../configurations/service-release-trigger-mapping';

const getReleaseTriggerOptions = ({ service = '' }) => {
	const [serviceName] = service.value.split('_');

	return options[serviceName] || [];
};

export default getReleaseTriggerOptions;
