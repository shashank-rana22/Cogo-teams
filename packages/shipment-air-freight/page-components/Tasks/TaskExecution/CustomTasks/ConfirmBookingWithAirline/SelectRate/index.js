import EmptyState from '@cogoport/air-modules/common/EmptyState';
import Layout from '@cogoport/air-modules/components/Layout';
import { Button, Modal, Placeholder } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import useListBookingPreferences
	from '../../../../../../hooks/useListBookingPreferences';
import controls from '../configs/task-controls';
import useUpdateShipmentPendingTask from '../hooks/useUpdateShipmentPendingTask';

import Card from './Card';
import ConfirmModal from './ConfirmModal';
import styles from './styles.module.css';

const SHOW_CONTENT = 'Please Revert Rate First';
const NUMBER_OF_SKELETON = 6;
const LIST_PREFERENCE_RATE_STEP = 1;
const CONFIRM_PREFERENCE_STEP = 2;
function SelectRate({
	task = {},
	onCancel = () => {},
	refetch = () => {},
	shipmentData = {},
}) {
	const [step, setStep] = useState(LIST_PREFERENCE_RATE_STEP);
	const [selectedCard, setSelectedCard] = useState(null);

	const [showConfirmModal, setShowConfirmModal] = useState(false);

	const mainServiceData = (shipmentData?.all_services || []).find((service) => (
		service?.service_type === 'air_freight_service'
	));

	const {
		control,
		formState: { errors },
		handleSubmit,
		watch,
	} = useForm({ controls });

	const handOverDate = formatDate({
		date       : watch('date_range'),
		dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
		formatType : 'date',
	});

	const taskData = {
		data : { shipment: { id: shipmentData?.id } },
		id   : task?.id,
	};

	const { data, loading, getList } = useListBookingPreferences({
		shipment_id    : task.shipment_id,
		defaultFilters : { service_type: task.service_type },
	});
	const { updateLoading, updateShipmentPendingTask } = useUpdateShipmentPendingTask({
		onCancel,
		refetch,
	});

	const list = data?.list || [];

	const selected_priority = (list || []).find(
		(item) => item?.booking_confirmation_status === 'pending' && item?.is_email_sent,
	);

	const SERVICE_PROVIDERS_DATA = [];
	(list || []).forEach((itm) => {
		const {
			booking_confirmation_status,
			priority: ratePriority,
			id,
			rate_id,
			booking_not_placed_reason,
		} = itm;

		const serviceProvider = {
			booking_confirmation_status,
			priority: ratePriority,
			id,
			rate_id,
			booking_not_placed_reason,
		};
		SERVICE_PROVIDERS_DATA.push(serviceProvider);
	});

	const handleBypassClick = () => {
		const payload = {
			...taskData,
		};
		updateShipmentPendingTask(payload);
	};

	useEffect(() => {
		if (selected_priority) {
			setSelectedCard(selected_priority);
			setStep(CONFIRM_PREFERENCE_STEP);
		}
	}, [selected_priority]);

	return (
		<div className={styles.container}>
			{!loading && isEmpty(list) && (
				<EmptyState emptyText={SHOW_CONTENT} />
			)}
			{!isEmpty(list) && (
				(
					step === CONFIRM_PREFERENCE_STEP ? (
						<Card
							item={selectedCard}
							priority={selectedCard?.priority}
							step={step}
							updateShipmentPendingTask={updateShipmentPendingTask}
							taskData={taskData}
							handOverDate={handOverDate}
							onCancel={onCancel}
							serviceProvidersData={SERVICE_PROVIDERS_DATA}
							refetchList={getList}
							setStep={setStep}
							mainServiceData={mainServiceData}
						/>
					) : (
						<>
							<div>
								{loading ? (
									<div className={styles.skeleton_wrap}>
										{Array.from(Array(NUMBER_OF_SKELETON).keys()).map((index) => (
											<Placeholder
												key={index}
												width="100%"
												height="20px"
												style={{ marginBottom: '10px' }}
											/>
										))}
									</div>
								) : (
									<>
										<Layout
											fields={controls}
											errors={errors}
											control={control}
										/>
										{(list || []).map((item) => (
											<Card
												key={item?.id}
												item={item}
												priority={item?.priority}
												taskData={taskData}
												handleSubmit={handleSubmit}
												handOverDate={handOverDate}
												onCancel={onCancel}
												serviceProvidersData={SERVICE_PROVIDERS_DATA}
												refetchList={getList}
												setStep={setStep}
												mainServiceData={mainServiceData}
											/>
										))}
									</>
								)}
							</div>
							<Button
								className="primary md"
								onClick={() => setShowConfirmModal(true)}
								disabled={updateLoading || loading}
							>
								Bypass Process
							</Button>
						</>
					)

				)
			)}

			<Modal
				show={showConfirmModal}
				onClose={() => setShowConfirmModal(false)}
				onOuterClick={() => setShowConfirmModal(false)}
				className="primary md"
			>
				<ConfirmModal
					setShowConfirmModal={setShowConfirmModal}
					handleBypassClick={handleBypassClick}
					updateLoading={updateLoading}
				/>
			</Modal>
		</div>
	);
}

export default SelectRate;
