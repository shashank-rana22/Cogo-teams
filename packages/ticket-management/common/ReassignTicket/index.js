import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useState, useEffect } from 'react';

import { useReassignTicketsControls } from '../../configurations/reassign-controls';
import { REQUIRED_ROLES } from '../../constants';
import useReassignTicket from '../../hooks/useReassignTicket';
import { getFieldController } from '../../utils/getFieldController';
import Confirmation from '../Confirmation';

import styles from './styles.module.css';

function ReassignTicket({
	ticketId = '', showReassign = true, setShowReassign = () => {}, getTicketActivity = () => {},
	getTicketDetails = () => {}, setListData = () => {},
}) {
	const [userData, setUserData] = useState({});
	const [showConfirmation, setShowConfirmation] = useState(false);

	const { control, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm();

	const watchType = watch('type');

	const controls = useReassignTicketsControls({ watchType, setUserData });

	const { reassignTicket, reassignLoading } = useReassignTicket({
		ticketId,
		getTicketActivity,
		getTicketDetails,
		setListData,
	});

	const handleClose = () => {
		setShowConfirmation(false);
		setShowReassign(false);
		reset();
	};

	const handleReassignTicket = async (val) => {
		await reassignTicket({ val, type: watchType, userData });
		handleClose();
	};

	useEffect(() => {
		setValue('assign_to', '');
	}, [watchType, setValue]);

	return (
		<Modal
			size="sm"
			show={showReassign}
			onClose={handleClose}
		>
			<form onSubmit={handleSubmit(handleReassignTicket)}>
				<Modal.Header title={`Re-Assign Ticket (${ticketId})`} />

				<Modal.Body>
					<div>
						{controls.map((controlItem) => {
							const elementItem = { ...controlItem };
							const { name, label, controllerType } = elementItem || {};
							const Element = getFieldController(controllerType);

							if (!Element || (name === 'assign_to' && !REQUIRED_ROLES.includes(watchType))) {
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
								loading={reassignLoading}
								handleChange={setShowConfirmation}
							/>
						) : (
							<Button size="md" onClick={() => setShowConfirmation(true)} loading={reassignLoading}>
								Submit
							</Button>
						)}
				</Modal.Footer>
			</form>
		</Modal>
	);
}

export default ReassignTicket;
