import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

import styles from './styles.module.css';

function FormattedDate({ dateTime = '' }) {
	const [date, time] = dateTime?.split(' ') || [];
	const [day, month, year] = date.split('-');
	const reversedDate = `${year}-${month}-${day} ${time}`;

	return (
		<>
			<div className={styles.time}>
				{date ? formatDate({
					date: reversedDate,
					dateFormat:
			GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					formatType: 'date',
				}) : '_'}
			</div>
			<div>
				{time ? formatDate({
					date       : reversedDate,
					timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
					formatType : 'time',
				}) : '_'}
			</div>
		</>
	);
}

export default FormattedDate;
