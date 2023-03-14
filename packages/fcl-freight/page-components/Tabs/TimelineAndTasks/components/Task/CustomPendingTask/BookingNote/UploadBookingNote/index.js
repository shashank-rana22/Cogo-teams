import React, { useState } from 'react';
import Button from '@cogoport/front/components/admin/Button';
import { Container, ButtonDiv, Remarks } from './styles';
import FormLayout from '../../../../../../commons/Layout';

const UploadBookingNote = ({ uploadDocumentHookData, setStep }) => {
	const { fields, controls, handleSubmit } = uploadDocumentHookData;
	const [errors, setErrors] = useState({});
	const handleNext = () => {
		setStep(2);
	};

	const onErrors = (err) => {
		setErrors(err);
	};
	return (
		<Container>
			<Remarks>You can Upload Multiple Booking Notes</Remarks>
			<FormLayout controls={controls} fields={fields} errors={errors} />
			<ButtonDiv>
				<Button
					className="primary text"
					onClick={() => {
						setStep(0);
					}}
				>
					Back
				</Button>
				<Button
					style={{ marginLeft: 10 }}
					onClick={handleSubmit(handleNext, onErrors)}
				>
					Next
				</Button>
			</ButtonDiv>
		</Container>
	);
};

export default UploadBookingNote;
