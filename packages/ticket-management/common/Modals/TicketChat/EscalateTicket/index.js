import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useState } from 'react';

import { escalateTicketsControls } from '../../../../configurations/escalate-controls';
import { getFieldController } from '../../../../utils/getFieldController';
import Confirmation from '../../../Confirmation';

import styles from './styles.module.css';

function EscalateTicket({
	ticketId = '', showEscalate = false, setShowEscalate = () => {},
	updateTicketActivity = () => {}, updateLoading = false,
}) {
	const [showConfirmation, setShowConfirmation] = useState(false);

	const { control, handleSubmit, formState: { errors }, reset } = useForm();

	const handleClose = () => {
		setShowConfirmation(false);
		setShowEscalate(false);
		reset();
	};

	const handleEscalateTicket = async (val) => {
		const { comment } = val || {};
		await updateTicketActivity({
			actionType  : 'escalate',
			id          : ticketId,
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
					{showConfirmation
						? (
							<Confirmation
								loading={updateLoading}
								handleChange={setShowConfirmation}
							/>
						) : (
							<Button size="md" onClick={() => setShowConfirmation(true)} loading={updateLoading}>
								Submit
							</Button>
						)}
				</Modal.Footer>
			</form>
		</Modal>
	);
}

export default EscalateTicket;
