import React from 'react';
import { useFormCogo } from '@cogoport/front/hooks';
import { Button } from '@cogoport/front/components/admin';
import FormLayout from '../../../../../../../commons/Layout';
import { controls } from '../../Controls/updateServiceProviderControls';
import { ButtonWrapper, TrailerDetailWrapper } from '../styles';

const TrailerDetails = (props) => {
	const {
		allTrailerDetails,
		setAllTrailerDetails,
		trailer_type,
		serviceProviderData,
	} = props;

	const { service_provider_id, line_items } = serviceProviderData;

	const { fields, formState, handleSubmit, watch } = useFormCogo(controls);

	const formValues = watch();

	const { errors } = formState;

	const handleTruckConfirmation = () => {
		const temp = { ...allTrailerDetails };

		const keyName = `${trailer_type} ${service_provider_id}`;

		const tempFormValues = formValues;

		tempFormValues?.trailer_detail?.forEach((item, index) => {
			const newTemp = { ...item };
			newTemp.trailer_type = trailer_type;
			newTemp.service_provider_id = service_provider_id;
			newTemp.line_items = line_items;

			tempFormValues.trailer_detail[index] = newTemp;
		});

		if (keyName in temp) {
			temp[keyName] = tempFormValues;
		} else {
			temp[keyName] = tempFormValues;
		}

		setAllTrailerDetails(temp);
	};

	return (
		<TrailerDetailWrapper>
			<FormLayout fields={fields} controls={controls} errors={errors} />
			<ButtonWrapper>
				<Button
					className="primary md"
					onClick={() => {
						handleSubmit(handleTruckConfirmation)();
					}}
				>
					Confirm
				</Button>
			</ButtonWrapper>
		</TrailerDetailWrapper>
	);
};

export default TrailerDetails;
