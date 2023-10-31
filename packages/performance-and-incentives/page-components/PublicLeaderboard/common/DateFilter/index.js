import { DateRangepicker, Select, cl } from '@cogoport/components';

import DURATION_CONSTANTS from '../../../../constants/duration-constants';
import DURATION_OPTIONS from '../../../Leaderboard/configurations/get-duration-filter-options';
import onChangeDuration from '../../utils/changeDuration';

import styles from './styles.module.css';

const { CUSTOM } = DURATION_CONSTANTS;

function DateFilter(props) {
	const { duration = 'today', setDuration, dateRange, setDateRange, screen = 'overall', width = '180px' } = props;
	return (
		<div className={cl`${styles.container} ${screen === 'comparison' && styles.container_header}`}>
			<Select
				size={screen === 'overall' ? 'sm' : 'md'}
				value={duration}
				onChange={(selectedDuration) => onChangeDuration({
					selectedDuration,
					setDateRange,
					setDuration,
				})}
				options={DURATION_OPTIONS}
				style={{ width }}
			/>
			{duration === CUSTOM && (
				<DateRangepicker
					size="sm"
					onChange={setDateRange}
					value={dateRange}
					maxDate={new Date()}
					isPreviousDaysAllowed
				/>
			)}
		</div>
	);
}

export default DateFilter;
