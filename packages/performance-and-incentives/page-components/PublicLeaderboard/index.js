import { useMemo, useState } from 'react';

import { getTodayStartDate } from '../../utils/start-date-functions';

import Body from './components/Body';
import Header from './components/Header';
import PublicLeaderBoardContext from './context/PublicLeaderBoardContext';
import useCountDown from './hooks/useCountDown';
import styles from './styles.module.css';

function PublicDashboard() {
	const [screen, setScreen] = useState('comparison');
	const [view, setView] = useState('kam_wise');
	const [updatedAt, setUpdatedAt] = useState('');

	const [dateRange, setDateRange] = useState({
		startDate : getTodayStartDate(),
		endDate   : new Date(),
	});

	const { countdown } = useCountDown({ updatedAt });

	const contextValues = useMemo(() => ({
		countdown,
	}), [countdown]);

	return (
		<PublicLeaderBoardContext.Provider value={contextValues}>
			<div className={styles.container}>
				<Header
					screen={screen}
					setScreen={setScreen}
					view={view}
					setView={setView}
					dateRange={dateRange}
					setDateRange={setDateRange}
					updatedAt={updatedAt}
					countdown={countdown}
				/>

				<Body
					screen={screen}
					view={view}
					dateRange={dateRange}
					updatedAt={updatedAt}
					setUpdatedAt={setUpdatedAt}
				/>
			</div>
		</PublicLeaderBoardContext.Provider>
	);
}

export default PublicDashboard;
