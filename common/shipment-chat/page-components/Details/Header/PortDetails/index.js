import { Tooltip } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

// import getLocations from '../helpers/locations-shipment';
import { getServiceInfo } from '../../../../utils/getServiceInfo';

import styles from './styles.module.css';

function PortDetails({ data = {}, primary_service = {}, isShow = true }) {
	const { origin_main_port = '', destination_main_port = '' } = primary_service;

	if (isEmpty(data)) {
		return null;
	}

	const { origin_port : origin, destination_port : destination } = primary_service;

	const { serviceIcon } = getServiceInfo({ service: data?.shipment_type });

	const handleLocationDetails = (location, icdPortInfo) => (
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

				<div className={styles.country}>
					{location?.country?.name}
				</div>
			</div>

			<Tooltip
				placement="bottom"
				theme="light"
				content={(
					<div>
						<div style={{ fontSize: '10px' }}>{location?.display_name}</div>

						{icdPortInfo ? <div className={styles.icd}>{icdPortInfo?.name}</div> : null}
					</div>
				)}
			>
				<div className={styles.value}>{location?.name}</div>
			</Tooltip>

		</>
	);

	const renderLocation = () => (
		<>
			<div className={styles.flex_row_origin}>
				{handleLocationDetails(origin, origin_main_port)}
			</div>

			{destination ? (
				<div className={styles.icon_wrapper}>
					<IcMPortArrow style={{ width: '1.5em', height: '1.5em' }} />
				</div>
			) : null}

			{destination ? (
				<div className={styles.flex_row_destination}>
					{handleLocationDetails(destination, destination_main_port)}
				</div>
			) : null}
		</>
	);

	return (
		<div className={styles.container}>
			{isShow ? <div className={styles.icons_and_service}>{serviceIcon}</div> : null}

			{renderLocation()}
		</div>
	);
}

export default PortDetails;
