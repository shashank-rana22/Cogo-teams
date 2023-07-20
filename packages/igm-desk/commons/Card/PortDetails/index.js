import { Tooltip } from '@cogoport/components';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMPortArrow } from '@cogoport/icons-react';

import ServiceIcon from '../ServiceIcon';

import styles from './styles.module.css';

const handleLocationDetails = (location) => (
	<>
		<div className={styles.port_code}>
			<span className={styles.code}>
				(
				{location?.port_code || location?.postal_code}
				)
			</span>

			<span className={styles.country}>
				{location?.country_code}
			</span>
		</div>

		<Tooltip
			placement="bottom"
			theme="light"
			interactive
			content={location?.display_name}
		>
			<div className={styles.ellipsis_text}>{location?.name}</div>
		</Tooltip>
	</>
);

const getDisplayDate = (date, dateFormat = 'dd MMM yyyy') => (date
	? formatDate({
		date,
		dateFormat,
		formatType: 'date',
	}) : null);

function PortDetails({ data = {}, icon = {} }) {
	const { origin_port, destination_port, estimated_arrival, estimated_departure } = data;

	return (
		<section className={styles.container}>
			<ServiceIcon {...icon} />

			<div className={styles.port_detail}>
				{handleLocationDetails(origin_port)}
				{estimated_departure ? (
					<span className={styles.eta_etd}>
						ETD:
						{' '}
						{getDisplayDate(estimated_departure)}
					</span>
				) : 'TBD'}
			</div>

			<i className={styles.icon_wrapper}>
				<IcMPortArrow />
			</i>

			<div className={styles.port_detail}>
				{handleLocationDetails(destination_port)}
				{estimated_arrival ? (
					<span className={styles.eta_etd}>
						ETA:
						{' '}
						{getDisplayDate(estimated_arrival)}
					</span>
				) : 'TBD'}
			</div>
		</section>
	);
}

export default PortDetails;
