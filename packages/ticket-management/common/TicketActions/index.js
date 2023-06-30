import { Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function getActionMapping({ status, isClosureAuthorizer }) {
	if (['escalated', 'unresolved'].includes(status)) {
		if (isClosureAuthorizer) {
			return ['resolve'];
		}
		return ['resolve_requested'];
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
	isClosureAuthorizer,
}) {
	const actionMappings = getActionMapping({ status, isClosureAuthorizer });

	return (
		<>
			{actionMappings.map((item) => (
				<Button
					key={item}
					size={isModal ? 'md' : 'sm'}
					themeType={isModal ? 'primary' : 'linkUi'}
					className={styles.reopen_resolve}
					onClick={(e) => handleTicket(e, { actionType: item })}
				>
					{startCase(item)}
				</Button>
			))}
		</>
	);
}

export default TicketActions;
