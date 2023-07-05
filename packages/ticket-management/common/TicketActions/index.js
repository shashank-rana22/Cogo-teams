import { Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const OPEN_TICKETS_CHECK = ['escalated', 'unresolved'];
const OPEN_TICKETS_VALUES = ['resolve', 'reassign', 'escalate'];
const AUTHORISER_TICKETS_VALUES = ['resolve_request', 'reassign', 'escalate'];

const PENDING_TICKETS_CHECK = ['pending', 'resolve_requested'];
const PENDING_TICKETS_VALUES = ['approve', 'reject', 'reassign', 'escalate'];

const CLOSED_TICKETS_VALUES = ['reopen'];

const MODAL_ACTIONS = ['reassign', 'escalate'];

function getActionType({ status, isClosureAuthorizer }) {
	if (OPEN_TICKETS_CHECK.includes(status)) {
		if (isClosureAuthorizer) {
			return OPEN_TICKETS_VALUES;
		}
		return AUTHORISER_TICKETS_VALUES;
	}

	if ((PENDING_TICKETS_CHECK.includes(status) && isClosureAuthorizer)) {
		return PENDING_TICKETS_VALUES;
	}

	if (status === 'closed') {
		return	CLOSED_TICKETS_VALUES;
	}

	return [];
}

function TicketActions({
	status,
	isModal,
	handleTicket,
	setShowReassign = () => {},
	setShowEscalate = () => {},
	isClosureAuthorizer,
}) {
	const actionMappings = getActionType({ status, isClosureAuthorizer });

	const filteredActions = isModal ? actionMappings : actionMappings.filter((item) => !MODAL_ACTIONS.includes(item));

	const handleAction = (e, item) => {
		const HANDLE_ACTION_MAPPING = {
			reassign : { action: setShowReassign, props: true },
			escalate : { action: setShowEscalate, props: true },
		};

		const { action, props } = HANDLE_ACTION_MAPPING[item] || {};

		return action ? action(props) : handleTicket(e, { actionType: item });
	};

	return (
		<div className={styles.pending_actions}>
			{filteredActions.map((item) => (
				<Button
					key={item}
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
