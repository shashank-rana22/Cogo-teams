import { Placeholder } from '@cogoport/components';
import { IcMTick, IcMCross } from '@cogoport/icons-react';

import ReceiveDiv from '../../../../../common/ReceiveDiv';

import styles from './styles.module.css';

function EachTicket({ eachTicket = {}, loading = false }) {
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

	return (
		<div className={styles.message_content} key={ID}>
			{!loading ? (
				<>
					<div className={styles.overflow_div}>
						<div className={styles.ticket_banner}>
							<div className={styles.tick_cross}>
								<div>
									<IcMTick width={20} height={20} fill="#828282" />
								</div>
								<div>
									<IcMCross width={20} height={17} fill="#828282" />
								</div>
							</div>
							{InvoiceNumber > 0 && (
								<div className={styles.detail_div}>
									<div>Invoice ID:</div>
									<div className={styles.number_div}>{InvoiceNumber}</div>
								</div>
							) }
							{ShipmentID > 0 && (
								<div className={styles.detail_div}>
									<div>Shipment ID:</div>
									<div className={styles.number_div}>{ShipmentID}</div>
								</div>
							) }
						</div>
					</div>
					<ReceiveDiv eachMessage={eachMessage} canRaiseTicket={false} />
					<div className={styles.ticket_details}>
						<div className={styles.ticket_status}>
							<div className={styles.ticket_priority}>
								{Status}
							</div>
							<div className={styles.ticket_priority}>
								{Priority}
							</div>
						</div>
						<div className={styles.ticket_description}>
							{TicketActivityDescription}
						</div>
					</div>
				</>
			) : <Placeholder height="20px" width="100%" />}
		</div>
	);
}
export default EachTicket;
