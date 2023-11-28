import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

import styles from './styles.module.css';

function Quests(props) {
	const { data = {}, option = {} } = props;

	const { name = '', start_date = '', end_date = '' } = data || option || {};

	return (
		<div>
			{name}
			<div className={styles.date_range}>
				{formatDate({
					date       : start_date,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					formatType : 'date',
				})}
				{' - '}
				{formatDate({
					date       : end_date,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					formatType : 'date',
				})}
			</div>
		</div>
	);
}

export default Quests;
