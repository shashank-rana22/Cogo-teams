import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

const ONE = 1;
function Upper({ sailingSchedule, loading }) {
	return (
		<div className={styles.upper}>
			<div className={styles.upper_left}>
				<div className={styles.shipping_line}>
					{!loading ? (
						<div>
							<img alt="shipping_line_logo" src={sailingSchedule?.shipping_line?.logo_url} />
						</div>
					) : <Placeholder width="60px" />}
					{!loading ? (
						<div>
							{sailingSchedule?.shipping_line?.short_name}
							{' '}
							Shipping
						</div>
					) : <Placeholder width="40px" />}
				</div>

			</div>
			<div className={styles.upper_right}>
				<div>
					{!loading ? (
						<div className={styles.tag}>
							{sailingSchedule.transit_time}
							{' '}
							{sailingSchedule?.transit_time > ONE ? 'days' : 'day'}
						</div>
					) : <Placeholder width="40px" />}
				</div>
				<div>
					{!loading
						? <div className={styles.tag}>{sailingSchedule.schedule_type || 'unspecified'}</div>
						: <Placeholder width="40px" />}
				</div>
			</div>
		</div>
	);
}
export default Upper;
