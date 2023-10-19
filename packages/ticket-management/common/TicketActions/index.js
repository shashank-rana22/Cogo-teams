import { Button, Popover, cl } from '@cogoport/components';
import { IcMCenterAlign } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import { getTicketActionLabel } from '../../constants';

import ActionConfirmation from './ActionConfirmation';
import styles from './styles.module.css';

const OPEN_TICKETS_VALUES = ['resolve', 'reassign', 'escalate'];
const AUTHORISER_TICKETS_VALUES = ['resolve_request', 'reassign', 'escalate'];

const PENDING_TICKETS_CHECK = ['pending', 'resolve_requested'];
const PENDING_TICKETS_VALUES = ['approve', 'reject', 'reassign', 'escalate'];

const CLOSED_TICKETS_VALUES = ['reopen'];
const TICKET_STATUS_REOPEN = ['closed', 'overdue'];
const MODAL_ACTIONS = ['reassign', 'escalate'];

function getActionType({ ticketStatus, isClosureAuthorizer }) {
	if (ticketStatus === 'unresolved') {
		if (isClosureAuthorizer) {
			return OPEN_TICKETS_VALUES;
		}
		return AUTHORISER_TICKETS_VALUES;
	}
	if (ticketStatus === 'escalated') {
		if (isClosureAuthorizer) {
			return OPEN_TICKETS_VALUES;
		}
		return MODAL_ACTIONS;
	}

	if ((PENDING_TICKETS_CHECK.includes(ticketStatus) && isClosureAuthorizer)) {
		return PENDING_TICKETS_VALUES;
	}

	if (TICKET_STATUS_REOPEN.includes(ticketStatus)) {
		return	CLOSED_TICKETS_VALUES;
	}

	return [];
}

function RenderContent({
	filteredActions = [], isModal = false, isCurrentReviewer = false, handleAction = () => {},
	updateLoading = false, actionLoading = '', setConfirmationConfig = () => {},
	layerAction = false,
}) {
	const { t } = useTranslation(['myTickets']);

	const handleConfirmation = ({ e, item }) => {
		if (isModal || layerAction) {
			handleAction(e, item);
		} else {
			setConfirmationConfig({ show: true, actionType: item });
		}
	};

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
						onClick={(e) => handleConfirmation({ e, item })}
						loading={updateLoading && actionLoading === item}
						disabled={updateLoading && actionLoading !== item}
					>
						{getTicketActionLabel({ t, type: item })}
					</Button>
				);
			})}
		</div>
	);
}

function TicketActions({
	id = '',
	ticketStatus = '',
	isModal = false,
	layerAction = false,
	updateLoading = false,
	handleTicket = () => {},
	setShowReassign = () => {},
	setShowEscalate = () => {},
	isClosureAuthorizer = false,
	isCurrentReviewer = false,
	setShowResolveRequest = () => {},
}) {
	const [actionLoading, setActionLoading] = useState('');
	const [confirmationConfig, setConfirmationConfig] = useState({ show: false, actionType: '' });
	const { show, actionType } = confirmationConfig || {};

	const actionMappings = getActionType({ ticketStatus, isClosureAuthorizer });
	const filteredActions = isModal ? actionMappings : actionMappings.filter((item) => !MODAL_ACTIONS.includes(item));

	const handleAction = (e, item) => {
		const HANDLE_ACTION_MAPPING = {
			reassign        : { action: setShowReassign, args: true },
			escalate        : { action: setShowEscalate, args: true },
			resolve_request : { action: setShowResolveRequest, args: true },
		};

		const { action, args } = HANDLE_ACTION_MAPPING[item] || {};

		return action ? action(args) : handleTicket(e, { actionType: item });
	};

	const onSubmit = async (e) => {
		setActionLoading(actionType);
		await handleAction(e, actionType);
		setConfirmationConfig({ show: false, actionType: '' });
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
							updateLoading={updateLoading}
							actionLoading={actionLoading}
							filteredActions={filteredActions}
							setActionLoading={setActionLoading}
							isCurrentReviewer={isCurrentReviewer}
							setConfirmationConfig={setConfirmationConfig}
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
						updateLoading={updateLoading}
						layerAction={layerAction}
						actionLoading={actionLoading}
						filteredActions={filteredActions}
						setActionLoading={setActionLoading}
						isCurrentReviewer={isCurrentReviewer}
						setConfirmationConfig={setConfirmationConfig}
					/>
				)}
			<ActionConfirmation
				id={id}
				show={show}
				onSubmit={onSubmit}
				actionType={actionType}
				setConfirmationConfig={setConfirmationConfig}
			/>
		</div>
	);
}

export default TicketActions;
