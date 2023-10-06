import { Modal } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import styles from './styles.module.css';
import TicketChat from './TicketChat';

function Modals(props) {
	const { modalData, setModalData } = props;

	const { partnerId = '' } = useSelector(({ profile }) => ({
		partnerId: profile.partner.id,
	}));

	const [isInternal, setIsInternal] = useState(true);

	return (
		<Modal
			size="sm"
			show={!isEmpty(modalData)}
			placement="right"
			scroll={false}
			showCloseIcon={false}
			onClose={() => { setModalData(null); setIsInternal(true); }}
			className={styles.modal_container}
		>
			<TicketChat {...props} isInternal={isInternal} setIsInternal={setIsInternal} partnerId={partnerId} />
		</Modal>
	);
}

export default Modals;
