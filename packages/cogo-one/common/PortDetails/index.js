import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMPortArrow } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';

import getLocations from '../../utils/getLocations';

import styles from './styles.module.css';

const GET_LAST_ITEM = -1;

function PortDetails({ serviceData = {} }) {
	const data = serviceData || {};
	const { origin = {}, destination = {} } = getLocations({ data }) || {};

	const countryName = ({ val }) => val?.split(',').slice(GET_LAST_ITEM)[GLOBAL_CONSTANTS.zeroth_index];

	const handleLocationDetails = ({ location, icdInfo }) => (
		<>
			<div className={styles.port_code}>
				{location?.port_code || location?.postal_code ? (
					<div className={styles.code}>
						(
						{location.port_code || location.postal_code}
						)
					</div>
				) : (
					<div style={{ height: '16px' }} />
				)}

				<div className={styles.country}>{location?.country?.name}</div>
			</div>

			<div className={styles.value}>{location?.name}</div>

			{icdInfo?.name && <div className={styles.icd}>{icdInfo.name}</div>}
		</>
	);

	if (isEmpty(data)) {
		return null;
	}

	if (!destination) {
		let tradeType = '';
		if (data?.trade_type === 'export') {
			tradeType = 'Origin';
		} else if (data?.trade_type === 'import') {
			tradeType = 'Destination';
		}

		if (!data?.shipment_type?.includes('_local')) {
			return (
				<div className={styles.container}>
					<div className={styles.flex_row_origin}>
						<div className={styles.label}>{tradeType}</div>
						<div className={styles.label}>Location : </div>
					</div>

					<div className={styles.flex_row_origin}>
						{handleLocationDetails({ location: origin })}
					</div>
				</div>
			);
		}
		return (
			<div className={styles.container}>
				<div className={styles.flex_row_origin}>
					<div className={styles.label}>{tradeType}</div>
					<div className={styles.label}>custom clearance : </div>
				</div>

				<div className={styles.flex_row_origin}>
					{handleLocationDetails({ location: origin })}
				</div>
			</div>
		);
	}

	return (
		<div className={styles.port_pair}>
			<div className={styles.port}>
				<div className={styles.port_details}>

					<Tooltip content={startCase(origin?.display_name)} placement="bottom">
						<div className={styles.port_name}>
							{startCase(origin?.display_name)}
						</div>
					</Tooltip>

					<div className={styles.port_codes}>
						(
						{origin?.port_code}
						)
					</div>
				</div>

				<div className={styles.country}>
					{startCase(origin?.country || countryName({ val: origin?.display_name }))}
				</div>

			</div>
			<IcMPortArrow width={22} height={22} />
			<div className={styles.port}>
				<div className={styles.port_details}>
					<Tooltip content={startCase(destination?.display_name)} placement="bottom">
						<div className={styles.port_name}>
							{startCase(destination?.display_name)}
						</div>
					</Tooltip>

					<div className={styles.port_codes}>
						(
						{destination?.port_code}
						)
					</div>
				</div>
				<div className={styles.country}>
					{startCase(destination?.country || countryName({ val: destination?.display_name }))}
				</div>
			</div>
		</div>
	);
}

export default PortDetails;
