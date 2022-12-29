import { Tooltip } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';
import React from 'react';

import getPortConfigs from '../../../../utils/bookingDeskUtils/getPortConfigs';
import { getServiceInfo } from '../../../../utils/bookingDeskUtils/getServiceInfo';
import CargoDetailsPills from '../../../CargoDetailsPills';
import MultiServiceDetails from '../../../MultiServiceDetails';

import styles from './styles.module.css';

function CardBody({ data = {} }) {
	const { origin, destination } = getPortConfigs({
		...data,
		search_type: data?.shipment_type || {},
	});

	const { serviceIcon, serviceText } = getServiceInfo(data?.shipment_type);

	const service = `${data?.shipment_type}_services`;

	return (
		<div className={styles.container}>

			<div className={styles.importer_exporter_details}>
				<p>
					Shipment ID #
					{data?.serial_id || data?.shipment_serial_id}
				</p>

				<Tooltip
					theme="light"
					placement="bottom"
					content={(
						<span style={{ fontSize: 10 }}>
							{data?.service_provider?.business_name || ''}
						</span>
					)}
				>
					<div className={styles.service_provider}>
						{data?.service_provider?.business_name || ''}
					</div>
				</Tooltip>
			</div>

			<div className={styles.vertical_line} />

			<div className={styles.location_details}>
				<div className={styles.service_icon}>
					<div className={styles.shipment_type}>{serviceIcon}</div>
					<div className={styles.service_icon_text}>
						{' '}
						{serviceText}
					</div>
				</div>
				<div className={styles.location}>
					<Tooltip
						theme="light"
						content={(
							<div style={{ fontSize: '10px' }}>
								(
								{origin?.port_code}
								)
								{origin?.country}
							</div>
						)}
						placement="top"
					>
						<div className={styles.country}>
							(
							{origin?.port_code}
							)
							{' '}
							{origin?.country}
						</div>
					</Tooltip>

					<Tooltip
						theme="light"
						placement="bottom"
						content={<div style={{ fontSize: '10px' }}>{origin?.name}</div>}
					>
						<div className={styles.port}>{origin?.name}</div>
					</Tooltip>
					<div className={(`${styles.short_name} ${styles.eta_etd}`)}>
						ETD:
						{' '}
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
						content={(
							<div style={{ fontSize: '10px' }}>
								(
								{destination?.port_code}
								)
								{destination?.country}
							</div>
						)}
						placement="top"
					>
						<div className={styles.country}>
							(
							{destination?.port_code}
							)
							{' '}
							{destination?.country}
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
					<div className={(`${styles.short_name} ${styles.eta_etd}`)}>
						ETA:
						{' '}
						{format(
							data?.schedule_arrival || data?.selected_schedule_arrival,
							'dd MMM yyyy',
						)}
					</div>
				</div>
			</div>

			<div className={styles.vertical_line} />

			<div className={styles.container_details}>
				{data[service]?.length === 1 ? (
					<div className={styles.multi_service}>
						<CargoDetailsPills detail={data || {}} />

						<MultiServiceDetails mainServices={data[service]}>
							+
							{' '}
							{(data[service]?.length || 1) - 1}
							{' '}
							Details
						</MultiServiceDetails>
					</div>
				) : (
					<CargoDetailsPills detail={data || {}} />
				)}
			</div>
		</div>
	);
}

export default CardBody;
