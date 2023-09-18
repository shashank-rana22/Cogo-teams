import { Select, Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import { serviceMappings } from '../../../configs/AdditionalServicesConfig';
import getTradeTypeWiseIncoTerms from '../../../configs/getTradeTypeWiseIncoTerms';

import ChangeIncoTermModal from './ChangeIncoTermModal';
import getAddedServices from './getAddedServices';
import List from './List';
import styles from './styles.module.css';
import getCombinedServiceDetails from './utils/getCombinedServiceDetails';
import getNonRemoveableServices from './utils/getNonRemoveableServices';
import getServiceName from './utils/getServiceName';

const OTHER_SERVICES_ARRAY = ['cargo_insurance', 'warehouse'];

const TRANSPORTATION_SERVICES = ['ftl_freight', 'ltl_freight', 'trailer_freight'];
const singleLocationServices = ['fcl_freight_local'];

function AdditionalServices({ // used in search results and checkout
	rateCardData = {},
	detail = {},
	setHeaderProps = () => {},
	refetchSearch = () => {},
	source = '',
	searchLoading = false,
	refetchLoading = false,
}) {
	const { service_rates = [] } = rateCardData;

	const {
		service_details = {},
		service_type = '',
		trade_type = '',
		inco_term = '',
	} = detail;

	const finalServiceDetails = getCombinedServiceDetails(service_details, service_rates);

	const [incoTermModalData, setIncoTermModalData] = useState({});

	const primaryService = service_type;

	const isSingleLocationService = singleLocationServices.includes(service_type);

	const servicesArray = serviceMappings({
		service                : primaryService,
		destination_country_id : detail.destination_country_id,
		origin_country_id      : detail.origin_country_id,
	});

	const SERVICE_DATA = {};

	Object.keys(finalServiceDetails).forEach((serviceId) => {
		const serviceItem = finalServiceDetails[serviceId];

		const serviceName = getServiceName(serviceItem);

		if (!SERVICE_DATA[serviceName]) {
			SERVICE_DATA[serviceName] = [];
		}

		SERVICE_DATA[serviceName].push(serviceItem);
	});

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
					if (TRANSPORTATION_SERVICES.includes(serviceItem.service_type)) {
						return service.name === `${serviceItem.trade_type}_transportation`;
					}
					return getServiceName(serviceItem) === service.name;
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

	const filteredAllServices = ALL_SERVICES.filter((service_item) => service_item?.inco_terms?.includes(inco_term));

	const SHIPPER_SIDE_SERVICES = [];
	const CONSIGNEE_SIDE_SERVICES = [];
	const MAIN_SERVICES = [];
	const OTHER_SERVICES = [];
	const SUBSIDIARY_SERVICES = getAddedServices(finalServiceDetails);

	(source === 'checkout' ? filteredAllServices : ALL_SERVICES).forEach((item) => {
		if (item.name.includes('import')) {
			CONSIGNEE_SIDE_SERVICES.push(item);
		} else if (item.name.includes('export')) {
			SHIPPER_SIDE_SERVICES.push(item);
		} else if (OTHER_SERVICES_ARRAY.includes(item.name)) {
			OTHER_SERVICES.push(item);
		} else MAIN_SERVICES.push(item);
	});

	const incoTermOptions = getTradeTypeWiseIncoTerms(trade_type);

	const SERVICES_CANNOT_BE_REMOVED = getNonRemoveableServices({ trade_type, source, main_service: primaryService });

	const SERVICES_LIST_MAPPING = {
		shipper_side_services: {
			key  : 'shipper_side_services',
			type : 'seller',
			list : SHIPPER_SIDE_SERVICES,
		},
		main_service: {
			key  : 'main_service',
			type : 'main_service',
			list : MAIN_SERVICES,
		},
		buyer_side_services: {
			key  : 'buyer_side_services',
			type : 'buyer',
			list : CONSIGNEE_SIDE_SERVICES,
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

	return (
		<div>
			<div className={styles.heading}>
				You may need these services
				{source === 'checkout' ? (
					<div style={{ fontWeight: 500, display: 'flex', alignItems: 'center' }}>
						IncoTerm:
						<Select
							value={inco_term}
							onChange={(val) => {
								if (val === inco_term) {
									Toast.error('You selected the same Incoterm');
									return;
								}

								setIncoTermModalData({ selectedValue: val });
							}}
							size="sm"
							options={incoTermOptions}
							className={styles.select}
						/>
					</div>
				) : null}
			</div>

			<div className={styles.additional_services}>
				{Object.values(SERVICES_LIST_MAPPING).map((servicesObj) => {
					const { key = '', type = '', list = [] } = servicesObj;

					if (isEmpty(list)) return null;

					return (
						<List
							key={key}
							list={list}
							type={type}
							detail={detail}
							rateCardData={rateCardData}
							setHeaderProps={setHeaderProps}
							refetch={refetchSearch}
							SERVICES_CANNOT_BE_REMOVED={SERVICES_CANNOT_BE_REMOVED}
							// startingPrices={startingPrices}
							// startingPriceLoading={startingPriceLoading}
							refetchLoading={refetchLoading}
						/>
					);
				})}
			</div>

			{!isEmpty(incoTermModalData) ? (
				<ChangeIncoTermModal
					incoTermModalData={incoTermModalData}
					setIncoTermModalData={setIncoTermModalData}
					searchLoading={searchLoading}
					getCheckout={refetchSearch}
					incoterm={inco_term}
					checkout_id={detail?.checkout_id}
					service_details={service_details}
					service_type={service_type}
				/>
			) : null}
		</div>
	);
}

export default AdditionalServices;
