import styles from './styles.module.css';

function RenderContent({ setShowTicketModal = () => {} }) {
	return (
		<div className={styles.container}>
			<div
				className={styles.styled_text}
				role="presentation"
				onClick={() => setShowTicketModal(true)}
			>
				Raise Ticket
				<div className={styles.hr} />
			</div>
			<div className={styles.styled_text}>
				Delete
			</div>
		</div>
	);
}

export default RenderContent;
