import { Select, cl } from '@cogoport/components';
import { IcMRefresh } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import SCREEN_CONSTANTS from '../../../../constants/screen-constants';
import Counter from '../../common/Counter';
import DateFilter from '../../common/DateFilter';
import TEXT_MAPPING from '../../configurations/header-text-mapping';
import VIEW_OPTIONS from '../../configurations/view-type-options';
import LEADERBOARD_LOCATIONS from '../../utils/leaderboard-locations';

import CountDownTimer from './CountDownTimer';
import styles from './styles.module.css';

const { OVERALL, COMPARISION } = SCREEN_CONSTANTS;

const leaderBoardOptions = Object.entries(LEADERBOARD_LOCATIONS).map(([location,
	locationDetails]) => ({ label: locationDetails.label, value: location }));

const handleLocationChange = ({ location, push, setOfficeLocation }) => {
	if (location) push(`/performance-and-incentives/public-leaderboard?location=${location}`);
	else push('/performance-and-incentives/public-leaderboard');

	setOfficeLocation(location);
};

function Header(props) {
	const {
		screen, view, setView, dateRange, setDateRange, updatedAt, countdown, duration, setDuration, switchScreen,
		reloadCounter, nextReloadAt,
		officeLocation,
		setOfficeLocation,
	} = props;

	const { push } = useRouter();

	return (
		<div className={styles.container}>

			<div className={styles.sub_container}>
				<div
					className={styles.info_icon_div}
					onClick={switchScreen}
					role="presentation"
				>
					<IcMRefresh
						className={cl`${styles.swicth_icon} ${screen === OVERALL && styles.swicth_icon_active}`}
					/>
					<Counter
						reloadCounter={reloadCounter}
						nextReloadAt={nextReloadAt}
					/>
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

				{screen === OVERALL ? (
					<Select
						value={officeLocation}
						onChange={(location) => handleLocationChange({ location, push, setOfficeLocation })}
						options={leaderBoardOptions}
						placeholder="Location"
						className={styles.location_selector}
						isClearable
					/>
				) : null}

				{screen === COMPARISION ? (
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
					onChange={setView}
					options={VIEW_OPTIONS}
					className={styles.user_selector}
				/>

				<CountDownTimer updatedAt={updatedAt} countdown={countdown} />

			</div>

		</div>
	);
}

export default Header;
