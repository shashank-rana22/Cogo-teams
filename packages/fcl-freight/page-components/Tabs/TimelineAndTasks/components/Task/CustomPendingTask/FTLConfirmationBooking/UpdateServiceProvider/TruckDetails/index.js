import React, { useEffect } from 'react';
import { useFormCogo } from '@cogoport/front/hooks';
import { Button, toast } from '@cogoport/front/components/admin';
import FormLayout from '../../../../../../../commons/Layout';
import { controls } from '../../Controls/updateServiceProviderControls';
import { ButtonWrapper, TruckDetailWrapper } from '../styles';

const TruckDetails = (props) => {
	const {
		allTruckDetails,
		setAllTruckDetails,
		truck_type,
		serviceProviderData,
	} = props;

	const { service_provider_id, line_items } = serviceProviderData;

	const { fields, formState, handleSubmit, watch, reset, setValues } =
		useFormCogo(controls);

	const formValues = watch();

	const { errors } = formState;

	useEffect(() => {
		const truck_detail =
			allTruckDetails[`${truck_type}:${service_provider_id}`]?.truck_detail;
		if (truck_detail) {
			setValues({
				truck_detail,
			});
		} else {
			reset();
		}
	}, [truck_type]);

	const handleTruckConfirmation = () => {
		const temp = { ...allTruckDetails };

		const keyName = `${truck_type}:${service_provider_id}`;

		const tempFormValues = formValues;

		tempFormValues?.truck_detail?.forEach((item, index) => {
			const newTemp = { ...item };
			newTemp.truck_type = truck_type;
			newTemp.service_provider_id = service_provider_id;
			newTemp.line_items = line_items;

			tempFormValues.truck_detail[index] = newTemp;
		});

		if (keyName in temp) {
			temp[keyName] = tempFormValues;
		} else {
			temp[keyName] = tempFormValues;
		}

		setAllTruckDetails(temp);
		toast.success('Truck Detail Added Successfully');
	};

	return (
		<TruckDetailWrapper>
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
		</TruckDetailWrapper>
	);
};

export default TruckDetails;
