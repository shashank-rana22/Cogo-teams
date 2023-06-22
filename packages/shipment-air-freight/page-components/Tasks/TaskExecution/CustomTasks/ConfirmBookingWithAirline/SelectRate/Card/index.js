import { Button, Modal } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import useSendBookingRequestEmail from '../../hooks/useSendBookingRequestEmail';
import useUpdateBookingPreference from '../../hooks/useUpdateBookingPreference';

import CancelledBookingModal from './CancelledBookingModal';
import ListItem from './ListItem';
import PreviewEmail from './PreviewEmail';
import styles from './styles.module.css';

const CONFIRM_PREFERENCE_STEP = 2;
function Card({
	item = {},
	priority,
	serviceProvidersData,
	step = 1,
	updateShipmentPendingTask = () => {},
	taskData = {},
	handleSubmit = () => {},
	onCancel = () => {},
	handOverDate = '',
	refetchList = () => {},
	setStep = () => {},
}) {
	const [showModal, setShowModal] = useState(false);
	const [showEmailPreview, setShowEmailPreview] = useState(false);

	const data = Array.isArray(item?.data) ? item?.data[GLOBAL_CONSTANTS.zeroth_index] : item?.data;

	const bookingMode = data?.repository_data?.booking_mode;

	const { updateConfirmation, updateLoading } = useUpdateBookingPreference();
	const { emailData, loading, sendBookingRequestEmail } =	useSendBookingRequestEmail(onCancel, setShowEmailPreview);

	const handleProceedWithEmail = async (show_preview_only) => {
		await sendBookingRequestEmail(
			item,
			taskData,
			data,
			handOverDate,
			show_preview_only,
			serviceProvidersData,
		);
	};

	const handleProceed = async () => {
		if (bookingMode === 'email') {
			handleProceedWithEmail(true);
			return;
		}
		(serviceProvidersData || []).forEach((itm) => {
			const value = itm;
			if (item?.priority === value?.priority) {
				value.booking_confirmation_status = 'pending';
				value.is_email_sent = true;
			}
		});
		const payload = {
			id                : item?.preference_id,
			service_providers : serviceProvidersData,
		};
		await updateConfirmation({ payload });
		window.open(data?.repository_data?.lms_url, '_blank');
		onCancel();
	};

	const handleOnClick = () => {
		(serviceProvidersData || []).forEach((itm) => {
			const value = itm;
			if (item?.priority === value?.priority) {
				value.booking_confirmation_status = 'booked';
			}
		});
		const payload = {
			selected_priority : item?.priority,
			id                : item?.preference_id,
			service_providers : serviceProvidersData,
		};

		const value = {
			...taskData,
		};
		updateConfirmation({ payload, updateShipmentPendingTask, value });
	};

	return (
		<div className={styles.container}>
			<PreviewEmail
				emailData={emailData}
				show={showEmailPreview}
				loading={loading}
				onCloseModal={setShowEmailPreview}
				onConfirm={handleProceedWithEmail}
			/>

			<Modal
				show={showModal}
				onClose={() => setShowModal(false)}
				onOuterClick={() => setShowModal(false)}
				className="primary md"
			>
				<CancelledBookingModal
					updateConfirmation={updateConfirmation}
					item={item}
					serviceProvidersData={serviceProvidersData}
					refetchList={refetchList}
					shipment_id={taskData?.data?.shipment?.id}
					setStep={setStep}
				/>
			</Modal>
			<div className={styles.header}>
				<div className={styles.row}>
					<div className={styles.priority_text}>
						(
						{priority}
						{' '}
						Priority)
						{' '}
					</div>
					<div className={`${styles.priority_text} purple`}>
						{`${startCase(item.source)} Booking Note`}
					</div>
				</div>
			</div>
			<ListItem
				data={data}
				item={item}
				handleProceed={handleProceed}
				handleSubmit={handleSubmit}
				step={step}
				bookingMode={bookingMode}
			/>
			{step === CONFIRM_PREFERENCE_STEP && (
				<div className={styles.footer}>
					<div className={styles.priority_text}>Received Booking Confirmation ?</div>
					<div className={styles.button_head}>
						<Button
							className="secondary sm"
							onClick={handleOnClick}
							disabled={updateLoading}
						>
							Yes
						</Button>
					</div>
					<Button
						className="secondary sm"
						onClick={() => setShowModal(true)}
						disabled={updateLoading}
					>
						No
					</Button>
				</div>
			)}
		</div>
	);
}

export default Card;