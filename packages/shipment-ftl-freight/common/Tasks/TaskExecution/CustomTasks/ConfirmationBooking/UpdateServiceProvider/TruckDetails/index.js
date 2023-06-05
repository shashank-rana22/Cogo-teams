import { Button, toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { Layout } from '@cogoport/surface-modules';
import { useEffect } from 'react';

import getDefaultValues from '../../../../utils/get-default-values';
import { controls } from '../../Controls/updateServiceProviderControls';
import useTruckDetailHelper from '../../hooks/useTruckDetailHelper';

import styles from './styles.module.css';

function TruckDetails(props) {
	const {
		allTruckDetails,
		setAllTruckDetails,
		truck_type,
		serviceProviderData,
		singleServiceProvider,
	} = props;

	const { service_provider_id, line_items } = serviceProviderData;

	const finalControls = controls(service_provider_id);

	const defaultValues = getDefaultValues(finalControls);
	const { control, formState, handleSubmit, watch, reset, setValues, setValue } =	useForm({ defaultValues });

	const formValues = watch();

	const { errors } = formState;

	const { newControls } = useTruckDetailHelper({
		finalControls,
		watch,
		setValue,
		formValues,
	});

	useEffect(() => {
		const truck_detail =			allTruckDetails[`${truck_type}:${service_provider_id}`]?.truck_detail;
		if (truck_detail) {
			setValues({
				truck_detail,
			});
		} else {
			reset();
		}
	}, [allTruckDetails, reset, service_provider_id, setValues, truck_type]);

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

		const tempAthAmount = Number(singleServiceProvider?.buy_rate) * 0.9;

		if (
			+tempAthAmount
			< (+singleServiceProvider?.updated_advance_amount
				|| +singleServiceProvider?.advanced_amount)
		) {
			toast.error('Advanced Amount Cannot be greater than 90% of Buy Rate');
		} else {
			setAllTruckDetails(temp);
			toast.success('Truck Detail Added Successfully');
		}
	};

	return (
		<div className={styles.truck_details_wrapper}>
			<Layout fields={newControls} control={control} errors={errors} />
			<div className={styles.button_wrapper}>
				<Button
					onClick={() => {
						handleSubmit(handleTruckConfirmation)();
					}}
				>
					Confirm
				</Button>
			</div>
		</div>
	);
}

export default TruckDetails;
