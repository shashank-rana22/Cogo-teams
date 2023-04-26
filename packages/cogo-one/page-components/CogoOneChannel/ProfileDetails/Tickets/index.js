import { cl, Placeholder, Pagination } from '@cogoport/components';
import { IcMPlusInCircle, IcMTag } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
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
		filter = '',
		refetchTickets,
		setPagination = () => {},
		agentId = '',
	} = zippedTicketsData || {};

	const { Requested = 0, Unresolved = 0, Closed = 0 } = statsData || {};

	const {
		createTicketActivity,
		loading = false,
	} = useCreateTicketActivity({ refetchTickets });

	const { items = [], page = 0, size = 0, total = 0	} = ticketData || {};

	const STATS_MAPPING = [
		{
			title     : 'Tickets Requested',
			value     : Requested,
			key       : 'requested',
			iconColor : '#F8AEA8',
		},
		{
			title     : 'Tickets to Follow up',
			value     : Unresolved,
			key       : 'unresolved',
			iconColor : '#FEF199',
		},
		{
			title     : 'Tickets Closed',
			value     : Closed,
			key       : 'closed',
			iconColor : '#E0E0E0',
		},
	];
	const router = useRouter();

	const handleCardClick = (id) => {
		const newUrl = `${window.location.origin}/${router?.query?.partner_id}/ticket-management/dashboard/${id}`;
		window.location.href = newUrl;
	};

	const renderTickets = () => {
		if (listLoading) {
			return (
				<div className={styles.loader}>
					<img
						className={styles.loader_styles}
						src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/spinner.svg"
						alt="load"
					/>
				</div>
			);
		}
		if (isEmpty(items)) {
			return (
				<div className={styles.loader}>
					<img
						className={styles.empty_state}
						src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/docs_empty_state.png"
						alt="empty state"

					/>
					<div className={styles.no_tickets}>No Tickets Found</div>
				</div>
			);
		}
		return items?.map((eachTicket) => (
			<EachTicket
				eachTicket={eachTicket}
				loading={listLoading}
				createTicketActivity={createTicketActivity}
				activityLoading={loading}
				agentId={agentId}
				handleCardClick={handleCardClick}
			/>
		));
	};
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
							<div
								tabIndex={0}
								role="button"
								onClick={() => setFilter(eachStat?.key)}
								className={styles.stats_container_styles}
							>
								<IcMTag className={styles.tag_container} fill={eachStat?.iconColor} />
								<div className={styles.ticket_count}>
									{eachStat.value || 0}
								</div>
								<div className={styles.lower_title}>
									{eachStat.title || '-'}
								</div>
							</div>
						) : <Placeholder height="90px" width="100%" />}
					</div>
				))}
			</div>
			<div className={styles.list_container}>{renderTickets()}</div>
			<Pagination
				className={styles.pagination_container}
				type="page"
				currentPage={page + 1}
				totalItems={total}
				pageSize={size}
				onPageChange={setPagination}
			/>
		</div>
	);
}

export default Tickets;
