import { Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import FilterTicketsSection from '../../common/FilterTicketsSection';

import RaiseTickets from './RaiseTickets';
import StatsSection from './StatsSection';
import styles from './styles.module.css';

function MyTickets() {
	const { t } = useTranslation(['myTickets']);

	const [showRaiseTicket, setShowRaiseTicket] = useState(false);
	const [spectatorType, setSpectatorType] = useState('reviewer');
	const [refreshList, setRefreshList] = useState({
		Open      : false,
		Pending   : false,
		Escalated : false,
		Closed    : false,
	});

	return (
		<div>
			<div className={styles.head}>
				<span className={styles.title}>
					{t('myTickets:dashboard_heading')}
				</span>
				<Button onClick={() => setShowRaiseTicket(true)}>
					{t('myTickets:raise_ticket')}
				</Button>
			</div>
			<StatsSection spectatorType={spectatorType} />
			<FilterTicketsSection
				refreshList={refreshList}
				setRefreshList={setRefreshList}
				spectatorType={spectatorType}
				setSpectatorType={setSpectatorType}
			/>

			{showRaiseTicket && (
				<RaiseTickets
					setShowRaiseTicket={setShowRaiseTicket}
					showRaiseTicket={showRaiseTicket}
					setRefreshList={setRefreshList}
				/>
			)}
		</div>
	);
}

export default MyTickets;
