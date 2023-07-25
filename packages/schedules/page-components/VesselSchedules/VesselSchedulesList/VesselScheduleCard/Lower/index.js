import { Button, Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRouter } from '@cogoport/next';

import styles from './styles.module.css';

const TWO = 2;
function Lower({ vessel, loading }) {
	const { push } = useRouter();
	const navigateTo = () => {
		push(
			'/schedules/vessel-schedules/[id]',
			`/schedules/vessel-schedules/${vessel?.id}`,
		);
	};
	const route_length = parseFloat(vessel?.route?.length);
	const displayText = `${(route_length)?.toFixed(TWO) || '-'} km`;

	return (
		<div className={styles.lower}>
			<div className={styles.lower_left}>
				<div>Vessel Details</div>
				{loading ? <Placeholder width="100px" />
					: <div className={styles.feature_name}>Voyage No:</div>}
				{loading ? <Placeholder width="100px" />
					: (
						<div className={styles.feature_value}>
							{vessel?.vessel_schedule_link?.[GLOBAL_CONSTANTS.zeroth_index]?.arrival_voyage_number}
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
							{displayText}
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
