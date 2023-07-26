import { Button, Placeholder } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { format } from '@cogoport/utils';

import cutoff from '../../../utils/cutoff.json';

import styles from './styles.module.css';

function Lower({ sailingSchedule, loading }) {
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
				{(Object.keys(cutoff)).map((key) => (
					<div key={key}>
						{!loading ? (
							<div>
								<div className={styles.feature_name}>{cutoff[key]}</div>
								<div className={styles.feature_value}>
									{ sailingSchedule[key]
										? format(sailingSchedule[key], 'dd MMM yyyy hh:mm') : '-'}
								</div>
							</div>
						) : <Placeholder width="60px" />}
					</div>
				))}
			</div>
			<div className={styles.right}>
				{!loading ? (
					<Button themeType="accent" size="lg" onClick={() => navigateTo()}>
						View Schedule Details
					</Button>
				) : <Placeholder height="40px" width="250px" />}
			</div>
		</div>
	);
}
export default Lower;
