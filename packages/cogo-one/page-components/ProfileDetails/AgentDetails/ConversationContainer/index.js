import ConservationControls from './conversationControls';
import styles from './styles.module.css';

function ConversationContainer() {
	return (
		<>
			{ConservationControls.map((item) => {
				const { icon, name, organization, duration } = item;
				return (
					<div className={styles.container}>
						<div className={styles.details}>
							<div className={styles.icon_type}>{icon}</div>
							<div className={styles.header}>
								<div className={styles.name}>{name}</div>
								<div className={styles.duration}>{duration}</div>
							</div>
						</div>
						<div className={styles.organization}>{organization}</div>
						{/* <div className={styles.message}>
							{message}
						</div> */}
					</div>
				);
			})}
		</>
	);
}
export default ConversationContainer;
