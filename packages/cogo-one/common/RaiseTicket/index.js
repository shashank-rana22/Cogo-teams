import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { upperCase } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import useRaiseTicketControls from '../../configurations/raise-ticket-controls';
import useCreateTicket from '../../hooks/useCreateTicket';
import useListDefaultTypes from '../../hooks/useListDefaultTypes';
import HeaderName from '../HeaderName';
import ReceiveDiv from '../ReceiveDiv';

import RenderForm from './renderForm';
import styles from './styles.module.css';

function RaiseTicket({
	setRaiseTicketModal = () => {},
	raiseTicketModal = {},
	refetchTickets = () => {},
}) {
	const [additionalInfo, setAdditionalInfo] = useState([]);

	const { data:{ messageData = {}, formattedData = {} } = {}, source = null } = raiseTicketModal || {};
	const { shipment_id : shipmentId = '' } = formattedData || {};

	const closeModal = () => {
		setRaiseTicketModal({ state: false, data: {} });
	};

	const { data = {} } = useListDefaultTypes({ raiseTicketModal });
	const { TicketType: ticketType = '' } = data[GLOBAL_CONSTANTS.zeroth_index] || {};

	const {
		createTicket,
		loading = false,
	} = useCreateTicket({ closeModal, refetchTickets });
	const {
		control,
		handleSubmit,
		watch,
		formState:{ errors = {} },
		setValue,
	} = useForm();

	const { ticket_type: watchTicketType = '' } = watch();

	const additionalControls = (additionalInfo || []).map((item) => ({
		label        : upperCase(item),
		name         : item,
		controlType  : 'input',
		placeholder  : `Add ${item}`,
		size         : 'md',
		showOptional : false,
	}));

	const { controls = [], ticketDataKey = '' } = useRaiseTicketControls({
		watchTicketType,
		source,
		ticketType,
		setAdditionalInfo,
	});

	const newControls = controls.concat(additionalControls);

	const onCreateTicket = (val) => {
		const {
			response: { message = '', media_url = '' } = {}, message_type = 'text',
			created_at = '',
		} = messageData;

		const { user_id = null, lead_user_id = null } = formattedData || {};
		const { ticket_data = null, ticket_type = null, description = null, sid } = val || {};
		const payload = {
			UserID      : user_id || lead_user_id,
			Source      : 'client',
			Type        : ticket_type,
			Description : description,
			Data        : {
				sid         : sid || undefined,
				MessageData : {
					Message     : message,
					MediaUrl    : media_url,
					MessageType : message_type,
					CreatedAt   : created_at,
				},
				[ticketDataKey || 'AdditionalData']: ticket_data || undefined,
			},
		};
		createTicket(payload);
	};

	useEffect(() => {
		setValue('ticket_data', '');
	}, [watchTicketType, setValue]);

	useEffect(() => {
		setValue('ticket_type', ticketType);
		setValue('sid', shipmentId);
	}, [setValue, ticketType, shipmentId]);

	return (
		<Modal
			show
			size="sm"
			scroll={false}
			onClose={closeModal}
		>
			<Modal.Header
				title={(<div className={styles.header}>Raise a ticket</div>)}
				className={styles.header_styles}
			/>
			<Modal.Body className={styles.body_styled}>
				{source === 'message' && (
					<>
						<div className={styles.name_div}>
							<HeaderName formattedData={formattedData} />
						</div>
						<div className={styles.message_content}>
							<ReceiveDiv canRaiseTicket={false} eachMessage={messageData} />
						</div>
					</>
				)}
				<RenderForm control={control} errors={errors} controls={newControls} />
			</Modal.Body>
			<Modal.Footer className={styles.footer_buttons}>
				<Button size="md" themeType="tertiary" onClick={closeModal}>cancel</Button>
				<Button
					className={styles.button_styles}
					size="md"
					themeType="accent"
					loading={loading}
					onClick={handleSubmit(onCreateTicket)}
				>
					Submit Ticket
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
export default RaiseTicket;
