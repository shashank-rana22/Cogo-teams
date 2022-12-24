import React from 'react';
import { Tooltip } from '@cogoport/components';
import { IcMFship } from '@cogoport/icons-react';
import styles from './styles.module.css'
import { isEmpty } from 'lodash';

const Details = ({ data = {} }) => {
	if (isEmpty(data)) {
		return null;
	}

	const { origin, destination } = getLocations('shipment_type', data) || {};

	const { destination_main_port, origin_main_port } = data;

	const { serviceIcon } = getServiceInfo(data?.shipment_type);

	const handleLocationDetails = (location, isSingle) => {
		let show = true;
		if (location?.port_code === null || location?.postal_code === null) {
			show = false;
		} else if (!location?.port_code && !location?.postal_code) {
			show = false;
		} else if (data?.shipment_type === 'trailer_freight') {
			show = false;
		}
		return (
			<>
				<div className={styles.portCode}>
					{show ? (
						<div className={styles.code}>({location?.port_code || location?.postal_code})</div>
					) : null}

					<div className={styles.country}>{location?.country?.name}</div>
				</div>

				{isSingle ? (
					<div className={styles.value}>{location?.name}</div>
				) : (
					<Tooltip
						placement="bottom"
						theme="light"
						content={
							<div style={{ fontSize: '10px' }}>{location?.display_name}</div>
						}
					>
						<div>
							<div className={styles.value}>{location?.name}</div>
							{icdInfo?.name && <div className={styles.icd}>{icdInfo?.name}</div>}
						</div>
					</Tooltip>
				)}
			</>
		);
	};
	const className = destination ? 'port-details' : 'port';
	const renderLocation = () => {
		if (!destination) {
			const isSingle = true;
			return (
				<div className={styles.flexRowOrigin}>
					{handleLocationDetails(origin, isSingle)}
				</div>
			);
		}

		return (
			<>
				<div className={styles.flexRowOrigin}>
					{handleLocationDetails(origin, origin_main_port)}
				</div>

				<div className={styles.iconWrapper}>
					<IcMFship />
				</div>

				<div className={styles.flexRowDest}>
					{handleLocationDetails(destination, false, destination_main_port)}
				</div>
			</>
		);
	};

	return (
		<Container className={className}>
			<div className={styles.iconAndService}>{serviceIcon}</div>

			{renderLocation()}
		</Container>
	);
};

export default Details;
