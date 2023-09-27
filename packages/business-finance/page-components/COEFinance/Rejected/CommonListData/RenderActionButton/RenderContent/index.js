import styles from './styles.module.css';

function RenderContent({
	setShowTicketModal = () => {},
	setShowPopover = () => {},
	onClickApprove = () => {},
	onClickViewInvoice = () => {},
	query = {},
}) {
	return (
		<div className={styles.container}>
			<div
				className={styles.styled_text}
				role="presentation"
				onClick={onClickViewInvoice}
			>
				View Invoice
			</div>
			{(query?.view === 'coe_rejected' || query?.view === 'coe_on_hold') ? (
				<>
					<div
						className={styles.styled_text}
						role="presentation"
						onClick={() => {
							setShowTicketModal(true);
							setShowPopover(false);
						}}
					>
						<div className={styles.hr} />
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
				</>
			) : null}

		</div>
	);
}

export default RenderContent;
