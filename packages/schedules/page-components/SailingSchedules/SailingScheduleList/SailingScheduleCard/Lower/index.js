import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import styles from './styles.module.css';

function Lower({ sailingSchedule }) {
	const { push } = useRouter();
	const navigateTo = () => {
		push(
			'/schedules/sailing-schedules/[id]',
			`/schedules/sailing-schedules/${sailingSchedule?.id}`,
		);
	};
	return (
		<div className={styles.lower}>
			<div className={styles.lower_left}>
				<div>Cutoff Details</div>
				{[0, 0, 0, 0].map((feature) => (
					<div>
						<div className={styles.feature_name}>TEU (Nominal)</div>
						<div className={styles.feature_value}>98112</div>
					</div>
				))}
			</div>
			<div clasName={styles.right}>
				<Button themeType="accent" size="lg" onClick={() => navigateTo()}>
					View Schedule Details
				</Button>
			</div>
		</div>
	);
}
export default Lower;
