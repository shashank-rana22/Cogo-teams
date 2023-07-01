import getResultStatus from '../../../../../utils/getResultStatus';
import toFixed from '../../../../CreateModule/utils/toFixed';

import styles from './styles.module.css';

const STATUS_COLOR_MAPPING = {
	passed       : '#F7FAEF',
	intermediate : '#FEF3E9',
	failed       : '#F9F9F9',
};

function Percentile({ stats_data }) {
	const { user_percentile = '', cut_of_percentage, user_percentage } = stats_data || {};

	const status = getResultStatus({ cut_of_percentage, user_percentage });

	const background = STATUS_COLOR_MAPPING[status];

	return (
		<div className={styles.main_container}>
			<div className={styles.container} style={{ background }}>
				Percentile

				<div className={styles.percentile}>
					{toFixed(user_percentile, 2)}
					{' '}
					%
				</div>
			</div>
		</div>
	);
}

export default Percentile;
