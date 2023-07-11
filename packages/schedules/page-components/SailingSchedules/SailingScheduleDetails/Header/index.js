import PortPair from '../../common/PortPair';

import styles from './styles.module.css';

function Header({ sailingSchedule }) {
	return 		(
		<div className={styles.container}>
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
					<div className={styles.updated_status}>
						schedule type
						{' '}
						{/* {format(vessel?.updated_at, 'dd MMM yyyy')} */}
					</div>
				</div>
			</div>
			<div className={styles.middle}>
				{/* <PortPair data={data} /> */}
			</div>
			<div className={styles.bottom}>
				<div className={styles.lower_left}>
					<div>Cutoff Details</div>
					{[0, 0, 0, 0].map((feature) => (
						<div>
							<div className={styles.feature_name}>TEU (Nominal)</div>
							<div className={styles.feature_value}>98112</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default Header;
