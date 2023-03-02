import { IcMPortArrow } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import getLocations from '../../../../../../../utils/getLocationConfig';
import GetServiceInfo from '../../../../../../commons/GetServiceInfo';
import { DetailInterface } from '../../../../../../commons/Interfaces/index';
import { formatDate } from '../../../../../../commons/utils/formatDate';

import styles from './styles.module.css';

interface Props {
	data: DetailInterface;
	showDate?: boolean;
}

function PortDetails({ data, showDate = false }: Props) {
	if (isEmpty(data)) {
		return null;
	}

	const {
		origin_main_port: originMainPort = '',
		destination_main_port: destinationMainPort = '',
	} = data || {};

	const { origin, destination } = getLocations({ ...data, search_type: data?.shipment_type }) || {};

	const serviceIcon = GetServiceInfo(data?.shipment_type);

	const handleLocationDetails = (location, icdInfo) => (
		<>
			<div className={styles.port_code}>
				{location?.port_code || location?.postal_code ? (
					<div className={styles.code}>
						(
						{location?.port_code || location?.postal_code}
						)
					</div>
				) : (
					<div style={{ height: '16px' }} />
				)}

				<div className={styles.country}>{location?.country}</div>
			</div>

			<div className={styles.value}>{location?.name}</div>
			{icdInfo?.name ? <div className={styles.icd}>{icdInfo?.name}</div> : null}
		</>
	);

	const renderLocation = () => {
		if (!destination) {
			let tradeType = '';
			if (data?.trade_type === 'export') {
				tradeType = 'Origin';
			} else if (data?.trade_type === 'import') {
				tradeType = 'Destination';
			}

			if (data?.shipment_type?.includes('_local')) {
				return (
					<>
						<div className={`customs ${styles.flex_row_origin}`}>
							<div className={styles.text}>{tradeType}</div>
							<div className={styles.text}>Location : </div>
						</div>

						<div className={styles.flex_row_origin}>
							{handleLocationDetails(origin, {})}
						</div>
					</>
				);
			}
			return (
				<>
					<div className={`customs ${styles.flex_row_origin}`}>
						<div className={styles.text}>{tradeType}</div>
						<div className={styles.text}>custom clearance : </div>
					</div>

					<div className={styles.flex_row_origin}>
						{handleLocationDetails(origin, {})}
					</div>
				</>
			);
		}
		return (
			<div className={styles.location_container}>
				<div className={styles.port_pair_container}>
					<div className={styles.flex_row_origin}>
						{handleLocationDetails(origin, originMainPort)}
						{showDate ? (
							<div className={styles.date_container}>
								ETD -
								{formatDate(data?.schedule_departure, 'dd-MM-yyyy', {}, true)}
							</div>
						) : null}
					</div>

					<div className={styles.icon_wrapper}>
						<IcMPortArrow />
					</div>

					<div className={styles.flex_row_dest}>
						{handleLocationDetails(destination, destinationMainPort)}
						{showDate ? (
							<div className={styles.date_container}>
								ETA -
								{formatDate(data?.schedule_arrival, 'dd-MM-yyyy', {}, true)}
							</div>
						) : null}
					</div>
				</div>

				{showDate ? (
					<div className={styles.status}>
						Status:
						{' '}
						<div className={styles.state}>{startCase(data?.state || '')}</div>
					</div>
				) : null}
			</div>
		);
	};
	const shipmentTypeName = data?.shipment_type
		?.split('_')
		?.join(' ')
		?.toUpperCase();
	return (
		<div className={styles.container}>
			<div className={styles.icon_and_service}>
				<div>
					{' '}
					{serviceIcon}
				</div>
				<div className={styles.service_name}>{shipmentTypeName || ''}</div>
			</div>

			{renderLocation()}
		</div>
	);
}

export default PortDetails;
