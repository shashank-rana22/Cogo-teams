import { cl, Placeholder } from '@cogoport/components';
import { IcMPlusInCircle } from '@cogoport/icons-react';

import EachTicket from './EachTicket';
import styles from './styles.module.css';

function Tickets({ zippedTicketsData = {} }) {
	const {
		statsLoading,
		ticketData,
		listLoading,
		statsData,
		createTicket,
		setFilter,
		filter = '',
	} = zippedTicketsData || {};

	const { HighPriority = 0, Unresolved = 0, Closed = 0 } = statsData || {};

	const { items = [] } = ticketData || {};
	const STATS_MAPPING = [
		{ title: 'High Priority', value: HighPriority, key: 'priority' },
		{ title: 'Unresolved', value: Unresolved, key: 'unresolved' },
		{ title: 'Closed', value: Closed, key: 'closed' },
	];
	console.log(filter);
	const ticketsList = listLoading ? [...Array(2).fill({})] : items;
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.title}>Tickets Raised</div>
				<IcMPlusInCircle className={styles.styled_plus} onClick={createTicket} />
			</div>

			<div className={styles.stats_div}>
				{STATS_MAPPING.map((eachStat, index) => (
					<div
						className={
							cl`${styles.individual_stats} 
							${index !== 0 ? styles.margin_left : ''} 
							${eachStat?.key === filter ? styles.selected_tab : ''}`
						}
						key={eachStat?.key}
					>
						{!statsLoading ? (
							<div tabIndex={0} role="button" onClick={() => setFilter(eachStat?.key)}>
								<div className={styles.ticket_count}>
									{eachStat.value || 0}
								</div>
								<div className={styles.lower_title}>
									{eachStat.title || '-'}
								</div>
							</div>
						) : <Placeholder height="50px" width="100%" />}
					</div>
				))}
			</div>
			<div className={styles.list_container}>
				{ticketsList?.map((eachTicket) => <EachTicket eachTicket={eachTicket} loading={listLoading} />)}
			</div>
		</div>
	);
}

export default Tickets;
