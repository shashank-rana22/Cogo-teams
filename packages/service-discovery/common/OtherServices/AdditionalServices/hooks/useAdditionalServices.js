import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import getCountryDetails from '@cogoport/globalization/utils/getCountryDetails';
import { useState } from 'react';

import { serviceMappings } from '../../../../configs/AdditionalServicesConfig';
import incoterms from '../../../../configs/incoterms.json';
import getAddedServices from '../getAddedServices';
import getCombinedServiceDetails from '../utils/getCombinedServiceDetails';
import getNonRemoveableServices from '../utils/getNonRemoveableServices';
import getServiceName from '../utils/getServiceName';

const OTHER_SERVICES_ARRAY = ['cargo_insurance', 'warehouse'];

const TRANSPORTATION_SERVICES = ['ftl_freight', 'ltl_freight', 'trailer_freight'];
const singleLocationServices = ['fcl_freight_local'];

const useAdditionalServices = ({ rateCardData = {}, detail = {}, source = '' }) => {
	const { country: { id: countryId = '' } } = getGeoConstants();

	const COUNTRY_CODE = getCountryDetails({
		country_id: countryId,
	})?.country_code;

	const cargoInsuranceSupportedServices = GLOBAL_CONSTANTS.cargo_insurance[COUNTRY_CODE] || [];

	const { service_rates = [] } = rateCardData;

	const {
		service_details = {},
		service_type:primaryService = '',
		trade_type = '',
		inco_term = '',
		destination_country_id = '',
		origin_country_id = '',
	} = detail;

	const finalServiceDetails = getCombinedServiceDetails(service_details, service_rates);

	const [incoTermModalData, setIncoTermModalData] = useState({});

	const isSingleLocationService = singleLocationServices.includes(primaryService);

	const servicesArray = serviceMappings({
		service    : primaryService,
		destination_country_id,
		origin_country_id,
		airport_id : trade_type === 'export' ? detail?.origin_airport_id : detail?.destination_airport_id,
	});

	const SERVICE_DATA = {};

	Object.keys(finalServiceDetails).forEach((serviceId) => {
		const serviceItem = finalServiceDetails[serviceId];

		const serviceName = getServiceName(serviceItem, primaryService);

		if (!SERVICE_DATA[serviceName]) {
			SERVICE_DATA[serviceName] = [];
		}

		SERVICE_DATA[serviceName].push(serviceItem);
	});

	if (cargoInsuranceSupportedServices.includes(primaryService)) {
		servicesArray.unshift({
			name         : 'cargo_insurance',
			service_type : 'cargo_insurance',
			title        : 'Cargo Insurance',
			inco_terms   : ['cif', 'cfr', 'cpt', 'cip', 'dat', 'dap', 'ddp', 'exw', 'fca', 'fob', 'fas'],
		});
	}

	const ALL_SERVICES = [];

	servicesArray.forEach((service) => {
		if (service.service_type === 'haulage_freight') {
			if (isSingleLocationService && !detail.port?.is_icd) {
				return;
			}

			if (
				!isSingleLocationService
				&& service.trade_type === 'export'
				&& !detail.origin_port?.is_icd
			) {
				return;
			}

			if (
				!isSingleLocationService
				&& service.trade_type === 'import'
				&& !detail.destination_port?.is_icd
			) {
				return;
			}
		}

		let isSelected = !!SERVICE_DATA[service.name];

		const TEMP_SERVICE_NAMES = [];

		if (
			service.name.includes('air_freight_local')
			&& Object.keys(SERVICE_DATA).includes('domestic_air_freight_local')
		) {
			SERVICE_DATA.domestic_air_freight_local.forEach((element) => {
				let name = '';
				if (element?.terminal_charge_type === 'outbound') {
					name = 'export';
				} else if (element?.terminal_charge_type === 'inbound') {
					name = 'import';
				}

				TEMP_SERVICE_NAMES.push(`${name}_${element.service_type}`);
			});
		}

		if (TEMP_SERVICE_NAMES.includes(service.name)) {
			isSelected = true;
		}

		let transportationData = null;

		if (service.name.includes('transportation')) {
			transportationData = SERVICE_DATA[`${service.trade_type}_ltl_freight`]
				|| SERVICE_DATA[`${service.trade_type}_ftl_freight`]
				|| SERVICE_DATA[`${service.trade_type}_trailer_freight`];

			isSelected = !!transportationData;
		}

		ALL_SERVICES.push({
			...service,
			data: service.name.includes('transportation')
				? transportationData
				: SERVICE_DATA[service.name],
			isSelected,
			rateData: Object.values(finalServiceDetails).filter(
				(serviceItem) => {
					if (TRANSPORTATION_SERVICES.includes(serviceItem.service_type)
					&& primaryService !== serviceItem.service_type) {
						return service.name === `${serviceItem.trade_type}_transportation`;
					}

					return getServiceName(serviceItem, primaryService) === service.name;
				},
			),
			source: rateCardData.source,
		});
	});

	// const { startingPrices = [], loading: startingPriceLoading } = useGetMinPrice({
	// 	allServices: ALL_SERVICES,
	// 	total_price_currency,
	// 	detail,
	// 	rateCardData,
	// });

	const filteredAllServices = ALL_SERVICES.filter(
		(service_item) => service_item?.inco_terms?.includes(inco_term) || service_item.isSelected,
	);

	const ORIGIN_SERVICES = [];
	const DESTINATION_SERVICES = [];
	const MAIN_SERVICES = [];
	const OTHER_SERVICES = [];
	const SUBSIDIARY_SERVICES = getAddedServices(finalServiceDetails);

	(source === 'checkout' ? filteredAllServices : ALL_SERVICES).forEach((item) => {
		if (item.name.includes('import')) {
			DESTINATION_SERVICES.push(item);
		} else if (item.name.includes('export')) {
			ORIGIN_SERVICES.push(item);
		} else if (OTHER_SERVICES_ARRAY.includes(item.name)) {
			OTHER_SERVICES.push(item);
		} else MAIN_SERVICES.push(item);
	});

	const SERVICES_CANNOT_BE_REMOVED = getNonRemoveableServices({ trade_type, source, main_service: primaryService });

	const SERVICES_LIST_MAPPING = {
		shipper_side_services: {
			key  : 'origin_services',
			type : 'origin',
			list : ORIGIN_SERVICES,
		},
		main_service: {
			key  : 'main_service',
			type : 'main_service',
			list : MAIN_SERVICES,
		},
		buyer_side_services: {
			key  : 'destination_services',
			type : 'destination',
			list : DESTINATION_SERVICES,
		},
		other_services: {
			key  : 'other_services',
			type : 'other_services',
			list : OTHER_SERVICES,
		},
		subsidiary_services: {
			key  : 'subsidiary_services',
			type : 'subsidiary_services',
			list : SUBSIDIARY_SERVICES,
		},
	};

	return {
		incoTermOptions: incoterms,
		incoTermModalData,
		setIncoTermModalData,
		SERVICES_LIST_MAPPING,
		SERVICES_CANNOT_BE_REMOVED,
	};
};
export default useAdditionalServices;
