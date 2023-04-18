import { cl } from '@cogoport/components';

import useGetTicketStats from '../../../../hooks/useGetTicketStats';
import useListTickets from '../../../../hooks/useListTickets';
import ReceiveDiv from '../../Conversations/Messages/MessageConversations/ReceiveDiv';

import styles from './styles.module.css';

function Tickets({ formattedMessageData = {}, activeVoiceCard = {}, activeTab = '' }) {
	const {
		user_id = '',
		lead_user_id = '',
	} = formattedMessageData || {};

	const {
		user_data = {},
	} = activeVoiceCard || {};

	const DATA_MAPPING = {
		voice: {
			userId     : user_data?.id,
			leadUserId : null,
		},
		message: {
			userId     : user_id,
			leadUserId : lead_user_id,
		},
	};
	const { userId, leadUserId } = DATA_MAPPING[activeTab];

	const { data } = useGetTicketStats({ UserID: userId || leadUserId });
	const {
		ticketData:{ items = [] } = {},
		loading,
	} = useListTickets({ UserID: userId || leadUserId });

	const { HighPriority = 0, Unresolved = 0, Closed = 0 } = data || {};

	const STATS_MAPPING = [
		{ title: 'High Priority Tickets', value: HighPriority },
		{ title: 'Unresolved Tickets', value: Unresolved },
		{ title: 'Closed Tickets', value: Closed },
	];
	return (
		<div className={styles.container}>
			<div>
				<div className={styles.title}>Tickets Raised</div>
				<div className={styles.ticket_count}>
					{STATS_MAPPING.map((eachStat, index) => (
						<div
							className={cl`${styles.ticket_count_data} ${index !== 0 ? styles.margin_left : ''}`}
						>
							<div className={styles.ticket_count_content}>
								{eachStat?.value || 0}
							</div>
							<div className={styles.ticket_count_content}>
								{eachStat?.title}
							</div>
						</div>
					))}
				</div>
				{items.map((eachTicket) => {
					const {
						Data: { InvoiceID = '', Message = '' } = {},
						CreatedAt = '',
						Type = '',
						Description = '',
						Priority = '',
						IsUrgent = false,
						Status = '',
					} = eachTicket || {};
					const eachMessage = {
						message_type : 'text',
						created_at   : Date.now(CreatedAt),
						response     : {
							message: Message,
						},
					};
					return (
						<div className={styles.ticket_container}>
							<div className={styles.message_content}>
								<ReceiveDiv eachMessage={eachMessage} canRaiseTicket={false} />
								<div className={styles.ticket_details}>
									<div className={styles.ticket_status}>
										{/* {startCase(Status)}
										{startCase(Priority)} */}
										<div className={styles.ticket_priority}>
											{Status}
										</div>

										<div className={styles.ticket_priority}>
											{Priority}
										</div>
									</div>
									<div className={styles.ticket_description}>
										{Description}
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Tickets;
