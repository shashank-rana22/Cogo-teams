import { Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

// import RaiseTicket from './RaiseTicket';
import styles from './styles.module.css';
import TicketChat from './TicketChat';

const renderModalComponent = (props, type) => {
	switch (type) {
		// case 'raise_a_ticket':
		// 	return <RaiseTicket {...props} />;
		case 'ticket_details':
			return <TicketChat {...props} />;
		default:
			return null;
	}
};
function Modals(props) {
	const { modalData, setModalData } = props;

	const { type = '' } = modalData || {};

	return (
		<Modal
			size="sm"
			show={!isEmpty(modalData)}
			placement="right"
			scroll={false}
			showCloseIcon={type !== 'ticket_details'}
			onClose={() => setModalData(null)}
			className={styles.modal_container}
		>
			{renderModalComponent(props, type)}
		</Modal>
	);
}

export default Modals;
