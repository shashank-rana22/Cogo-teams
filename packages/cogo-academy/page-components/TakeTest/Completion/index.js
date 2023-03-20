import { Button } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';

import styles from './styles.module.css';

const STATS_MAPPING = {
	answered: {
		title     : 'Answered',
		value     : 20,
		max_value : 25,
	},
	not_answered: {
		title     : 'Not Answered',
		value     : 3,
		max_value : 25,
	},
	marked_for_review: {
		title     : 'Marked for review',
		value     : 4,
		max_value : 25,
	},
	not_visited: {
		title     : 'Not Visited',
		value     : 2,
		max_value : 25,
	},
};

function Completion() {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<img
					style={{ width: 32, height: 32, marginRight: 16 }}
					src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/confetti.svg"
					alt=""
				/>
				<h2>Congratulations!</h2>
			</div>
			<h2>You have completed the test!</h2>

			<div className={styles.stats_and_time}>

				<div className={styles.stats}>
					{Object.values(STATS_MAPPING).map((stats_data) => {
						const { title, max_value, value } = stats_data;

						return (
							<div className={styles.content}>
								<div className={styles.label}>
									{title}
								</div>
								<div className={styles.value}>
									:
									{' '}
									{value}
									/
									{max_value}
								</div>
							</div>
						);
					})}
				</div>

				<div className={styles.stats}>
					<div className={styles.content}>
						<div className={styles.label}>
							Time Taken
						</div>
						<div className={styles.value}>
							: 59:45 min
						</div>
					</div>
				</div>

			</div>

			<div className={styles.bottom_text}>Dashboard will be updated as soon as Results have been Published!</div>

			<div className={styles.button_container}>
				<Button type="button">
					<IcMArrowBack style={{ marginRight: 4 }} />
					Dashboard
				</Button>
			</div>
		</div>
	);
}

export default Completion;
