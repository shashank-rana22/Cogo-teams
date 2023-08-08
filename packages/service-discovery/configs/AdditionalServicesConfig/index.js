import fclIncotermsMapping from './FCL/fclIncotermsMapping.json';
import fclAdditionalServiceControls from './FCL/serviceControls';

export const defaultAddedServices = {
	ltl_freight     : ['ltl_freight'],
	ftl_freight     : ['ftl_freight'],
	trailer_freight : ['trailer_freight'],
	haulage_freight : ['haulage_freight'],
	fcl_customs     : ['fcl_customs'],
	lcl_customs     : ['lcl_customs'],
	air_customs     : ['air_customs'],
};

export const nonRemovableServices = [
	'fcl_freight',
	'fcl_freight_local',
	'lcl_freight',
	'lcl_freight_local',
	'air_freight',
];

export const nonRemovableServicesAir = [
	'air_freight',
	'terminal_inbound',
	'terminal_outbound',
];

export const serviceMappings = ({ service:primaryService, origin_country_id = '', destination_country_id = '' }) => {
	const serviceMap = {
		fcl_freight: {
			services : fclIncotermsMapping,
			controls : fclAdditionalServiceControls({ origin_country_id, destination_country_id }),
		},
	};

	const configureService = (type) => {
		const { services, controls } = serviceMap[type];

		return services.map((service) => {
			const serviceUpdated = { ...service };
			serviceUpdated.controls = [];

			controls.forEach((control) => {
				if (control.condition?.services?.find((s) => s === service.name)) {
					serviceUpdated.controls.push(control);
				}
			});

			return serviceUpdated;
		});
	};
	switch (primaryService) {
		case 'fcl_freight':
			return configureService('fcl_freight');
		case 'lcl_freight':
			return configureService('lcl_freight');
		case 'air_freight':
			return configureService('air_freight');
		case 'ftl_freight':
			return configureService('ftl_freight');
		case 'ltl_freight':
			return configureService('ltl_freight');
		case 'trailer_freight':
			return configureService('trailer_freight');
		case 'fcl_freight_local':
			return configureService('fcl_freight_local');
		default:
			return [];
	}
};
