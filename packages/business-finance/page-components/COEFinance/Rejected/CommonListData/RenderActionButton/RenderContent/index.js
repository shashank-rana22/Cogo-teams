import styles from './styles.module.css';

function RenderContent({
	setShowTicketModal = () => {},
	setShowPopover = () => {},
	onClickApprove = () => {},
	onClickViewInvoice = () => {},
}) {
	return (
		<div className={styles.container}>
			<div
				className={styles.styled_text}
				role="presentation"
				onClick={onClickViewInvoice}
			>
				View Invoice
				<div className={styles.hr} />
			</div>
			<div
				className={styles.styled_text}
				role="presentation"
				onClick={() => {
					setShowTicketModal(true);
					setShowPopover(false);
				}}
			>
				Raise Ticket
				<div className={styles.hr} />
			</div>
			<div
				className={styles.styled_text}
				role="presentation"
				onClick={onClickApprove}
			>
				Approve
			</div>
		</div>
	);
}

export default RenderContent;
