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
	} = zippedTicketsData || {};

	const { HighPriority = 0, Unresolved = 0, Closed = 0 } = statsData || {};

	const { items = [] } = ticketData || {};
	const STATS_MAPPING = [
		{ title: 'High Priority', value: HighPriority },
		{ title: 'Unresolved', value: Unresolved },
		{ title: 'Closed', value: Closed },
	];

	const ticketsList = listLoading ? [...Array(3).fill({})] : items;
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.title}>Tickets Raised</div>
				<IcMPlusInCircle className={styles.styled_plus} onClick={createTicket} />
			</div>

			<div className={styles.stats_div}>
				{STATS_MAPPING.map((eachStat, index) => (
					<div
						className={cl`${styles.individual_stats} ${index !== 0 ? styles.margin_left : ''}`}
					>
						{!statsLoading ? (
							<>
								<div className={styles.ticket_count}>
									{eachStat.value || 0}
								</div>
								<div className={styles.lower_title}>
									{eachStat.title || '-'}
								</div>
							</>
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
