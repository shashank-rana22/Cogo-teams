import { format } from '@cogoport/utils';

import styles from './styles.module.css';

function Upper({ sailingSchedule }) {
	return (
		<div className={styles.upper}>
			<div className={styles.upper_left}>
				<div className={styles.shipping_line}>
					<div>
						{/* <img src={vessel?.operator?.logo_url} /> */}
					</div>
					<div>
						{/* {sailingSchedule?.operator?.short_name} */}
						{' '}
						Shipping
					</div>
				</div>

			</div>
			<div className={styles.upper_right}>
				<div>
					<div className={styles.updated_status}>days</div>
				</div>
				<div className={styles.updated_on}>
					schedule type
					{' '}
					{/* {format(vessel?.updated_at, 'dd MMM yyyy')} */}
				</div>
			</div>
		</div>
	);
}
export default Upper;
