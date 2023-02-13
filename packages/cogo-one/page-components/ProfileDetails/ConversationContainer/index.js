import styles from './styles.module.css';

function ConversationContainer() {
	return (
		<div className={styles.container}>
			<div className={styles.icon_type}>kdf</div>
			<div className={styles.details}>
				<div className={styles.header}>
					<div className={styles.name}>Rita rio</div>
					<div className={styles.duration}>10m</div>
				</div>
				<div className={styles.organization}>Organisation 3</div>
				<div className={styles.message}>
					Hello My name is cogoassist from cogoport and I’ll be.....
				</div>
			</div>
		</div>
	);
}
export default ConversationContainer;
