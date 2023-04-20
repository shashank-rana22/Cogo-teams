import { cl, Placeholder, Pagination } from '@cogoport/components';
import { IcMPlusInCircle } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import useCreateTicketActivity from '../../../../hooks/useCreateTicketActivity';

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
		filter = '', refetchTickets, setPagination = () => {},
	} = zippedTicketsData || {};

	const { HighPriority = 0, Unresolved = 0, Closed = 0 } = statsData || {};
	const {
		createTicketActivity,
		loading = false,
	} = useCreateTicketActivity({ refetchTickets });
	const { items = [], page = 0, size = 0, total = 0	} = ticketData || {};

	const checkPage = total > 10;
	const STATS_MAPPING = [
		{ title: 'High Priority', value: HighPriority, key: 'priority' },
		{ title: 'Unresolved', value: Unresolved, key: 'unresolved' },
		{ title: 'Closed', value: Closed, key: 'closed' },
	];

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
				{ticketsList?.map((eachTicket) => (
					<EachTicket
						eachTicket={eachTicket}
						loading={listLoading}
						createTicketActivity={createTicketActivity}
						activityLoading={loading}
					/>
				))}
				{isEmpty(ticketsList) && (
					<div className={styles.empty_div}>
						<img src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/notes-empty.svg" alt="" />
						<div className={styles.no_tickets}>No Tickets Found</div>
					</div>
				)}
			</div>
			{checkPage && (
				<Pagination
					className={styles.pagination}
					type="page"
					currentPage={page + 1}
					totalItems={total}
					pageSize={size}
					onPageChange={(val) => setPagination(val)}

				/>
			)}
		</div>
	);
}

export default Tickets;
