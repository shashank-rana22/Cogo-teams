import { Pill, Tooltip } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import ContainerDetails from '../ContainerDetails';

import styles from './styles.module.css';

const ZEROVALUE = 0;

const SINGLE_PORT_SERVICES = ['fcl_freight_local', 'lcl_freight_local'];

const destructureDetails = (serviceLocation) => {
	const origin = (
		serviceLocation?.origin_port
    || serviceLocation?.origin_airport
    || serviceLocation?.port
    || serviceLocation?.origin_location
	);
	const destination = (
		serviceLocation?.destination_port
    || serviceLocation?.destination_airport
    || serviceLocation?.port
    || serviceLocation?.destination_location
	);

	const originCode = origin?.port_code;
	const originName = origin?.name.split('(')?.[ZEROVALUE];
	const originCountry = origin?.display_name.split(' ').pop();

	const destinationCode = destination?.port_code;
	const destinationName = destination?.name.split('(')?.[ZEROVALUE];
	const destinationCountry = destination?.display_name.split(' ').pop();

	const singlePortCode = serviceLocation?.port?.port_code;
	const singlePortName = serviceLocation?.port?.name.split('(')?.[ZEROVALUE];
	const singlePortCountry = serviceLocation?.port?.display_name.split(' ').pop();

	return {
		singlePortCode,
		singlePortName,
		singlePortCountry,
		originCode,
		originName,
		originCountry,
		destinationCode,
		destinationName,
		destinationCountry,
	};
};

function LocationDetails({ name = '', code = '', country = '', isLocalService = false }) {
	return (
		<div>
			<div className={styles.code}>
				(
				{code}
				)
			</div>
			<div className={styles.name}>
				<Tooltip content={name}>
					<div className={isLocalService ? styles.subnameFull : styles.subname}>
						{name}
						,
					</div>
				</Tooltip>
				<div className={styles.country}>{country}</div>
			</div>
		</div>
	);
}

