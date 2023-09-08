import { Button, Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Layout } from '@cogoport/surface-modules';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect } from 'react';

import getDefaultValues from '../../../../../utils/get-default-values';
import { truckDetailsControls } from '../../../configs/truckDetailsControls';
import useListConstantConfigurations from '../../../hooks/useListConstantConfigurations';
import { isATHAmountValid } from '../../../utils/validateAth';

import styles from './styles.module.css';

function TruckDetailForm({
	allTruckDetails = {},
	setAllTruckDetails = () => {},
	currentTab: truck_type = '',
	singleServiceProvider = {},
	services = [],
	truckDetailsList = [],
	tripDistance = 1,
	shipment_data = {},
}) {
	const controls = truckDetailsControls({ shipment_data });
	const defaultValues = getDefaultValues(controls);
	const { control, formState : { errors }, handleSubmit, setValue, reset } = useForm({ defaultValues });

	const {
		service_provider_id = '',
		line_items = [],
		transit_time = '',
		detention_free_time = '',
		updated_detention_free_time = '',
		priority = '',
		preference_id = '',
	} = singleServiceProvider || {};

	const isFleetContractBooking = !isEmpty(services[GLOBAL_CONSTANTS.zeroth_index]?.asset_ids);
	if (isFleetContractBooking) {
		controls.forEach((ctrl) => {
			if (ctrl?.type === 'fieldArray') {
				ctrl?.controls?.forEach((subControl) => {
					const tempControl = subControl;
					if (subControl.name === 'truck_number') {
						tempControl.type = 'select';
						tempControl.options = truckDetailsList?.map((truck) => ({
							label : truck?.data?.asset_registration_number,
							value : truck?.data?.asset_registration_number,
						}));
					}
				});
			}
		});
	}

	const { data: fuelCostResp = {} } = useListConstantConfigurations();

	const keyName = `${truck_type}:${service_provider_id}:${transit_time}:${detention_free_time}:${priority}`;

	const submitForm = (values) => {
		const temp = { ...allTruckDetails };
		const TEMP_FORM_VALUES = {};
		TEMP_FORM_VALUES.truck_detail = values?.truck_detail?.map((item) => ({
			...item,
			truck_type,
			service_provider_id,
			line_items,
			transit_time,
			priority,
			preference_id,
			detention_free_time: updated_detention_free_time || detention_free_time,
		}));

		temp[keyName] = TEMP_FORM_VALUES;
		const VALID_ATH = {};

		const isValid = isATHAmountValid({
			validATHAmount : VALID_ATH,
			fuelCostResp,
			singleServiceProvider,
			services,
			formValues     : values,
			truckDetailsList,
			isFleetContractBooking,
			tripDistance,
		});

		if (isValid) {
			setAllTruckDetails(temp);
			Toast.success('Truck Detail Added Successfully');
		} else {
			Toast.error(`Advanced Amount Cannot be greater than ${isFleetContractBooking
				? VALID_ATH?.withContract
				: '90% of Buy Rate'
			}`);
		}
	};

	useEffect(() => {
		const truck_detail = allTruckDetails[keyName]?.truck_detail;
		if (truck_detail) {
			setValue('truck_detail', truck_detail);
		} else {
			reset();
		}
	}, [keyName, allTruckDetails, setValue, reset]);

	return (
		<div className={styles.form_container}>
			<Layout control={control} errors={errors} fields={controls} />
			<div className={styles.button_wrapper}>
				<Button themeType="primary" size="md" className={styles.btn} onClick={handleSubmit(submitForm)}>
					Confirm
				</Button>
			</div>
		</div>
	);
}

export default TruckDetailForm;
