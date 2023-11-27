import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useCallback, useMemo, useState } from 'react';

import ScrollAnnouncement from '../../common/ScrollAnouncement';
import SCREEN_CONSTANTS from '../../constants/screen-constants';
import { getTodayStartDate } from '../../utils/start-date-functions';

import Body from './components/Body';
import Header from './components/Header';
import PublicLeaderBoardContext from './context/PublicLeaderBoardContext';
import useCountDown from './hooks/useCountDown';
import useReloadCounter from './hooks/useReloadCounter';
import styles from './styles.module.css';
import useGetQuests from './useGetQuests';

const { OVERALL, COMPARISION } = SCREEN_CONSTANTS;

function PublicDashboard() {
	const { query : { location } = {} } = useRouter();

	const [screen, setScreen] = useState(OVERALL);
	const [view, setView] = useState('kam_wise');
	const [updatedAt, setUpdatedAt] = useState('');
	const [nextReloadAt, setNextReloadAt] = useState(100);
	const [duration, setDuration] = useState('today');
	const [officeLocation, setOfficeLocation] = useState(location);
	const [quest, setQuest] = useState({});

	const [dateRange, setDateRange] = useState({
		startDate : getTodayStartDate(),
		endDate   : new Date(),
	});

	const switchScreen = useCallback(() => {
		if (screen === OVERALL) setScreen(COMPARISION);
		else setScreen(OVERALL);
		setDuration('today');
		setDateRange({
			startDate : getTodayStartDate(),
			endDate   : new Date(),
		});
	}, [screen, setScreen]);

	const { countdown } = useCountDown({ updatedAt });

	const { reloadCounter } = useReloadCounter({ seconds: nextReloadAt, functionToCall: switchScreen });

	const { list, loading: questLoading } = useGetQuests();

	const contextValues = useMemo(() => ({
		countdown,
		officeLocation,
	}), [countdown, officeLocation]);

	return (
		<PublicLeaderBoardContext.Provider value={contextValues}>
			<div className={styles.container}>
				<Header
					screen={screen}
					view={view}
					setView={setView}
					dateRange={dateRange}
					setDateRange={setDateRange}
					updatedAt={updatedAt}
					countdown={countdown}
					duration={duration}
					setDuration={setDuration}
					reloadCounter={reloadCounter}
					nextReloadAt={nextReloadAt}
					switchScreen={switchScreen}
					officeLocation={officeLocation}
					setOfficeLocation={setOfficeLocation}
				/>

				<ScrollAnnouncement style={{ margin: '0 16px' }} loading={questLoading} list={list} />

				<Body
					screen={screen}
					view={view}
					dateRange={dateRange}
					updatedAt={updatedAt}
					setUpdatedAt={setUpdatedAt}
					setDateRange={setDateRange}
					duration={duration}
					setDuration={setDuration}
					setNextReloadAt={setNextReloadAt}
					quest={quest}
					setQuest={setQuest}
					officeLocation={officeLocation}
					isQuestPresent={!isEmpty(list)}
				/>
			</div>
		</PublicLeaderBoardContext.Provider>
	);
}

export default PublicDashboard;
