import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';

import { useReassignTicketsControls } from '../../configurations/reassign-controls';
import { REQUIRED_ROLES } from '../../constants';
import useListShipmentStakeholders from '../../hooks/useGetListShipmentStakeholders';
import useReassignTicket from '../../hooks/useReassignTicket';
import { getFieldController } from '../../utils/getFieldController';
import Confirmation from '../Confirmation';

import styles from './styles.module.css';

function ReassignTicket({
	ticketId = '', showReassign = true, setShowReassign = () => {}, getTicketActivity = () => {},
	getTicketDetails = () => {}, setListData = () => {}, ticket = {},
}) {
	const { Data: data = {} } = ticket || {};
	const { RequestType: requestType = '' } = data || {};

	const { t } = useTranslation(['myTickets']);

	const [userData, setUserData] = useState({});
	const [showConfirmation, setShowConfirmation] = useState(false);

	const { control, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm();

	const { stakeHoldersData = [] } = useListShipmentStakeholders({ requestType });

	const watchType = watch('type');

	const controls = useReassignTicketsControls({ t, watchType, setUserData, stakeHoldersData, requestType });

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
				<Modal.Header title={`${t('myTickets:re_assign_ticket')} (${ticketId})`} />

				<Modal.Body>
					<div>
						{controls.map((controlItem) => {
							const elementItem = { ...controlItem };
							const { name, label, controllerType } = elementItem || {};
							const Element = getFieldController(controllerType);
							const hideAssignField = name === 'assign_to' && watchType === 'stakeholders';
							const hidestakeholderField = name === 'stakeholder' && watchType !== 'stakeholders';

							if (!Element || (name === 'assign_to' && !REQUIRED_ROLES.includes(watchType))
								|| hideAssignField || hidestakeholderField) {
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
								loading={reassignLoading}
								handleChange={setShowConfirmation}
							/>
						) : (
							<Button size="md" onClick={() => setShowConfirmation(true)} loading={reassignLoading}>
								{t('myTickets:submit')}
							</Button>
						)}
				</Modal.Footer>
			</form>
		</Modal>
	);
}

export default ReassignTicket;
