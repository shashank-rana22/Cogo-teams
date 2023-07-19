import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import useListDefaultTypes from '../../../hooks/useListDefaultTypes';
import useRaiseTicket from '../../../hooks/useRaiseTicket';

import RaiseTickets from './RaiseTickets';
import styles from './styles.module.css';

const getDefaultValues = ({ shipmentData = {}, ticketType = '' }) => ({
	issue_type      : ticketType,
	organization_id : shipmentData?.importer_exporter_id,
	priority        : 'medium',
	sid             : shipmentData?.shipment_id,
});

function TicketModal({ shipmentData = {}, setShowRaiseTicket = () => {} }) {
	const { ticketDefaultTypeData = {} } = useListDefaultTypes({ shipmentData });
	const {
		TicketType: ticketType,
		AdditionalInfo: additionalInfo = '',
	} = ticketDefaultTypeData[GLOBAL_CONSTANTS.zeroth_index] || {};

	const defaultFormValues = getDefaultValues({ shipmentData, ticketType });

	const { raiseTickets, loading } = useRaiseTicket({ setShowRaiseTicket, additionalInfo });

	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm({
		defaultValues: defaultFormValues,
	});

	const watchOrgId = watch('organization_id');

	return (
		<form onSubmit={handleSubmit(raiseTickets)}>
			<Modal.Header title="Raise Ticket" style={{ padding: 8 }} />

			<Modal.Body className={styles.preview_modal_body}>
				{ticketType && (
					<RaiseTickets
						errors={errors}
						control={control}
						additionalInfo={additionalInfo}
						shipmentData={shipmentData}
						watchOrgId={watchOrgId}
					/>
				)}
			</Modal.Body>

			<Modal.Footer style={{ padding: 12 }}>
				<Button size="md" type="submit" loading={loading}>
					Submit
				</Button>
			</Modal.Footer>
		</form>
	);
}

export default TicketModal;
