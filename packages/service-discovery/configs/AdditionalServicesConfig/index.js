import airIncotermsMapping from './AIR/airIncotermsMapping.json';
import airAdditionalServiceControls from './AIR/serviceControls';
import fclIncotermsMapping from './FCL/fclIncotermsMapping.json';
import fclAdditionalServiceControls from './FCL/serviceControls';
import ftlIncoTersmMapping from './FTL/ftlIncotermsMapping.json';

export const serviceMappings = ({
	service:primaryService,
	origin_country_id = '',
	destination_country_id = '',
	airport_id = '',
}) => {
	const serviceMap = {
		fcl_freight: {
			services : fclIncotermsMapping,
			controls : fclAdditionalServiceControls({ origin_country_id, destination_country_id }),
		},
		air_freight: {
			services : airIncotermsMapping,
			controls : airAdditionalServiceControls({ origin_country_id, destination_country_id, airport_id }),
		},
		ftl_freight: {
			services : ftlIncoTersmMapping,
			controls : [],
		},
	};

	const configureService = (type) => {
		const { services = [], controls = [] } = serviceMap[type] || {};

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

	return configureService(primaryService) || [];
};
