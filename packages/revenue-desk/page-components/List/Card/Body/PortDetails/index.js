import { Tooltip } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';

import getLocations from '../../../../../helper/locations-shipment';

import styles from './styles.module.css';

const IS_SINGLE = true;

function PortDetails({ data }) {
	const { origin, destination } = getLocations(data) || {};

	const handleLocationDetails = (location, isSingle, icdInfo) => {
		let show = true;
		if (!location?.port_code && !location?.postal_code) {
			show = false;
		} else if (data?.shipment_type === 'trailer_freight') {
			show = false;
		}
		return (
			<>
				<div>
					{show ? (
						<div className={styles.origin_code}>
							(
							{location?.port_code || location?.postal_code}
							)
						</div>
					) : null}

					<div className={styles.port_name}>
						{location?.country?.name}
					</div>
				</div>

				{isSingle ? (
					<div className={styles.single_port_name}>
						{location?.name}
					</div>
				) : (
					<Tooltip
						placement="bottom"
						theme="light"
						content={
							<div style={{ fontSize: '10px' }}>{location?.display_name}</div>
						}
					>
						<div>
							<div className={styles.port_name}>{location?.name}</div>
							{icdInfo?.name && <div className={styles.port_name}>{icdInfo?.name}</div>}
						</div>
					</Tooltip>
				)}
			</>
		);
	};

	const renderLocation = () => {
		if (!destination) {
			return (
				<div>
					{handleLocationDetails(origin, IS_SINGLE)}
				</div>
			);
		}

		return (
			<div className={styles.port_pair_container}>
				<div className={styles.origin_location_container}>
					{handleLocationDetails(origin, false, data?.origin_main_port)}
				</div>
				<div style={{ margin: '0 12px' }}>
					<IcMPortArrow />
				</div>
				<div className={styles.destination_location_container}>
					{handleLocationDetails(destination, false, data?.destination_main_port)}
				</div>
			</div>
		);
	};
	return (
		<div style={{ width: '100%' }}>
			{renderLocation()}
		</div>
	);
}

export default PortDetails;
