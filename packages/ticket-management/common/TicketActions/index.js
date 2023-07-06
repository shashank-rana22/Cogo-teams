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

function RenderContent({ filteredActions, isModal, handleAction, IsCurrentReviewer }) {
	return (
		<div className={cl`${isModal ? styles.modal_wrapper : styles.action_wrapper}`}>
			{filteredActions.map((item) => {
				if (!IsCurrentReviewer && item === 'escalate') { return null; }

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
	status,
	isModal,
	handleTicket,
	setShowReassign = () => {},
	setShowEscalate = () => {},
	isClosureAuthorizer,
	IsCurrentReviewer,
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

	const buttonComponent = (
		<RenderContent
			isModal={isModal}
			handleAction={handleAction}
			filteredActions={filteredActions}
			IsCurrentReviewer={IsCurrentReviewer}
		/>
	);

	if (isEmpty(filteredActions)) { return null; }

	return (
		<div className={styles.pending_actions}>
			{isModal ? (
				<Popover
					placement="bottom"
					caret={false}
					render={buttonComponent}
				>
					<div><IcMCenterAlign className={styles.hamburger} /></div>
				</Popover>
			)
				: buttonComponent}

		</div>
	);
}

export default TicketActions;
