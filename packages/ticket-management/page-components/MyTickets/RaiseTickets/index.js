import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import useRaiseTicket from '../../../hooks/useRaiseTicket';

import RaiseTicketsForm from './RaiseTicketsForm';
import styles from './styles.module.css';

function RaiseTickets({ showRaiseTicket = false, setShowRaiseTicket = () => {}, setRefreshList = () => {} }) {
	const { t } = useTranslation(['myTickets']);

	const [additionalInfo, setAdditionalInfo] = useState([]);
	const [defaultTypeId, setDefaultTypeId] = useState('');

	const formProps = useForm({
		defaultValues: {
			request_type : 'shipment',
			priority     : 'medium',
		},
	});

	const { handleSubmit, reset } = formProps;

	const handleClose = () => {
		reset();
		setShowRaiseTicket(false);
	};

	const { raiseTickets, loading } = useRaiseTicket({
		handleClose,
		defaultTypeId,
		additionalInfo,
		setRefreshList,
		reset,
	});

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
				<Modal.Header title={t('myTickets:raise_ticket')} style={{ padding: 8 }} />

				<Modal.Body>
					<RaiseTicketsForm
						{...formProps}
						setDefaultTypeId={setDefaultTypeId}
						additionalInfo={additionalInfo}
						setAdditionalInfo={setAdditionalInfo}
					/>
				</Modal.Body>

				<Modal.Footer style={{ padding: 12 }}>
					<Button size="md" type="submit" loading={loading}>
						{t('myTickets:submit')}
					</Button>
				</Modal.Footer>
			</form>
		</Modal>
	);
}

export default RaiseTickets;
