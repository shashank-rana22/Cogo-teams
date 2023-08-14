import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useState } from 'react';

import useRaiseTicket from '../../../hooks/useRaiseTicket';

import RaiseTicketsForm from './RaiseTicketsForm';
import styles from './styles.module.css';

function RaiseTickets({ showRaiseTicket = false, setShowRaiseTicket = () => {}, setRefreshList = () => {} }) {
	const [additionalInfo, setAdditionalInfo] = useState([]);

	const formProps = useForm();
	const { handleSubmit, reset } = formProps;

	const handleClose = () => {
		reset();
		setShowRaiseTicket(false);
	};

	const { raiseTickets, loading } = useRaiseTicket({ handleClose, additionalInfo, setRefreshList });

	return (
		<Modal
			size="sm"
			placement="right"
			onClose={handleClose}
			show={showRaiseTicket}
			closeOnOuterClick={handleClose}
			className={styles.styled_ui_modal_dialog}
		>
			<form onSubmit={handleSubmit(raiseTickets)}>
				<Modal.Header title="Raise Ticket" style={{ padding: 8 }} />

				<Modal.Body>
					<RaiseTicketsForm
						{...formProps}
						additionalInfo={additionalInfo}
						setAdditionalInfo={setAdditionalInfo}
					/>
				</Modal.Body>

				<Modal.Footer style={{ padding: 12 }}>
					<Button size="md" type="submit" loading={loading}>
						Submit
					</Button>
				</Modal.Footer>
			</form>
		</Modal>
	);
}

export default RaiseTickets;
