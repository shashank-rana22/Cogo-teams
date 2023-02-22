import { IcCWhatsapp, IcMEmail } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function ConversationContainer({ userData }) {
	const { email, name, whatsapp_number_eformat } = userData || {};

	if (isEmpty(userData)) {
		return (
			<div className={styles.empty}>No data Found...</div>
		);
	}
	return (
		<div className={styles.wrapper}>
			{!isEmpty(whatsapp_number_eformat) && (
				<div className={styles.contacts_container}>
					<div className={styles.container}>
						<div className={styles.details}>
							<div className={styles.icon_type}><IcCWhatsapp width={23} height={23} /></div>
							<div className={styles.header}>
								<div className={styles.name}>{name}</div>
							</div>
						</div>
						<div className={styles.organization}>{whatsapp_number_eformat}</div>
					</div>
				</div>
			)}
			{!isEmpty(email) && (
				<div className={styles.contacts_container}>
					<div className={styles.container}>
						<div className={styles.details}>
							<div className={styles.icon_type}><IcMEmail width={23} height={23} fill="#E09B3D" /></div>
							<div className={styles.header}>
								<div className={styles.name}>{name}</div>
							</div>
						</div>
						<div className={styles.organization}>{email}</div>
					</div>
				</div>
			)}
		</div>
	);
}
export default ConversationContainer;
