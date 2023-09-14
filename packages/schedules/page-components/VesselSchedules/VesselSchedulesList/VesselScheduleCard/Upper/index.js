import { Placeholder } from '@cogoport/components';
import { format, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function Upper({ vessel, loading }) {
	return (
		<div className={styles.upper}>
			<div className={styles.upper_left}>
				{loading ? <Placeholder width="100px" /> : (
					<div className={styles.vessel_title}>
						{startCase(vessel?.vessel?.name)}
						{' '}
						:
						{vessel?.vessel?.imo}
					</div>
				)}
				<div className={styles.shipping_line}>
					{loading ? <Placeholder width="200px" height="30px" /> : (
						<>
							<div>
								{vessel?.operator?.logo_url ? (
									<img
										alt="shipping_line_logo"
										className={styles.logo_url}
										src={vessel?.operator?.logo_url}
										width="80px"
										height="40px"
									/>
								) : null}
							</div>
							<div>
								{vessel?.operator?.short_name}
								{' '}
								Shipping
							</div>
						</>
					)}
				</div>

			</div>
			<div className={styles.upper_right}>
				{loading ? <Placeholder width="100px" /> : (
					<div>
						<div className={styles.updated_status}>Manual Upload</div>
					</div>
				)}
				{loading ? <Placeholder width="100px" /> : (
					<div className={styles.updated_on}>
						Updated on :
						{' '}
						{format(vessel?.updated_at, 'dd MMM yyyy')}
					</div>
				)}
			</div>
		</div>
	);
}
export default Upper;
