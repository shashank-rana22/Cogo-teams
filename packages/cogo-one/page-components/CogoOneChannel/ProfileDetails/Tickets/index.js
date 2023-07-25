import { cl, Placeholder, Pagination } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMPlusInCircle, IcMTicket, IcMRefresh } from '@cogoport/icons-react';
import { useRouter, Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';

import useCreateTicketActivity from '../../../../hooks/useCreateTicketActivity';

import EachTicket from './EachTicket';
import styles from './styles.module.css';
import TicketLoader from './TicketLoader';

const PAGE_LIMIT = 10;
const DEFAULT_STAT_COUNT = 0;
const PAGE_COUNT = 1;

function Tickets({ zippedTicketsData = {}, setActiveSelect = () => {} }) {
	const { query } = useRouter();
	const { partner_id: partnerId = '' } = query || {};

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
		isUserOnboarded = false,
	} = zippedTicketsData || {};

	const { Requested = 0, Unresolved = 0, Closed = 0 } = statsData || {};

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
			iconColor : '#fcdc00',
		},
		{
			title     : 'Tickets Closed',
			value     : Closed,
			key       : 'closed',
			iconColor : '#E0E0E0',
		},
	];

	const {
		createTicketActivity,
		loading = false,
	} = useCreateTicketActivity({ refetchTickets });

	const { items = [], page = 0, size = 0, total = 0	} = ticketData || {};

	const handleCardClick = (id) => {
		const redirectUrl = `${window.location.origin}/v2/${partnerId}/ticket-management/my-tickets?ticket_id=${id}`;
		window.open(redirectUrl, '_blank');
	};

	const refetchLoading = statsLoading || listLoading;
	if (!isUserOnboarded) {
		return (
			<div className={styles.loader}>
				<Image
					src={GLOBAL_CONSTANTS.image_url.ticket_not_created}
					width={200}
					height={200}
					alt="ticket not created"
				/>
				<div className={styles.anonymous_user}>
					Ticket cannot be created as this user is not onboarded
					<span role="presentation" onClick={() => setActiveSelect('profile')}>Click here</span>
				</div>
			</div>
		);
	}

	const renderTickets = () => {
		if (listLoading) {
			return <TicketLoader />;
		}
		if (isEmpty(items)) {
			return (
				<div className={styles.loader}>
					<Image
						className={styles.empty_state}
						src={GLOBAL_CONSTANTS.image_url.ticket_not_found}
						alt="empty state"
						width={150}
						height={100}

					/>
					<div className={styles.no_tickets}>No Tickets Found</div>
				</div>
			);
		}
		return items?.map((eachTicket) => (
			<EachTicket
				key={eachTicket.ID}
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
				<div className={styles.icon_container}>
					<IcMRefresh
						className={styles.refresh_container}
						onClick={() => {
							if (!refetchLoading) {
								refetchTickets();
							}
						}}
						style={{ cursor: refetchLoading ? 'not-allowed' : 'pointer' }}
					/>
					<IcMPlusInCircle className={styles.styled_plus} onClick={createTicket} />
				</div>
			</div>
			<div className={styles.stats_div}>
				{STATS_MAPPING.map((eachStat) => (
					<div
						role="presentation"
						className={
							cl`${styles.individual_stats} 
							${eachStat?.key === filter ? styles.selected_tab : ''}`
						}
						key={eachStat?.key}
						onClick={() => setFilter(eachStat?.key)}
					>
						{statsLoading ? (
							<Placeholder width="100%" height="70px" className={styles.placeholder_container} />
						)
							: (
								<>
									<IcMTicket className={styles.tag_container} fill={eachStat?.iconColor} />
									<div className={styles.ticket_count}>
										{eachStat.value || DEFAULT_STAT_COUNT}
									</div>
									<div className={styles.lower_title}>
										{eachStat.title || '-'}
									</div>
								</>
							)}
					</div>
				))}
			</div>
			<div className={styles.list_container}>{renderTickets()}</div>

			{total > PAGE_LIMIT && (
				<Pagination
					className={styles.pagination_container}
					type="page"
					currentPage={page + PAGE_COUNT}
					totalItems={total}
					pageSize={size}
					onPageChange={setPagination}
				/>
			)}
		</div>
	);
}

export default Tickets;
