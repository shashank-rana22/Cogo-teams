import { format } from '@cogoport/utils';

import styles from './styles.module.css';

function Upper({ vessel }) {
	return (
		<div className={styles.upper}>
			<div className={styles.upper_left}>
				<div className={styles.vessel_title}>
					{vessel?.vessel?.name}
					{' '}
					:
					{vessel?.vessel?.imo}
				</div>
				<div className={styles.shipping_line}>
					<div>
						<img className={styles.logo_url} src={vessel?.operator?.logo_url} />
					</div>
					<div>
						{vessel?.operator?.short_name}
						{' '}
						Shipping
					</div>
				</div>

			</div>
			<div className={styles.upper_right}>
				<div>
					<div className={styles.updated_status}>Manual Upload</div>
				</div>
				<div className={styles.updated_on}>
					Updated on :
					{' '}
					{format(vessel?.updated_at, 'dd MMM yyyy')}
				</div>
			</div>
		</div>
	);
}
export default Upper;