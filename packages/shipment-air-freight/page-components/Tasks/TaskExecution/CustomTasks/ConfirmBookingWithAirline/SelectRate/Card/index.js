import { Button, Modal, Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase, isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useCreateEBooking from '../../hooks/useCreateEBooking';
import useSendBookingRequestEmail from '../../hooks/useSendBookingRequestEmail';
import useUpdateBookingPreference from '../../hooks/useUpdateBookingPreference';

import CancelledBookingModal from './CancelledBookingModal';
import EBookingStatus from './EBookingStatus';
import ListItem from './ListItem';
import PreviewEmail from './PreviewEmail';
import styles from './styles.module.css';

const CONFIRM_PREFERENCE_STEP = 2;
function Card({
	item = {},
	priority = 1,
	serviceProvidersData = [],
	step = 1,
	updateShipmentPendingTask = () => {},
	taskData = {},
	handleSubmit = () => {},
	onCancel = () => {},
	handOverDate = '',
	refetchList = () => {},
	setStep = () => {},
	primary_service = {},
	mainServiceData = {},
}) {
	const [showModal, setShowModal] = useState(false);
	const [showEmailPreview, setShowEmailPreview] = useState(false);
	const [checkboxValue, setCheckboxValue] = useState([]);
	const [showBookingStatus, setShowBookingStatus] = useState(false);

	const data = Array.isArray(item?.data) ? item?.data[GLOBAL_CONSTANTS.zeroth_index] : item?.data;

	let bookingMode = data?.repository_data?.booking_mode;

	if (data?.validity?.flight_uuid) {
		bookingMode = 'e_booking';
	}

	const { updateConfirmation, updateLoading } = useUpdateBookingPreference();
	const {
		emailData,
		loading,
		sendBookingRequestEmail,
	} = useSendBookingRequestEmail(onCancel, setShowEmailPreview, checkboxValue);

	const { createEBooking, loading:createBookingLoading } = useCreateEBooking({
		setShowBookingStatus,
		item,
		serviceProvidersData,
		mainServiceData,
	});

	const handleProceedWithEmail = async (show_preview_only, formValues) => {
		if (!show_preview_only && !formValues?.recipient_email) {
			Toast.error('Recipient email is required');
			return;
		}
		const pocData = (data?.repository_data?.pocs_data || []).find((val) => (
			val?.email === formValues?.recipient_email
		));
		await sendBookingRequestEmail(
			item,
			taskData,
			data,
			handOverDate,
			show_preview_only,
			serviceProvidersData,
			pocData,
		);
	};

	const handleOnClick = () => {
		(serviceProvidersData || []).forEach((itm) => {
			const value = itm;
			if (item?.priority === value?.priority) {
				value.booking_confirmation_status = 'booked';
				value.booking_source = bookingMode;
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

	const handleProceedWithEBooking = () => {
		createEBooking(handleOnClick, data?.validity);
	};

	const handleProceed = async () => {
		if (bookingMode === 'email') {
			handleProceedWithEmail(true);
			return;
		}
		if (bookingMode === 'e_booking') {
			handleProceedWithEBooking();
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

	return (
		<div className={styles.container}>
			{
				!isEmpty(emailData) && (
					<PreviewEmail
						emailData={emailData}
						show={showEmailPreview}
						loading={loading}
						onCloseModal={setShowEmailPreview}
						onConfirm={handleProceedWithEmail}
						data={data}
						checkboxValue={checkboxValue}
						setCheckboxValue={setCheckboxValue}
					/>
				)
			}
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
				{ bookingMode === 'e_booking' && (
					<div className={styles.ribbon_container}>
						<div className={styles.ribbon_pop}>E-Booking</div>
					</div>
				)}
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
				createBookingLoading={createBookingLoading}
				primary_service={primary_service}
			/>
			{showBookingStatus && (
				<EBookingStatus setShowBookingStatus={setShowBookingStatus} showBookingStatus={showBookingStatus} />
			)}
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
