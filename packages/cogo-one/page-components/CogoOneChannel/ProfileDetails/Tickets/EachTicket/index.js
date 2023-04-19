import { Placeholder } from '@cogoport/components';

import ReceiveDiv from '../../../../../common/ReceiveDiv';

import styles from './styles.module.css';

function EachTicket({ eachTicket = {}, loading = false }) {
	const {
		Data: { InvoiceID = '', Message = '' } = {},
		CreatedAt = '',
		Type = '',
		Description = '',
		Priority = '',
		Status = '',
		ID = '',
	} = eachTicket || {};

	const eachMessage = {
		message_type : 'text',
		created_at   : Date.now(CreatedAt),
		response     : {
			message: Message,
		},
	};

	return (
		<div className={styles.message_content} key={ID}>
			{!loading ? (
				<>
					<div className={styles.overflow_div}>
						<ReceiveDiv eachMessage={eachMessage} canRaiseTicket={false} />
					</div>
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
							{Description}
						</div>
					</div>
				</>
			) : <Placeholder height="300px" width="100px" />}
		</div>
	);
}
export default EachTicket;
