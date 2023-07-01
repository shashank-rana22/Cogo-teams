import { Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function getActionType({ status, isClosureAuthorizer }) {
	if (['escalated', 'unresolved'].includes(status)) {
		if (isClosureAuthorizer) {
			return ['resolve', 'reassign'];
		}
		return ['resolve_request', 'reassign'];
	}

	if ((['pending', 'resolve_requested'].includes(status) && isClosureAuthorizer)) {
		return ['approve', 'reject', 'reassign'];
	}

	if (status === 'closed') {
		return	['reopen'];
	}

	return [];
}

function TicketActions({
	status,
	isModal,
	handleTicket,
	setShowReassign = () => {},
	isClosureAuthorizer,
}) {
	const actionMappings = getActionType({ status, isClosureAuthorizer });

	const filteredActions = isModal ? actionMappings : actionMappings.filter((item) => item !== 'reassign');

	const handleAction = (e, item) => {
		if (item === 'reassign') {
			setShowReassign(true);
		} else {
			handleTicket(e, { actionType: item });
		}
	};

	return (
		<div className={styles.pending_actions}>
			{filteredActions.map((item) => (
				<Button
					key={`${item}`}
					size="sm"
					themeType={isModal ? 'primary' : 'linkUi'}
					className={styles.reopen_resolve}
					onClick={(e) => handleAction(e, item)}
				>
					{startCase(item)}
				</Button>
			))}
		</div>
	);
}

export default TicketActions;
