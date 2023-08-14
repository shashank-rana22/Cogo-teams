import { Modal, Button, Pill } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import useRaiseTicket from '../../../hooks/useRaiseTicket';

import RaiseTickets from './RaiseTickets';
import styles from './styles.module.css';

function Header({ service = '', trade_type = '' }) {
	return (
		<div className={styles.header}>
			<span className={styles.label}>Raise Ticket</span>
			<Pill size="md" color="blue">{startCase(service)}</Pill>
			<Pill size="md" color="green">{startCase(trade_type)}</Pill>
		</div>
	);
}

const getDefaultValues = ({ shipmentData = {} }) => ({
	organization_id : shipmentData?.importer_exporter_id,
	priority        : 'medium',
	sid             : shipmentData?.shipment_id,
});

function TicketModal({ shipmentData = {}, setShowRaiseTicket = () => {} }) {
	const [additionalInfo, setAdditionalInfo] = useState([]);
	const defaultFormValues = getDefaultValues({ shipmentData });

	const {
		control,
		handleSubmit,
		formState: { errors },
		resetField,
		watch,
	} = useForm({
		defaultValues: defaultFormValues,
	});

	const { raiseTickets = () => {}, loading = false } = useRaiseTicket({ setShowRaiseTicket, additionalInfo });

	return (
		<form onSubmit={handleSubmit(raiseTickets)}>
			<Modal.Header title={<Header {...shipmentData} />} className={styles.modal_header} />

			<Modal.Body className={styles.preview_modal_body}>
				<RaiseTickets
					watch={watch}
					errors={errors}
					control={control}
					resetField={resetField}
					shipmentData={shipmentData}
					setAdditionalInfo={setAdditionalInfo}
				/>
			</Modal.Body>

			<Modal.Footer className={styles.modal_footer}>
				<Button size="md" type="submit" loading={loading}>
					Submit
				</Button>
			</Modal.Footer>
		</form>
	);
}

export default TicketModal;
