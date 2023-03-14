import React, { useState } from 'react';
import SelectRate from './SelectRate';
import UploadBookingNote from './UploadBookingNote';
import UpdateDetails from './UpdateDetails';
import UpdateQuotation from './UpdateQuotation';
import useSelectRate from './useSelectRate';
import useEditQuote from './useEditQuote';
import useUpdateDetails from './useUpdateDetails';
import useUploadDocument from './useUploadDocument';
import formattRate from '../../../../helper/format-rates';

const BookingNote = ({
	shipment_data,
	task,
	services,
	refetch,
	onCancel,
	timeLineRefetch,
	selectedMail,
	refetchServices = () => {},
}) => {
	let intialStep = 0;
	if (task.tags && task.tags.length) {
		intialStep = Number(task.tags[0]) + 1;
	}

	const mailFileUrl = selectedMail?.formatted?.fileUrls || [];

	let jumpStep1 = false;

	if (mailFileUrl.length) {
		jumpStep1 = true;
	}

	const primary_service = (services || []).find(
		(serviceObj) => serviceObj.id === task.service_id,
	);

	const [step, setStep] = useState(intialStep);

	const [fileUrl, setFileUrl] = useState(mailFileUrl);

	const step1HookData = useSelectRate({
		services,
		shipment_type: shipment_data?.shipment_type,
		task,
	});

	const selectedRate = step1HookData.selectedCard || undefined;

	const formattedRate = formattRate(selectedRate, shipment_data);

	const editQuote = useEditQuote({
		shipmentData: shipment_data,
		task,
		services,
		refetch,
		onCancel,
		timeLineRefetch,
		refetchServices,
		formattedRate,
	});

	const updateDetailsData = useUpdateDetails({
		shipment_data,
		primary_service,
		fileUrl,
		task,
		step1HookData,
		setStep,
		item: step1HookData.selectedCard,
		timeLineRefetch,
		services,
		formattedRate,
	});

	const uploadBookingNoteData = useUploadDocument({ setFileUrl });

	return (
		<div>
			{step === 0 ? (
				<SelectRate
					selectedRate={selectedRate}
					step1HookData={step1HookData}
					setStep={setStep}
					setFileUrl={setFileUrl}
					jumpStep1={jumpStep1}
					services={services}
					source={shipment_data?.source}
				/>
			) : null}
			{step === 1 ? (
				<UploadBookingNote
					step1HookData={step1HookData}
					uploadDocumentHookData={uploadBookingNoteData}
					setStep={setStep}
				/>
			) : null}
			{step === 2 ? (
				<UpdateDetails
					updateDetailsData={updateDetailsData}
					fileUrl={fileUrl}
					setStep={setStep}
				/>
			) : null}
			{step === 3 ? (
				<UpdateQuotation
					editQuote={editQuote}
					onCancel={onCancel}
					timeLineRefetch={timeLineRefetch}
					shipmentData={shipment_data}
				/>
			) : null}
		</div>
	);
};

export default BookingNote;
