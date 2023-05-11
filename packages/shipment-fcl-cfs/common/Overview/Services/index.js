import { ShipmentDetailContext } from '@cogoport/context';
import { startCase } from '@cogoport/utils';
import { useContext } from 'react';

import { possibleServices } from '../../../configurations/possible-full-route';

import AddNewService from './AddNewService';
import helperFuncs from './helpers/getHelperFuncs';
import upsellTransportation from './helpers/upsellTransportation';
import Loader from './Loader';
import ServiceDetails from './ServiceDetails';
import styles from './styles.module.css';

const servicesList = [
	{
		id                         : 'd75ae4f2-9128-461e-92be-5c475a5d153c',
		shipment_id                : 'cbd9ee9c-ec1d-4a5d-8a06-59aa3538c979',
		country_id                 : '541d1232-58ce-4d64-83d6-556a42209eb7',
		trade_id                   : 'd1e7b3ca-7518-4706-a644-e99d3aa2e0a9',
		continent_id               : 'a5fad8d7-ea33-4dab-82d6-e7097fbffee1',
		trade_type                 : 'export',
		container_type             : 'standard',
		container_size             : '20',
		containers_count           : 1,
		cargo_weight_per_container : null,
		source                     : 'spot_booking',
		state                      : 'init',
		is_active                  : true,
		cargo_handling_type        : 'stuffing_at_factory',
		service_provider_poc_id    : null,
		service_type               : 'fcl_cfs_service',
		importer_exporter_id       : null,
		port                       : {
			id           : 'c4301086-92a8-463d-af00-9c1222ff223f',
			name         : 'Mundra',
			display_name : 'Mundra (INMUN), Bhuj, India',
			pincode_id   : '02c311db-3a08-41ae-909f-720feeb59762',
			port_code    : 'INMUN',
			postal_code  : '370421',
			country_id   : '541d1232-58ce-4d64-83d6-556a42209eb7',
		},
		service_provider: {
			id                  : '17dba570-40dd-4bc5-9945-ca22ed5135a6',
			business_name       : 'SUNRISE FREIGHT FORWARDERS PRIVATE LIMITED',
			trade_name          : 'SUNRISE FREIGH FORWARDERS PVT. LTD.',
			country_id          : '541d1232-58ce-4d64-83d6-556a42209eb7',
			serial_id           : 58446,
			sage_company_id     : '301',
			registration_number : 'AABCS7195N',
		},
	},
];

function Services({ get = {}, activeStakeholder = '' }) {
	// const {
	// 	shipment_data,
	// 	primary_service,
	// 	isGettingShipment,
	// 	servicesList,
	// 	servicesLoading,
	// 	activeStakeholder,
	// } = useContext(ShipmentDetailContext);

	const tradeTypeBasedServiceType = {
		import : 'destinationServices',
		export : 'originServices',
	};

	const {
		shipment_data,
		primary_service,
		isGettingShipment,
		// servicesList,
		servicesLoading,
		// activeStakeholder,
	} = get || {};

	// const {
	// 	shipment_data,
	// 	primary_service,
	// 	isGettingShipment,
	// 	servicesList,
	// 	servicesLoading,
	// 	// activeStakeholder,
	// } = useContext(ShipmentDetailContext);

	const { serviceObj, upsellServices } =	helperFuncs(servicesList, possibleServices);

	const serviceCategories = Object.keys(serviceObj);
	console.log('serviceCategories', serviceCategories);
	console.log('serviceObj', serviceObj);
	console.log('upsellServices', upsellServices);
	const { cancelUpsellDestinationFor, cancelUpsellOriginFor } = upsellTransportation(serviceObj);

	return !servicesLoading && !isGettingShipment
		? (
			<div className={styles.container}>
				<div className={styles.services_container}>
					{serviceCategories.map((serviceCategory) => (
						<>

							{ !['booking_agent', 'consignee_shipper_booking_agent'].includes(activeStakeholder)
						&& Object.keys(serviceObj[serviceCategory]).length
								? <div className={styles.header}>{ startCase(serviceCategory)}</div> : null}

							{ ['booking_agent', 'consignee_shipper_booking_agent'].includes(activeStakeholder)
								? <div className={styles.header}>{ startCase(serviceCategory)}</div> : null}

							<div className={styles.trade_services}>
								{(Object.keys(serviceObj[serviceCategory])).map((service) => (
									<ServiceDetails servicesData={serviceObj[serviceCategory][service]} />
								))}
							</div>

							{!['booking_agent', 'consignee_shipper_booking_agent'].includes(activeStakeholder)
								&& tradeTypeBasedServiceType[primary_service?.trade_type] === serviceCategory ? (
									<div className={styles.upselling}>
										{(upsellServices[serviceCategory]).map((service) => (
											<AddNewService
												upsellableService={service}
												servicesList={servicesList}
												shipmentData={shipment_data}
												primary_service={primary_service}
												cancelUpsellDestinationFor={cancelUpsellDestinationFor}
												cancelUpsellOriginFor={cancelUpsellOriginFor}
												activeStakeholder={activeStakeholder}
											/>
										))}
									</div>
								) : null}
						</>
					))}
				</div>
			</div>
		)
		: <Loader />;
}

export default Services;
