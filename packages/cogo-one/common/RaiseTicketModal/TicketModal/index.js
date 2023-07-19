import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { useEffect } from 'react';

import useListDefaultTypes from '../../../hooks/useListDefaultTypes';
import useRaiseTicket from '../../../hooks/useRaiseTicket';

import RaiseTickets from './RaiseTickets';
import styles from './styles.module.css';

const getDefaultValues = ({ shipmentData = {} }) => ({
	organization_id : shipmentData?.importer_exporter_id,
	priority        : 'medium',
	sid             : shipmentData?.shipment_id,
});

function TicketModal({ shipmentData = {}, setShowRaiseTicket = () => {} }) {
	const { ticketDefaultTypeData = {} } = useListDefaultTypes({ shipmentData });
	const {
		TicketType: ticketType = '',
		AdditionalInfo: additionalInfo = '',
	} = ticketDefaultTypeData[GLOBAL_CONSTANTS.zeroth_index] || {};

	const defaultFormValues = getDefaultValues({ shipmentData });

	const { raiseTickets = () => {}, loading = false } = useRaiseTicket({ setShowRaiseTicket, additionalInfo });

	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
		setValue = () => {},
	} = useForm({
		defaultValues: defaultFormValues,
	});
	const watchOrgId = watch('organization_id');

	useEffect(() => {
		setValue('issue_type', ticketType);
	}, [setValue, ticketType]);

	return (
		<form onSubmit={handleSubmit(raiseTickets)}>
			<Modal.Header title="Raise Ticket" className={styles.modal_header} />

			<Modal.Body className={styles.preview_modal_body}>
				<RaiseTickets
					errors={errors}
					control={control}
					additionalInfo={additionalInfo}
					shipmentData={shipmentData}
					watchOrgId={watchOrgId}
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
