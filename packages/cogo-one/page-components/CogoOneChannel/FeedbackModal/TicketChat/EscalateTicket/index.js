import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import { escalateTicketsControls } from '../../../../../configurations/escalate-controls';
import { getFieldController } from '../../../../../helpers/getFieldController';

import Confirmation from './Confirmation';
import styles from './styles.module.css';

function EscalateTicket({
	ticketId = '', showEscalate = false, setShowEscalate = () => {},
	updateTicketActivity = () => {}, updateLoading = false,
}) {
	const { t } = useTranslation(['myTickets']);

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
				<Modal.Header title={`${t('myTickets:escalate_ticket')} (${ticketId})`} />

				<Modal.Body>
					<div>
						{escalateTicketsControls({ t }).map((controlItem) => {
							const { name, label, controllerType } = controlItem || {};
							const Element = getFieldController(controllerType);

							if (!Element) { return null; }

							return (
								<div
									key={name}
									className={styles.field}
								>
									<div className={styles.label}>{label}</div>
									<Element
										{...controlItem}
										key={name}
										id={`${name}_input`}
										size="sm"
										control={control}
									/>
									<div className={styles.error}>
										{errors?.[name] && t('myTickets:required')}
									</div>
								</div>
							);
						})}
					</div>
				</Modal.Body>

				<Modal.Footer>
					{showConfirmation
						? (
							<Confirmation
								t={t}
								loading={updateLoading}
								handleChange={setShowConfirmation}
							/>
						) : (
							<Button size="md" onClick={() => setShowConfirmation(true)} loading={updateLoading}>
								{t('myTickets:submit')}
							</Button>
						)}
				</Modal.Footer>
			</form>
		</Modal>
	);
}

export default EscalateTicket;
