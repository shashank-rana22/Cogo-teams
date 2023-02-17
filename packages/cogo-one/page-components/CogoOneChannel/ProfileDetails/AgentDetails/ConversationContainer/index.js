import { snakeCase } from '@cogoport/utils';

import ConservationControls from './conversationControls';
import styles from './styles.module.css';

function ConversationContainer() {
	return (
		<div className={styles.contacts_container}>
			{ConservationControls.map((item, index) => {
				const { icon, name, organization, duration } = item;
				const itemKey = `${snakeCase(name)}_${index}`;

				return (
					<div className={styles.container} key={itemKey}>
						<div className={styles.details}>
							<div className={styles.icon_type}>{icon}</div>
							<div className={styles.header}>
								<div className={styles.name}>{name}</div>
								<div className={styles.duration}>{duration}</div>
							</div>
						</div>
						<div className={styles.organization}>{organization}</div>
					</div>
				);
			})}
		</div>
	);
}
export default ConversationContainer;
