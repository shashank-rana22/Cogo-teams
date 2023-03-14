import React, { useState } from 'react';
import { Modal, Tag } from '@cogoport/front/components/admin';
import { useSelector } from '@cogo/store';
import UnableToDoTask from '../UnableToDoTask';
import ShowEmail from './ShowEmailContent';
import TaskDetails from './TaskDetails';
import UpdateActions from './UpdateActions';
import UploadButton from './UploadButton';
import UpdateAssignedStakeholder from '../UpdateAssignedStakeholder';
import styles from './styles.module.css';

const disabledTaskButton = [
	'knockoff_invoices',
	'update_collection_details',
	'mark_bl_released',
	'mark_bl_delivered',
	'mark_bl_surrendered',
	'mark_do_released',
];

function Card({
	task = {},
	handleClick = () => {},
	show = false,
	index = null,
	firstPendingTaskIndex = null,
	refetch = () => {},
	selectedTaskId = '',
	services = [],
	shipment_data = {},
	primary_service = {},
}) {
	const isMobile = useSelector((state) => (state.general || {}).isMobile);
	const [showUnableTo, setShowUnableTo] = useState(false);
	const [showAdmin, setShowAdmin] = useState(false);
	const [taskId, setTaskId] = useState('');
	const [showTemp, setShowTemp] = useState(false);

	const handleEmail = () => {
		setTaskId(task?.id);
		setShowTemp(true);
	};

	let buttonText = 'Update';
	if (task?.task_type?.includes('approve_quote')) {
		buttonText = 'Approve Quote';
	}
	if (task?.task_type?.includes('amend_quote')) {
		buttonText = 'Amend Quote';
	}
	if (task?.task_type === 'upload_document') {
		buttonText = 'Upload';
	}
	if (task?.task_type === 'approve_document') {
		buttonText = 'Review';
	}

	const className = index === firstPendingTaskIndex ? 'active' : '';

	const requiredServiceArr = [];
	(task.task_field_ids || []).forEach((id) => {
		(services || []).forEach((serviceObj) => {
			if (serviceObj.id === id) {
				requiredServiceArr.push(serviceObj);
			}
		});
	});

	let isMainServiceCancelled = false;
	(services || []).forEach((service) => {
		if (
			(service?.service_type || '').split('_service')[0] ===
			shipment_data.shipment_type
		) {
			if (service.state === 'cancelled') {
				isMainServiceCancelled = true;
			}
		}
	});

	let disableTaskButton = disabledTaskButton.includes(task?.task || '');
	if (
		shipment_data?.source === 'consol' &&
		task?.task === 'request_booking_note'
	) {
		disableTaskButton = true;
	}

	const handleChange = (newMails) => {
		handleClick(task, newMails);
	};

	let isHoldApproved = false;
	if (
		['ftl_freight', 'ltl_freight'].includes(shipment_data?.shipment_type) &&
		[
			'hold',
			'hold_by_so2',
			'release_requested',
			'release_rejected',
			'release_rejected_by_so2',
		].includes(shipment_data?.goods_control_status)
	) {
		isHoldApproved = true;
	}

	return (
		<div className={styles.container} >
			<div className={styles.row} id={task.task}>
				<TaskDetails
					task={task}
					services={services}
					shipment_data={shipment_data}
					primary_service={primary_service}
					selectedTaskId={selectedTaskId}
				/>

				<div className={styles.button_container}>
					{task.status !== 'completed' &&
					!selectedTaskId?.length &&
					!isHoldApproved ? (
						<UploadButton
							handleClick={handleClick}
							task={task}
							shipment_type={shipment_data.shipment_type}
							handleChange={handleChange}
							isMainServiceCancelled={
								isMainServiceCancelled || disableTaskButton
							}
							buttonText={buttonText}
							show={show}
						/>
					) : null}

					{isHoldApproved && task.status !== 'completed' && (
						<Tag className="sm primary">Shipment on hold</Tag>
					)}

					{task?.status === 'completed' &&
					task?.assigned_stakeholder === 'system' ? (
						<button classname={styles.view_content} onClick={handleEmail}>View</button>
					) : null}
				</div>

				<UpdateActions
					task={task}
					services={services}
					setShowUnableTo={setShowUnableTo}
					isMainServiceCancelled={isMainServiceCancelled || disableTaskButton}
					setShowAdmin={setShowAdmin}
				/>
			</div>

			{showTemp ? (
				<ShowEmail
					setTaskId={setTaskId}
					setShowTemp={setShowTemp}
					showTemp={showTemp}
					taskId={taskId}
				/>
			) : null}

			{showUnableTo ? (
				<Modal
					className="primary sm"
					show={showUnableTo}
					onClose={() => setShowUnableTo(false)}
					styles={{ dialog: { width: isMobile ? 360 : 700 } }}
				>
					<UnableToDoTask
						setOpen={setShowUnableTo}
						refetch={refetch}
						task={task}
					/>
				</Modal>
			) : null}

			<UpdateAssignedStakeholder
				setOpen={setShowAdmin}
				open={showAdmin}
				refetch={refetch}
				task={task}
			/>
		</div>
	);
}

export default Card;
