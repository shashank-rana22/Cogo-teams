import { Select } from '@cogoport/components';
import { useState } from 'react';

import {
	getThisMonthStartDate,
	getLastMonthStartAndEndDates, getThisMonthLastDate,
} from '../../../../../utils/start-date-functions';
import DURATION_OPTIONS from '../../../../Leaderboard/configurations/get-duration-filter-options';
import onChangeDuration from '../../../utils/changeDuration';

import LeaderBoard from './LeaderBoard';
import styles from './styles.module.css';

const durationOptions = DURATION_OPTIONS.filter((item) => item.value !== 'custom');

function RightPanel(props) {
	const { view } = props;

	const { startDate, endDate } = getLastMonthStartAndEndDates();

	const [topDateRange, setTopDateRange] = useState({
		startDate : getThisMonthStartDate(),
		endDate   : getThisMonthLastDate(),
	});

	const [bottomDateRange, setBottomDateRange] = useState({
		startDate,
		endDate,
	});

	const [topSelect, setTopSelect] = useState('this_month');
	const [bottomSelect, setBottomSelect] = useState('last_month');

	return (
		<div className={styles.container}>
			<div className={styles.inner_container}>
				<Select
					value={topSelect}
					onChange={(selectedDuration) => onChangeDuration({
						selectedDuration,
						setDateRange : setTopDateRange,
						setDuration  : setTopSelect,
					})}
					size={window.innerWidth >= 2560 ? 'md' : 'sm'}
					options={durationOptions}
					className={styles.period_selector}
				/>
				<LeaderBoard view={view} dateRange={topDateRange} />
			</div>

			<div className={styles.inner_container}>
				<Select
					value={bottomSelect}
					onChange={(selectedDuration) => onChangeDuration({
						selectedDuration,
						setDateRange : setBottomDateRange,
						setDuration  : setBottomSelect,
					})}
					size={window.innerWidth >= 2560 ? 'md' : 'sm'}
					options={durationOptions}
					className={styles.period_selector}
				/>
				<LeaderBoard view={view} dateRange={bottomDateRange} />
			</div>
		</div>
	);
}

export default RightPanel;
