import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

import useRaiseTicketControls from '../../configurations/raise-ticket-controls';
import useCreateTicket from '../../hooks/useCreateTicket';
import { getFieldController } from '../../utils/getFieldController';
import HeaderName from '../HeaderName';
import ReceiveDiv from '../ReceiveDiv';

import styles from './styles.module.css';

function RaiseTicket({ setRaiseTicketModal = () => {}, raiseTicketModal = {}, refetchTickets = () => {}, orgId = '' }) {
	const {
		performedById,
	} = useSelector(({ profile }) => ({
		performedById: profile.user.id,
	}));

	const { data : { messageData = {}, formattedData = {} } = {}, source = null } = raiseTicketModal || {};

	const closeModal = () => {
		setRaiseTicketModal({ state: false, data: {} });
	};

	const {
		createTicket,
		loading = false,
	} = useCreateTicket({ closeModal, refetchTickets });

	const {
		control,
		handleSubmit,
		watch,
		formState : { errors = {} },
		setValue,
	} = useForm();

	const { ticket_type : watchTicketType = '' } = watch();

	const { controls = [], ticketDataKey = '' } = useRaiseTicketControls({
		watchTicketType,
		source,
	});

	const onCreateTicket = (val) => {
		const {
			response:{ message = '', media_url = '' } = {}, message_type = 'text',
			created_at = '',
		} = messageData;

		const { user_id = null, lead_user_id = null, organization_id: organizationId = '' } = formattedData || {};
		const { ticket_data = null, ticket_type = null, description = null, notify_customer = false } = val || {};
		const payload = {
			PerformedByID  : performedById,
			OrganizationID : organizationId || orgId || undefined,
			UserID         : user_id || lead_user_id,
			Source         : 'client',
			Type           : ticket_type,
			Description    : description,
			NotifyCustomer : notify_customer,
			Data           : {
				MessageData: {
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
				<div className={styles.styled_form}>
					{(controls || []).map((eachControl = {}) => {
						const { label = '', controlType = '', name = '' } = eachControl || {};

						const Element = getFieldController(controlType);

						if (!Element) return null;

						return (
							<div key={name} className={styles.styled_element}>
								<div className={styles.label}>{label}</div>
								<Element control={control} {...eachControl} />
								<div className={styles.error_text}>
									{errors?.[name] && (errors?.[name]?.message || 'This is Required')}
								</div>
							</div>
						);
					})}
				</div>
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
