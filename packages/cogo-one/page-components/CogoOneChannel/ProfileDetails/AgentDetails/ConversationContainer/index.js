import { IcCWhatsapp, IcMEmail } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
// import { snakeCase } from '@cogoport/utils';

// import ConservationControls from './conversationControls';
import styles from './styles.module.css';

function ConversationContainer({ userData, userId }) {
	const { email, name, whatsapp_number_eformat } = userData || {};

	if (isEmpty(userId)) {
		return (
			<div className={styles.empty}>No data Found...</div>
		);
	}
	return (
		<div className={styles.wrapper}>
			<div className={styles.contacts_container}>
				<div className={styles.container}>
					<div className={styles.details}>
						<div className={styles.icon_type}><IcCWhatsapp width={20} height={20} /></div>
						<div className={styles.header}>
							<div className={styles.name}>{name}</div>
						</div>
					</div>
					<div className={styles.organization}>{whatsapp_number_eformat}</div>
				</div>
			</div>
			<div className={styles.contacts_container}>
				<div className={styles.container}>
					<div className={styles.details}>
						<div className={styles.icon_type}><IcMEmail width={20} height={20} fill="#E09B3D" /></div>
						<div className={styles.header}>
							<div className={styles.name}>{name}</div>
						</div>
					</div>
					<div className={styles.organization}>{email}</div>
				</div>
			</div>
		</div>
	);
}
export default ConversationContainer;
