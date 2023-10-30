import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import { useRequestResolveControls } from '../../configurations/request-resolve-controls';
import { getFieldController } from '../../utils/getFieldController';
import Confirmation from '../Confirmation';

import styles from './styles.module.css';

function ResolveRequest({
	ticketId = '',
	updateLoading = false,
	showResolveRequest = false,
	updateTicketActivity = () => {},
	setShowResolveRequest = () => {},
}) {
	const { t } = useTranslation(['myTickets']);
	const [showConfirmation, setShowConfirmation] = useState(false);

	const { control, handleSubmit, formState: { errors }, reset } = useForm();

	const controls = useRequestResolveControls({ t });

	const handleClose = () => {
		setShowConfirmation(false);
		setShowResolveRequest(false);
		reset();
	};

	const handleRequestResolve = async (val) => {
		const { comment } = val || {};
		updateTicketActivity({
			actionType  : 'resolve_request',
			id          : ticketId,
			description : comment,
		});
		handleClose();
	};

	return (
		<Modal
			size="sm"
			show={showResolveRequest}
			onClose={handleClose}
		>
			<form onSubmit={handleSubmit(handleRequestResolve)}>
				<Modal.Header title={`${t('myTickets:request_resolution')} (#${ticketId})`} />

				<Modal.Body>
					<div>
						{controls.map((controlItem) => {
							const elementItem = { ...controlItem };
							const { name, label, controllerType } = elementItem || {};
							const Element = getFieldController(controllerType);

							if (!Element) {
								return null;
							}

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

									<div className={styles.error}>
										{errors?.[controlItem.name] && t('myTickets:required')}
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

export default ResolveRequest;