function ShipmentDetails({ selectedCard = {} }) {
	const serviceLocation = selectedCard?.detail;

	const {
		singlePortCode,
		singlePortName,
		singlePortCountry,
		originCode,
		originName,
		originCountry,
		destinationCode,
		destinationName,
		destinationCountry,
	} = destructureDetails(serviceLocation);

	const containerCount = selectedCard?.search_params?.fcl_freight_services_attributes?.[ZEROVALUE]?.containers_count
		|| selectedCard?.search_params?.lcl_freight_services_attributes?.[ZEROVALUE]?.volume
    || selectedCard?.search_params?.fcl_freight_local_services_attributes?.[ZEROVALUE]?.containers_count;

	const airService = selectedCard?.search_params?.air_freight_services_attributes?.[ZEROVALUE];

	const isLocalService = SINGLE_PORT_SERVICES.includes(serviceLocation?.service_type);

	return (

		<div className={styles.shipment_details_container}>
			<div className={styles.details}>
				<div className={styles.info}>
					<div className={styles.upper_body}>
						{isLocalService ? (
							<LocationDetails
								name={singlePortName}
								code={singlePortCode}
								country={singlePortCountry}
								isLocalService={isLocalService}
							/>
						) : (
							<>
								<LocationDetails
									name={originName}
									code={originCode}
									country={originCountry}
									isLocalService={isLocalService}
								/>
								<div>
									<IcMPortArrow width={40} />
								</div>
								<LocationDetails
									name={destinationName}
									code={destinationCode}
									country={destinationCountry}
									isLocalService={isLocalService}
								/>
							</>
						)}
					</div>

					{['fcl_freight', 'lcl_freight', 'fcl_freight_local'].includes(selectedCard?.search_type)
						&& (
							<>
								<div className={styles.border} />

								<div className={styles.info}>

									<div className={styles.shipment_info} style={{ marginRight: '16px' }}>
										Shipment Type
										<div className={styles.color}>
											{startCase(selectedCard?.route_preference) || '-'}
										</div>
									</div>
									<div className={styles.shipment_info}>
										Container Count
										<div className={styles.color}>
											{containerCount}
											{' '}
											{['fcl_freight', 'fcl_freight_local'].includes(selectedCard?.search_type)
												? 'Ctr' : 'cbm'}
											{' '}
											{`(Divided Into  ${
												selectedCard?.predicted_number_of_shipments || ZEROVALUE
											} Shipment)`}
										</div>
									</div>
								</div>
							</>
						)}

					{selectedCard?.search_type === 'air_freight' && (
						<div style={{ display: 'flex' }}>
							<div className={styles.air_details}>
								<div className={styles.air_head}>Shipment Weight</div>
								<div className={styles.air_value}>
									{airService?.weight}
									kgs
								</div>
							</div>
							<div className={styles.air_details}>
								<div className={styles.air_head}>Total Unit</div>
								<div className={styles.air_value}>{airService?.packages_count}</div>
							</div>
							<div className={styles.air_details}>
								<div className={styles.air_head}>Total Volume</div>
								<div className={styles.air_value}>
									{airService?.volume}
									Cbm
								</div>
							</div>
						</div>

					)}
				</div>

				{selectedCard?.search_type === 'air_freight' && (
					<>
						<div className={styles.air_contract}>
							<div className={styles.air_contract_heads}>Overall Contract Details</div>
							<Pill size="sm" color="green">
								{`Divided into ${selectedCard?.predicted_number_of_shipments} Shipment`}
							</Pill>
						</div>
						<div className={styles.air_details_weight}>
							<div className={styles.total_weight}>
								{selectedCard?.overall_contract_weight || ZEROVALUE }
								Kg
								<span className={styles.total_weight_value}>Total Weight</span>
							</div>
							<div className={styles.total_weight}>
								{selectedCard?.overall_contract_volume || ZEROVALUE }
								Cbm
								<span className={styles.total_weight_value}>Overall Volume</span>
							</div>
						</div>
					</>
				)}

				<ContainerDetails selectedCard={selectedCard} />
			</div>

			{selectedCard?.mandatory_shipping_lines?.length !== ZEROVALUE
					&& (
						<div className={styles.details}>
							<div className={styles.shipment_header}>
								{selectedCard?.search_type === 'air_freight'
									? 'Mandotary AirLines' : 'Mandotary Shipping Lines'}
							</div>
							<div className={styles.shipment_value}>
								{selectedCard?.mandatory_shipping_lines?.map((item) => (
									<div className={styles.value} key={item?.id}>
										{item?.short_name}
									</div>
								))}
							</div>
						</div>
					)}

			{selectedCard?.search_type === 'fcl_freight'
					&& (
						<div className={styles.details}>
							<div className={styles.detention_demurrage}>
								<span className={styles.head}>Requested Detention & Demurrage Free Days</span>
								<div className={styles.detention_container}>
									<div>
										<span className={styles.days}>Origin Days </span>
										<div className={styles.days_container}>
											{selectedCard?.min_origin_detention && (
												<span className={styles.detention}>
													Detention : &nbsp;
													{`${selectedCard?.min_origin_detention} Days`}
												</span>
											)}
											{selectedCard?.min_origin_demurrage && (
												<span className={styles.detention}>
													Demurrage : &nbsp;
													{`${selectedCard?.min_origin_demurrage} Days`}
												</span>
											)}
										</div>
									</div>
									<div>
										<span className={styles.days}>Destination Days </span>
										<div className={styles.days_container}>
											{selectedCard?.min_destination_detention && (
												<span className={styles.detention}>
													Detention : &nbsp;
													{`${selectedCard?.min_destination_detention} Days`}
												</span>
											)}
											{selectedCard?.min_destination_demurrage && (
												<span>
													Demurrage : &nbsp;
													{`${selectedCard?.min_destination_demurrage} Days`}
												</span>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
		</div>

	);
}

export default ShipmentDetails;
