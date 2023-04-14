import { Modal, Button } from '@cogoport/components';
import { ChipsController, TextAreaController, InputController, useForm } from '@cogoport/forms';

import raiseTicketControls from '../../../../configurations/raise-ticket-controls';
import HeaderName from '../HeaderName';
import ReceiveDiv from '../Messages/MessageConversations/ReceiveDiv';

import styles from './styles.module.css';

const CONTROLLER_MAPPING = {
	input    : InputController,
	chips    : ChipsController,
	textarea : TextAreaController,
};
function RaiseTicket({ setOpenTicketModal = () => {}, formattedData = {}, openTicketModal = {} }) {
	const { data = {} } = openTicketModal || {};
	const {
		control,
		handleSubmit,
		formState:{ errors = {} },
	} = useForm();

	const closeModal = () => {
		setOpenTicketModal({ state: false, data: {} });
	};

	const onCreateTicket = (val) => {
		console.log('val:', val);
	};
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
				<div className={styles.name_div}>
					<HeaderName formattedData={formattedData} />
				</div>
				<div className={styles.message_content}>
					<ReceiveDiv canRaiseTicket={false} eachMessage={data} />
				</div>
				<div className={styles.styled_form}>
					{raiseTicketControls.map((eachControl = {}) => {
						const { label = '', type = '', name = '' } = eachControl || {};
						const Element = CONTROLLER_MAPPING[type] || null;
						return (Element && (
							<div className={styles.styled_element}>
								<div className={styles.label}>{label}</div>
								<Element control={control} {...eachControl} />
								<div className={styles.error_text}>
									{errors?.[name] && (errors?.[name]?.message || 'This is Required')}
								</div>
							</div>
						));
					})}
				</div>
			</Modal.Body>
			<Modal.Footer className={styles.footer_buttons}>
				<Button size="md" themeType="tertiary" onClick={closeModal}>cancel</Button>
				<Button
					className={styles.button_styles}
					size="md"
					themeType="accent"
					onClick={handleSubmit(onCreateTicket)}
				>
					Submit Ticket
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
export default RaiseTicket;
