import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function ResolveButton({ handleTicket, isModal }) {
	return (
		<Button
			size={isModal ? 'md' : 'sm'}
			themeType={isModal ? 'primary' : 'linkUi'}
			className={styles.reopen_resolve}
			onClick={(e) => handleTicket(e, 'resolve')}
		>
			Resolve
		</Button>
	);
}

function ResolveRequestButton({ handleTicket, isModal }) {
	return (
		<Button
			size={isModal ? 'md' : 'sm'}
			themeType={isModal ? 'primary' : 'linkUi'}
			className={styles.reopen_resolve}
			onClick={(e) => handleTicket(e, 'resolve_requested')}
		>
			Resolve Request
		</Button>
	);
}

function ApproveButton({ handleTicket, isModal }) {
	return (
		<Button
			size={isModal ? 'md' : 'sm'}
			themeType={isModal ? 'primary' : 'linkUi'}
			className={styles.reopen_resolve}
			onClick={(e) => handleTicket(e, 'approve')}
		>
			Approve
		</Button>
	);
}

function RejectButton({ handleTicket, isModal }) {
	return (
		<Button
			size={isModal ? 'md' : 'sm'}
			themeType={isModal ? 'primary' : 'linkUi'}
			className={styles.reopen_resolve}
			onClick={(e) => handleTicket(e, 'reject')}
		>
			Reject
		</Button>
	);
}

function ReopenButton({ handleTicket, isModal }) {
	return (
		<Button
			size={isModal ? 'md' : 'sm'}
			themeType={isModal ? 'primary' : 'linkUi'}
			className={styles.reopen_resolve}
			onClick={(e) => handleTicket(e, 'reopen')}
		>
			Reopen
		</Button>
	);
}

function ButtonComponent({ isModal, status, isClosureAuthoriser, handleTicket }) {
	const commonProps = { handleTicket, isModal };

	if (['escalated', 'unresolved'].includes(status)) {
		if (isClosureAuthoriser) {
			return (<ResolveButton {...commonProps} />);
		}
		return <ResolveRequestButton {...commonProps} />;
	}

	if ((status === 'pending' && isClosureAuthoriser)) {
		return (
			<div className={styles.pending_actions}>
				<ApproveButton {...commonProps} />
				<RejectButton {...commonProps} />
			</div>
		);
	}

	if (status === 'closed') {
		return	(<ReopenButton {...commonProps} />);
	}

	return null;
}

function TicketActions({
	status,
	isModal,
	handleTicket,
	isClosureAuthorizer,
}) {
	return (
		<ButtonComponent
			isModal={isModal}
			status={status}
			handleTicket={handleTicket}
			isClosureAuthoriser={isClosureAuthorizer}
		/>
	);
}

export default TicketActions;
