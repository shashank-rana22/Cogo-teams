import { Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';
import TicketChat from './TicketChat';

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
			<TicketChat {...props} />
		</Modal>
	);
}

export default Modals;
