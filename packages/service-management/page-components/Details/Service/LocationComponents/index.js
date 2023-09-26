import { IcMPortArrow } from '@cogoport/icons-react';

import styles from './styles.module.css';

export function SingleLocation({ item = {} }) {
	const { location = {}, trade_type = '' } = (item || {});
	return (
		<div className={styles.port}>
			<div className={styles.origin}>{location?.display_name}</div>
			<div className={styles.trade}>{trade_type}</div>
		</div>
	);
}

export function MultipleLocation({ item = {} }) {
	const { origin_location = {}, destination_location = {} } = (item || {});
	return (
		<div className={styles.port}>
			<div className={styles.origin}>{origin_location?.display_name}</div>
			<IcMPortArrow />
			<div className={styles.origin}>{destination_location?.display_name}</div>
		</div>
	);
}
