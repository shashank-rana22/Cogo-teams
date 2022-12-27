import React from 'react';
import CargoDetailsPills from '../../../CargoDetailsPills';;
import MultiServiceDetails from '../../../MultiServiceDetails';
import { Tooltip } from '@cogoport/components';
import {format} from '@cogoport/utils';
import getPortConfigs from '../../../../utils/bookingDeskUtils/getPortConfigs';
import {getServiceInfo} from '../../../../utils/bookingDeskUtils/getServiceInfo';
import {IcMPortArrow} from '@cogoport/icons-react'
import styles from './styles.module.css'

const CardBody = ({ data = {} }) => {
	const { origin, destination } = getPortConfigs({
		...data,
		search_type: data?.shipment_type || {},
	});

	const { serviceIcon, serviceText } = getServiceInfo(data?.shipment_type);

	const service = `${data?.shipment_type}_services`;


	return (
		<div className = {styles.container}>


			<div className={styles.importerExporterDetails}>
				<p>Shipment ID #{data?.serial_id || data?.shipment_serial_id}</p>

				<Tooltip
					theme="light"
					placement="bottom"
					content={
						<span style={{ fontSize: 10 }}>
							{data?.service_provider?.business_name || ''}
						</span>
					}
				>
					<div className={styles.serviceProvider}>
						{data?.service_provider?.business_name || ''}
					</div>
				</Tooltip>
			</div>

			<div className={styles.verticalLine}/>

			<div className={styles.locationDetails}>
				<div className={styles.serviceIcon}>
				<div className={styles.shipmentType}>{serviceIcon}</div>
				<div className={styles.serviceIconText}> {serviceText}</div>
				</div>
				<div className={styles.location}>
					<Tooltip
						theme="light"
						content={
							<div style={{ fontSize: '10px' }}>
								({origin?.port_code}) {origin?.country}
							</div>
						}
						placement="top"
					>
						<div className={styles.country}>
							({origin?.port_code}) {origin?.country}
						</div>
					</Tooltip>

					<Tooltip
						theme="light"
						placement="bottom"
						content={<div style={{ fontSize: '10px' }}>{origin?.name}</div>}
					>
						<div className={styles.port}>{origin?.name}</div>
					</Tooltip>
					<div className={(`${styles.shortName} ${styles.etaEtd}`)}>
						ETD:{' '}
						{format(
							data?.schedule_departure || data?.selected_schedule_departure,
							'dd MMM yyyy',
						)}
					</div>
				</div>

				<IcMPortArrow style={{ margin: '0 auto' }} />

				<div className={styles.location}>
					<Tooltip
						theme="light"
						content={
							<div style={{ fontSize: '10px' }}>
								({destination?.port_code}) {destination?.country}
							</div>
						}
						placement="top"
					>
						<div className={styles.country}>
							({destination?.port_code}) {destination?.country}
						</div>
					</Tooltip>

					<Tooltip
						theme="light"
						placement="bottom"
						content={
							<div style={{ fontSize: '10px' }}>{destination?.name}</div>
						}
					>
						<div className={styles.port}>{destination?.name}</div>
					</Tooltip>
					<div className={(`${styles.shortName} ${styles.etaEtd}`)}>
						ETA:{' '}
						{format(
							data?.schedule_arrival || data?.selected_schedule_arrival,
							'dd MMM yyyy',
						)}
					</div>
				</div>
			</div>

			<div className={styles.verticalLine}/>

			<div className={styles.containerDetails}>
				{data[service]?.length == 1 ? (
					<div className={styles.multiService}>
						<CargoDetailsPills detail={data || {}} />

						<MultiServiceDetails mainServices={data[service]}>
							+ {data[service]?.length - 1} Details
						</MultiServiceDetails>
					</div>
				) : (
					<CargoDetails detail={data || {}} />
				)}
			</div>
		</div>
	);
};

export default CardBody;