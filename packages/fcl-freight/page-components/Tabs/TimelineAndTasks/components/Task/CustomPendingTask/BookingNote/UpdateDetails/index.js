import React from 'react';
import { FilePreview } from '@cogo/commons/components';
import { Button } from '@cogoport/front/components/admin';
import {
	Container,
	FileContainer,
	BodyContainer,
	ButtonWrap,
	DetailContainer,
	Heading,
	SubHeading,
	ButtonFlex,
	DocNumberDiv,
} from './styles';

import FormLayout from '../../../../../../commons/Layout';

const UpdateDetails = ({ updateDetailsData, fileUrl, setStep = () => {} }) => {
	const {
		setBookingNote,
		bookingNote,
		fields,
		errors,
		mainControl,
		movementDetailsControl,
		handleSubmit,
		onError,
		loading,
		handleFinalSubmit,
		docNumber,
	} = updateDetailsData;

	return (
		<Container>
			<ButtonWrap>
				{Array(fileUrl.length)
					.fill(0)
					.map((val, index) => {
						return (
							<Button
								style={{ marginRight: '10px' }}
								onClick={() => {
									setBookingNote(index);
								}}
								className={
									index === bookingNote ? 'secondary md' : 'primary md'
								}
							>
								Booking Note {index + 1}
							</Button>
						);
					})}
			</ButtonWrap>
			<BodyContainer>
				<FileContainer>
					<FilePreview url={fileUrl?.[bookingNote]?.url} />
				</FileContainer>
				<DetailContainer>
					<Heading>Review Details</Heading>
					<DocNumberDiv>
						<FormLayout fields={fields} controls={docNumber} errors={errors} />
					</DocNumberDiv>
					<SubHeading>Movement Details</SubHeading>
					<FormLayout
						fields={fields}
						controls={movementDetailsControl}
						errors={errors}
					/>
					<SubHeading>Other Details</SubHeading>
					<FormLayout fields={fields} controls={mainControl} errors={errors} />
					<ButtonFlex>
						<Button
							onClick={() => {
								setStep(1);
							}}
							disabled={loading}
						>
							Back
						</Button>
						<Button
							onClick={() => {
								handleSubmit(handleFinalSubmit, onError)();
							}}
							disabled={loading}
							style={{ marginLeft: '5px' }}
						>
							Submit
						</Button>
					</ButtonFlex>
				</DetailContainer>
			</BodyContainer>
		</Container>
	);
};

export default UpdateDetails;
