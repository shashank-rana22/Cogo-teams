import { Select } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import {
	getThisMonthStartDate,
	getThisMonthLastDate,
} from '../../../../../utils/start-date-functions';
import DURATION_OPTIONS from '../../../../Leaderboard/configurations/get-duration-filter-options';
import onChangeDuration from '../../../utils/changeDuration';

import LeaderBoard from './LeaderBoard';
import QuestLeaderBoard from './QuestLeaderBoard';
import styles from './styles.module.css';

const durationOptions = DURATION_OPTIONS.filter((item) => item.value !== 'custom');

function RightPanel(props) {
	const {
		view, updatedAt,
		questId,
		setQuestId,
		officeLocation,
	} = props;

	const [topDateRange, setTopDateRange] = useState({
		startDate : getThisMonthStartDate(),
		endDate   : getThisMonthLastDate(),
	});

	const [topSelect, setTopSelect] = useState('this_month');

	return (
		<div className={styles.container}>
			<div className={styles.inner_container}>
				<div className={styles.inner_container_header}>
					<div className={styles.inner_container_heading}>
						Top3:
						{' '}
						<span className={styles.inner_container_heading_span}>
							{startCase(topSelect)}
						</span>
					</div>
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
				</div>
				<LeaderBoard view={view} dateRange={topDateRange} updatedAt={updatedAt} />
			</div>

			<div className={styles.inner_container}>
				<QuestLeaderBoard
					questId={questId}
					setQuestId={setQuestId}
					officeLocation={officeLocation}
				/>
			</div>
		</div>
	);
}

export default RightPanel;
