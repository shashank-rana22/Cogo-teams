import toFixed from '../../../../CreateModule/utils/toFixed';

import styles from './styles.module.css';

function Percentile({ stats_data, hasPassed }) {
	const { user_percentile = '' } = stats_data || {};

	return (
		<div className={styles.main_container}>
			<div className={styles.container} style={{ background: hasPassed ? '#f7faef' : '#fef3f1' }}>
				Percentile
				<div className={styles.percentile} style={{ color: hasPassed ? '#849e4c' : '#bf2a1e' }}>
					{toFixed(user_percentile, 2)}
					{' '}
					%
				</div>
			</div>
		</div>
	);
}

export default Percentile;
