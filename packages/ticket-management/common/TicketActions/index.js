import { Button, Popover, cl } from '@cogoport/components';
import { IcMCenterAlign } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const OPEN_TICKETS_CHECK = ['escalated', 'unresolved'];
const OPEN_TICKETS_VALUES = ['resolve', 'reassign', 'escalate'];
const AUTHORISER_TICKETS_VALUES = ['resolve_request', 'reassign', 'escalate'];

const PENDING_TICKETS_CHECK = ['pending', 'resolve_requested'];
const PENDING_TICKETS_VALUES = ['approve', 'reject', 'reassign', 'escalate'];

const CLOSED_TICKETS_VALUES = ['reopen'];

const MODAL_ACTIONS = ['reassign', 'escalate'];

function getActionType({ ticketStatus, isClosureAuthorizer }) {
	if (OPEN_TICKETS_CHECK.includes(ticketStatus)) {
		if (isClosureAuthorizer) {
			return OPEN_TICKETS_VALUES;
		}
		return AUTHORISER_TICKETS_VALUES;
	}

	if ((PENDING_TICKETS_CHECK.includes(ticketStatus) && isClosureAuthorizer)) {
		return PENDING_TICKETS_VALUES;
	}

	if (ticketStatus === 'closed') {
		return	CLOSED_TICKETS_VALUES;
	}

	return [];
}

function RenderContent({ filteredActions = [], isModal = false, handleAction = () => {}, isCurrentReviewer = false }) {
	return (
		<div className={cl`${isModal ? styles.modal_wrapper : styles.action_wrapper}`}>
			{filteredActions.map((item) => {
				if (!isCurrentReviewer && item === 'escalate') { return null; }

				return (
					<Button
						key={item}
						size="sm"
						themeType={isModal ? 'primary' : 'linkUi'}
						className={cl`${styles.action_button} ${isModal ? styles.modal_button : ''}`}
						onClick={(e) => handleAction(e, item)}
					>
						{startCase(item)}
					</Button>
				);
			})}
		</div>
	);
}

function TicketActions({
	ticketStatus = '',
	isModal = false,
	handleTicket = () => {},
	setShowReassign = () => {},
	setShowEscalate = () => {},
	isClosureAuthorizer = false,
	isCurrentReviewer = false,
}) {
	const actionMappings = getActionType({ ticketStatus, isClosureAuthorizer });

	const filteredActions = isModal ? actionMappings : actionMappings.filter((item) => !MODAL_ACTIONS.includes(item));

	const handleAction = (e, item) => {
		const HANDLE_ACTION_MAPPING = {
			reassign : { action: setShowReassign, args: true },
			escalate : { action: setShowEscalate, args: true },
		};

		const { action, args } = HANDLE_ACTION_MAPPING[item] || {};

		return action ? action(args) : handleTicket(e, { actionType: item });
	};

	if (isEmpty(filteredActions)) { return null; }

	return (
		<div className={styles.pending_actions}>
			{isModal ? (
				<Popover
					placement="bottom"
					caret={false}
					render={(
						<RenderContent
							isModal={isModal}
							handleAction={handleAction}
							filteredActions={filteredActions}
							isCurrentReviewer={isCurrentReviewer}
						/>
					)}
				>
					<div><IcMCenterAlign className={styles.hamburger} /></div>
				</Popover>
			)
				: (
					<RenderContent
						isModal={isModal}
						handleAction={handleAction}
						filteredActions={filteredActions}
						isCurrentReviewer={isCurrentReviewer}
					/>
				)}

		</div>
	);
}

export default TicketActions;
