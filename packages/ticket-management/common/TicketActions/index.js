import { Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function getActionMapping({ status, isClosureAuthorizer }) {
	if (['escalated', 'unresolved'].includes(status)) {
		if (isClosureAuthorizer) {
			return ['resolve'];
		}
		return ['resolve_request'];
	}

	if ((['pending', 'resolve_requested'].includes(status) && isClosureAuthorizer)) {
		return ['approve', 'reject'];
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
	const actionMappings = getActionMapping({ status, isClosureAuthorizer });

	return (
		<div className={styles.pending_actions}>
			{actionMappings.map((item) => (
				<div className={styles.pending_actions} key={`button_${item}_container`}>
					{(isModal && item !== 'reopen') && (
						<Button
							key="reassign_button"
							size="sm"
							themeType="secondary"
							className={styles.reopen_resolve}
							onClick={() => setShowReassign(true)}
						>
							Reassign
						</Button>
					)}

					<Button
						key={item}
						size="sm"
						themeType={isModal ? 'primary' : 'linkUi'}
						className={styles.reopen_resolve}
						onClick={(e) => handleTicket(e, { actionType: item })}
					>
						{startCase(item)}
					</Button>
				</div>
			))}
		</div>
	);
}

export default TicketActions;
