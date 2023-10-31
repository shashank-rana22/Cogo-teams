import { Select } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMInfo } from '@cogoport/icons-react';

import DateFilter from '../../common/DateFilter';
import USER_OPTIONS from '../../configurations/get-user-filter-options';
import TEXT_MAPPING from '../../configurations/header-text-mapping';

import CountDownTimer from './CountDownTimer';
import styles from './styles.module.css';

function Header(props) {
	const {
		screen, setScreen, view, setView, dateRange, setDateRange, updatedAt, countdown, duration, setDuration,
	} = props;

	const onClickChangeScreen = () => {
		if (screen === 'overall') setScreen('comparison');
		else setScreen('overall');
	};

	return (
		<div className={styles.container}>

			<div className={styles.sub_container}>
				<div
					className={styles.info_icon_div}
					onClick={onClickChangeScreen}
					role="presentation"
				>
					<IcMInfo className={styles.info_icon} />
				</div>
				<h2 className={styles.heading}>
					Leaderboards
				</h2>
				<p className={styles.sub_heading}>
					for
					{' '}
					<i>
						<b>{TEXT_MAPPING[view]}</b>

						{' '}
						(
						{view === 'kam_wise' ? 'Individual Contribution' : 'Team Contributions'}
						)

					</i>
				</p>

			</div>

			<div className={styles.end_side}>
				{screen === 'comparison' ? (
					<DateFilter
						screen={screen}
						dateRange={dateRange}
						duration={duration}
						setDuration={setDuration}
						setDateRange={setDateRange}
					/>
				) : null}
				<Select
					value={view}
					onChange={(selectedView) => setView(selectedView)}
					options={USER_OPTIONS}
					className={styles.user_selector}
				/>

				<div>
					<CountDownTimer updatedAt={updatedAt} countdown={countdown} />

					{updatedAt && (
						<p className={styles.last_updated_at}>
							Last updated:
							{' '}
							{formatDate({
								date       : updatedAt,
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
								formatType : 'dateTime',
								separator  : '; ',
							})}
						</p>
					)}
				</div>
			</div>

		</div>
	);
}

export default Header;
