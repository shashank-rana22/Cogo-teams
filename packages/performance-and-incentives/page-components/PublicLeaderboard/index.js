import { useCallback, useMemo, useState } from 'react';

import { getTodayStartDate } from '../../utils/start-date-functions';

import Body from './components/Body';
import Header from './components/Header';
import PublicLeaderBoardContext from './context/PublicLeaderBoardContext';
import useCountDown from './hooks/useCountDown';
import useReloadCounter from './hooks/useReloadCounter';
import styles from './styles.module.css';

function PublicDashboard() {
	const [screen, setScreen] = useState('comparison');
	const [view, setView] = useState('kam_wise');
	const [updatedAt, setUpdatedAt] = useState('');
	const [nextReloadAt, setNextReloadAt] = useState(100);
	const [duration, setDuration] = useState('today');

	const [dateRange, setDateRange] = useState({
		startDate : getTodayStartDate(),
		endDate   : new Date(),
	});

	const switchScreen = useCallback(() => {
		if (screen === 'overall') setScreen('comparison');
		else setScreen('overall');
		setDuration('today');
		setDateRange({
			startDate : getTodayStartDate(),
			endDate   : new Date(),
		});
	}, [screen, setScreen]);

	const { countdown } = useCountDown({ updatedAt });

	const { reloadCounter } = useReloadCounter({ seconds: nextReloadAt, functionToCall: switchScreen });

	const contextValues = useMemo(() => ({
		countdown,
	}), [countdown]);

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
				/>

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
				/>
			</div>
		</PublicLeaderBoardContext.Provider>
	);
}

export default PublicDashboard;
