import { Placeholder, Tooltip } from '@cogoport/components';
import { IcMTick, IcMCross, IcMProvision } from '@cogoport/icons-react';

import ReceiveDiv from '../../../../../common/ReceiveDiv';

import styles from './styles.module.css';

function EachTicket({
	eachTicket = {},
	loading = false,
	createTicketActivity = () => {},
}) {
	const {
		Data: { InvoiceNumber = 0, Message = '', ShipmentID = 0 } = {},
		CreatedAt = '',
		// Type = '',
		TicketActivityDescription = '',
		Priority = '',
		Status = '',
		ID = '',
	} = eachTicket || {};

	const eachMessage = {
		message_type : 'text',
		created_at   : CreatedAt,
		response     : {
			message: Message,
		},
	};
	const handleTicketActivity = ({ type = '', status = '' }) => {
		const payload = {
			TicketID : [Number(ID)],
			Type     : type,
			Status   : status,
		};
		createTicketActivity(payload);
	};

	return (
		<div
			className={
        Status === 'closed' ? styles.message_content_close : styles.message_content
      }
			key={ID}
		>
			{!loading ? (
				<>
					<div className={styles.overflow_div}>
						<div className={styles.ticket_banner}>
							{Status === 'closed' ? (
								<div className={styles.tick_cross}>
									<Tooltip placement="bottom" content="Reopen">
										<IcMProvision
											width={20}
											height={20}
											fill="#828282"
											onClick={() => handleTicketActivity({
												type   : 'reopened',
												status : 'reopened',
											})}
										/>
									</Tooltip>
								</div>
							) : (
								<div className={styles.tick_cross}>
									<div>
										<Tooltip placement="bottom" content="Resolve">
											<IcMTick
												width={20}
												height={20}
												fill="#828282"
												onClick={() => handleTicketActivity({
													type   : 'mark_as_resolved',
													status : 'resolved',
												})}
											/>
										</Tooltip>
									</div>
									<div>
										<Tooltip placement="bottom" content="Reject">
											<IcMCross
												width={20}
												height={17}
												fill="#828282"
												onClick={() => handleTicketActivity({
													type   : 'rejected',
													status : 'rejected',
												})}
											/>
										</Tooltip>
									</div>
								</div>
							)}

							{InvoiceNumber > 0 && (
								<div
									className={
                    Status === 'closed' ? styles.detail_div_close : styles.detail_div
                  }
								>
									<div>Invoice ID:</div>
									<div className={styles.number_div}>{InvoiceNumber}</div>
								</div>
							)}
							{ShipmentID > 0 && (
								<div className={styles.detail_div}>
									<div>Shipment ID:</div>
									<div className={styles.number_div}>{ShipmentID}</div>
								</div>
							)}
						</div>
					</div>
					<ReceiveDiv eachMessage={eachMessage} canRaiseTicket={false} />
					<div
						className={
              Status === 'closed' ? styles.ticket_details_close : styles.ticket_details
            }
					>
						<div className={styles.ticket_status}>
							<div className={styles.ticket_priority}>{Status}</div>
							<div className={styles.ticket_priority}>{Priority}</div>
						</div>
						<div className={styles.ticket_description}>
							{TicketActivityDescription}
						</div>
					</div>
				</>
			) : (
				<Placeholder height="20px" width="100%" />
			)}
		</div>
	);
}
export default EachTicket;
