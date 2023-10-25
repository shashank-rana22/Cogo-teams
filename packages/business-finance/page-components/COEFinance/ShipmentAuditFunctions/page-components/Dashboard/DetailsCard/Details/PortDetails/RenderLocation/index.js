import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMPortArrow } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import HandleLocationDetails from './HandleLocationDetails';
import styles from './styles.module.css';

function RenderLocation({
	originMainPort = '',
	destinationMainPort = '',
	origin = {},
	destination = {},
	data = {},
	showDate = false,
}) {
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
						<HandleLocationDetails
							location={origin}
						/>
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
					<HandleLocationDetails
						location={origin}
					/>
				</div>
			</>
		);
	}
	return (
		<div className={styles.location_container}>
			<div className={styles.port_pair_container}>
				<div className={styles.flex_row_origin}>
					<HandleLocationDetails
						location={origin}
						icdInfo={originMainPort}
					/>
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
					<HandleLocationDetails
						location={destination}
						icdInfo={destinationMainPort}
					/>
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
}

export default RenderLocation;
