import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { Layout } from '@cogoport/surface-modules';
import React, { useEffect } from 'react';

import useUpdateTruckDetails from '../../../hooks/useUpdateTruckDetails';

import styles from './styles.module.css';
import useMutateFieldsHelper from './useMutateFieldsHelper';

function Form({
	controls = [],
	heading = '',
	type = '',
	truckList = [],
	driverDetails = [],
	etaEtdList = [],
	refetchServices = () => {},
}) {
	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
	} = useForm();

	const { loading, updateTruckDetails } = useUpdateTruckDetails({
		refetchServices,
	});

	// const { newFields } = useMutateFieldsHelper({
	// 	type,
	// 	truckList,
	// 	fields: controls,
	// 	watch,
	// });

	const handleFormSubmit = (data) => {
		updateTruckDetails(data);
	};

	// useEffect(() => {
	// 	if (type === 'eta') {
	// 		setValues({
	// 			service_data: etaEtdList,
	// 		});
	// 	} else if (type === 'driver') {
	// 		setValues({
	// 			service_data: driverDetails,
	// 		});
	// 	}
	// }, []);

	return (
		<div className={styles.container}>
			<div className={styles.header}>{heading}</div>
			<Layout
				control={control}
				fields={controls}
				errors={errors}
			/>
			<div className={styles.btn}>
				<Button onClick={handleSubmit(handleFormSubmit)} disabled={loading}>
					Confirm
				</Button>
			</div>
		</div>
	);
}

export default Form;
