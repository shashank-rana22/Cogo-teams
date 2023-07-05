import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React from 'react';

import { escalateTicketsControls } from '../../../../configurations/escalate-controls';
import { getFieldController } from '../../../../utils/getFieldController';

import styles from './styles.module.css';

function EscalateTicket({ ticketId, showEscalate, setShowEscalate, updateTicketActivity }) {
	const { control, handleSubmit, formState: { errors }, reset } = useForm();

	const handleClose = () => {
		setShowEscalate(false);
		reset();
	};

	const handleEscalateTicket = async (val) => {
		const { comment, file_url } = val || {};
		await updateTicketActivity({
			actionType  : 'escalate',
			id          : ticketId,
			file        : file_url?.finalUrl,
			description : comment,
		});
		handleClose();
	};

	return (
		<Modal
			size="sm"
			show={showEscalate}
			onClose={handleClose}
		>
			<form onSubmit={handleSubmit(handleEscalateTicket)}>
				<Modal.Header title={`Escalate Ticket (${ticketId})`} />

				<Modal.Body>
					<div>
						{escalateTicketsControls.map((controlItem) => {
							const elementItem = { ...controlItem };
							const { name, label, controllerType } = elementItem || {};
							const Element = getFieldController(controllerType);

							if (!Element) { return null; }

							return (
								<div
									key={controlItem.name}
									className={styles.field}
								>
									<div className={styles.label}>{label}</div>
									<Element
										{...elementItem}
										key={name}
										id={`${name}_input`}
										size="sm"
										control={control}
									/>
									<div className={styles.error}>{errors?.[controlItem.name] && 'Required'}</div>
								</div>
							);
						})}
					</div>
				</Modal.Body>

				<Modal.Footer>
					<Button size="md" type="submit">
						Submit
					</Button>
				</Modal.Footer>
			</form>
		</Modal>
	);
}

export default EscalateTicket;
