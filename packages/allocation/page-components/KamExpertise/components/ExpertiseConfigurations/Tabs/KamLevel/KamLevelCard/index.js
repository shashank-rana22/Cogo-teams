import { Input } from '@cogoport/components';

import styles from './styles.module.css';

function KamLevelCard() {
	return (
		<div className={styles.level_card_container}>
			<div className={styles.row_level}>
				<h2>Customer Expertise Score</h2>
				<div>Score</div>
				<Input size="sm" placeholder="Enter Score" style={{ width: '15%' }} />
			</div>
			<div className={styles.row_level}>
				<h2>Trade Expertise Score</h2>
				<div>Score</div>
				<Input size="sm" placeholder="Enter Score" style={{ width: '15%' }} />
			</div>
			<div className={styles.row_level}>
				<h2>Commodity Expertise Score</h2>
				<div>Score</div>
				<Input size="sm" placeholder="Enter Score" style={{ width: '15%' }} />
			</div>
			<div className={styles.row_level}>
				<h2>Misc Expertise Score</h2>
				<div>Score</div>
				<Input size="sm" placeholder="Enter Score" style={{ width: '15%' }} />
			</div>

			<div className={styles.row_level_end}>
				<h2>Misc Expertise Score</h2>
				<div className={styles.row_level_end_options}>

					<div style={{ width: '24%' }}>
						<div>Minimum Transacting Accounts</div>
						<Input size="sm" placeholder="Enter Minimum Transa..." style={{ width: '80%' }} />
					</div>
					<div style={{ width: '24%' }}>
						<div>Retained Account Count (min)</div>
						<Input size="sm" placeholder="Enter Retained accou....." style={{ width: '80%' }} />
					</div>
					<div style={{ width: '24%' }}>
						<div>Retained Account Min Duration (months)</div>
						<Input size="sm" placeholder="Enter Score" style={{ width: '80%' }} />
					</div>

				</div>

			</div>

		</div>
	);
}

export default KamLevelCard;
