import airCustomsControls from '../../../../../configurations/controls/air-customs-controls';
import airLocalChargesControls from '../../../../../configurations/controls/air-local-charges-controls';
import airSurchargeControls from '../../../../../configurations/controls/air-surcharge';
import cfsControls from '../../../../../configurations/controls/fcl-cfs-controls';
import fclCustomsControls from '../../../../../configurations/controls/fcl-customs';
import fclLocalChargesControls from '../../../../../configurations/controls/fcl-local-charges-controls';
import ftlControls from '../../../../../configurations/controls/ftl-controls';
import haulageControls from '../../../../../configurations/controls/haulage-controls';
import ltlControls from '../../../../../configurations/controls/ltl-controls';
import trailerControls from '../../../../../configurations/controls/trailer-control';

const configuration = (
	chargeName,
	additionalService,
	payload,
	trade_type,
	containerDetails,
) => {
	const PREFILLED_VALUES = {};
	switch (chargeName) {
		case 'fcl_freight_local':
			return fclLocalChargesControls(payload);
		case 'air_freight_local':
			return airLocalChargesControls(payload);
		case 'haulage_freight':
			Object.keys(additionalService).forEach((service) => {
				if (
					additionalService[service].service_type === 'haulage_freight'
				&& additionalService[service].trade_type === trade_type
				) {
					PREFILLED_VALUES.origin_location_id = additionalService[service].origin_location_id
					|| payload?.destination_main_port_id;
					PREFILLED_VALUES.destination_location_id = additionalService[service].destination_location_id
					|| payload?.origin_main_port_id;
					PREFILLED_VALUES.container_size = containerDetails.container_size;
					PREFILLED_VALUES.container_type = containerDetails.container_type;
					PREFILLED_VALUES.commodity = containerDetails?.commodity;
					PREFILLED_VALUES.service_provider = payload?.service_provider_id;
				}
			});
			return haulageControls(PREFILLED_VALUES);
		case 'trailer_freight':
			Object.keys(additionalService).forEach((service) => {
				if (
					additionalService[service].service_type === 'trailer_freight'
				&& additionalService[service].trade_type === trade_type
				) {
					PREFILLED_VALUES.origin = additionalService[service].origin_location_id;
					PREFILLED_VALUES.destination = additionalService[service].destination_location_id;
					PREFILLED_VALUES.container_size = containerDetails.container_size;
					PREFILLED_VALUES.container_type = containerDetails.container_type;
					PREFILLED_VALUES.commodity = containerDetails?.commodity;
				}
			});

			return trailerControls({ ...PREFILLED_VALUES });

		case 'fcl_customs':
			PREFILLED_VALUES.container_size = containerDetails?.container_size;
			PREFILLED_VALUES.container_type = containerDetails?.container_type;
			PREFILLED_VALUES.commodity = containerDetails?.commodity;
			Object.keys(additionalService).forEach((service) => {
				if (
					additionalService[service].service_type === 'fcl_customs'
				&& additionalService[service].trade_type === trade_type
				) {
					PREFILLED_VALUES.port_id = additionalService[service].port_id
					|| additionalService[service].port?.id;
					PREFILLED_VALUES.service_provider = payload?.service_provider_id;
					PREFILLED_VALUES.trade_type = additionalService[service].trade_type;
				}
			});
			return fclCustomsControls(PREFILLED_VALUES);

		case 'air_customs':
			PREFILLED_VALUES.container_size = containerDetails?.container_size;
			PREFILLED_VALUES.container_type = containerDetails?.container_type;
			PREFILLED_VALUES.commodity = containerDetails?.commodity;
			Object.keys(additionalService).forEach((service) => {
				if (
					additionalService[service].service_type === 'air_customs'
				&& additionalService[service].trade_type === trade_type
				) {
					PREFILLED_VALUES.airport_id = additionalService[service]?.airport_id
					|| additionalService[service]?.airport?.id;
					PREFILLED_VALUES.service_provider = payload?.service_provider_id;
					PREFILLED_VALUES.trade_type = additionalService[service].trade_type;
				}
			});
			return airCustomsControls(PREFILLED_VALUES);
		case 'fcl_cfs':
			PREFILLED_VALUES.container_size = containerDetails?.container_size;
			PREFILLED_VALUES.container_type = containerDetails?.container_type;
			PREFILLED_VALUES.commodity = containerDetails?.commodity;
			Object.keys(additionalService).forEach((service) => {
				if (
					additionalService[service].service_type === 'fcl_cfs'
				&& additionalService[service].trade_type === trade_type
				) {
					PREFILLED_VALUES.port_id = additionalService[service].port_id;
					PREFILLED_VALUES.trade_type = additionalService[service].trade_type;
					PREFILLED_VALUES.cargo_handling_type = additionalService[service].cargo_handling_type;
				}
			});
			return cfsControls(PREFILLED_VALUES);

		case 'ltl_freight':
			Object.keys(additionalService).forEach((service) => {
				if (
					additionalService[service].service_type === 'ltl_freight'
				&& additionalService[service].trade_type === trade_type
				) {
					PREFILLED_VALUES.originType = additionalService[service]?.origin_location?.type;
					PREFILLED_VALUES.destinationType = additionalService[service]?.destination_location?.type;
					PREFILLED_VALUES.origin = additionalService[service].origin_location_id;
					PREFILLED_VALUES.destination = additionalService[service].destination_location_id;
					PREFILLED_VALUES.container_size = containerDetails.container_size;
					PREFILLED_VALUES.container_type = containerDetails.container_type;
					PREFILLED_VALUES.commodity = containerDetails.commodity;
				}
			});
			return ltlControls({ ...PREFILLED_VALUES });

		case 'ftl_freight':
			Object.keys(additionalService).forEach((service) => {
				if (
					additionalService[service].service_type === 'ftl_freight'
				&& additionalService[service].trade_type === trade_type
				) {
					PREFILLED_VALUES.origin = additionalService[service].origin_location_id;
					PREFILLED_VALUES.destination = additionalService[service].destination_location_id;
					PREFILLED_VALUES.container_size = containerDetails.container_size;
					PREFILLED_VALUES.container_type = containerDetails.container_type;
					PREFILLED_VALUES.commodity = containerDetails?.commodity;
				}
			});
			return ftlControls({ ...PREFILLED_VALUES });
		default:
	}

	return airSurchargeControls;
};

export default configuration;
