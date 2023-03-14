import { useState } from 'react';
import UploadDocument from './Step1/index.js';
import UpdateDetails from './Step2/index.js';

const AmendBookingNote = ({
	task,
	shipment_data,
	primary_service,
	onCancel = () => {},
}) => {
	const [currentStep, setCurrentStep] = useState('upload_document');
	const [fileUrl, setFileUrl] = useState(null);

	const ComponentToRender = {
		upload_document: (
			<UploadDocument
				setCurrentStep={setCurrentStep}
				setFileUrl={setFileUrl}
				shipment_data={shipment_data}
				task={task}
			/>
		),
		update_details: (
			<UpdateDetails
				fileUrl={fileUrl}
				task={task}
				shipment_data={shipment_data}
				primary_service={primary_service}
				onClose={onCancel}
				currentStep={currentStep}
			/>
		),
	};

	return <div>{ComponentToRender[currentStep]}</div>;
};

export default AmendBookingNote;
