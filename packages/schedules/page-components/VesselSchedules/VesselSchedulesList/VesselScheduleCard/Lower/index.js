import { Button, Placeholder } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import styles from './styles.module.css';

const ZERO = 0;
function Lower({ vessel, loading }) {
	const { push } = useRouter();
	const navigateTo = () => {
		push(
			'/schedules/vessel-schedules/[id]',
			`/schedules/vessel-schedules/${vessel?.id}`,
		);
	};
	return (
		<div className={styles.lower}>
			<div className={styles.lower_left}>
				<div>Vessel Details</div>
				{loading ? <Placeholder width="100px" />
					: <div className={styles.feature_name}>Voyage No:</div>}
				{loading ? <Placeholder width="100px" />
					: (
						<div className={styles.feature_value}>
							{vessel?.vessel_schedule_link?.[ZERO]?.arrival_voyage_number}
						</div>
					)}
				{loading ? <Placeholder width="100px" />
					: <div className={styles.feature_name}>Service Lane</div>}
				{loading ? <Placeholder width="100px" />
					: (
						<div className={styles.feature_value}>
							{vessel?.service_lane?.name || '-'}
						</div>
					)}
				{loading ? <Placeholder width="100px" />
					: <div className={styles.feature_name}>Length</div>}
				{loading ? <Placeholder width="100px" />
					: (
						<div className={styles.feature_value}>
							{vessel?.route?.length}
						</div>
					)}
			</div>
			<div className={styles.right}>
				{loading ? <Placeholder width="200px" height="40px" /> : (
					<Button themeType="accent" size="lg" onClick={() => navigateTo()}>
						View Route Details
						{' '}
					</Button>
				)}
			</div>
		</div>
	);
}
export default Lower;
