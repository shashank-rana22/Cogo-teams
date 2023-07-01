import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { Layout } from '@cogoport/surface-modules';

import useUpdateTruckDetails from '../../../hooks/useUpdateTruckDetails';

import styles from './styles.module.css';
import useMutateFieldsHelper from './useMutateFieldsHelper';

function Form({
	controls = [],
	type = '',
	truckList = [],
	driverDetails = [],
	etaEtdList = [],
	refetchServices = () => {},
}) {
	let prefillValue = [{}];
	if (type === 'eta') {
		prefillValue = etaEtdList;
	} else if (type === 'driver') {
		prefillValue = driverDetails;
	}
	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm({
		defaultValues: {
			service_data: prefillValue,
		},
	});

	const { loading, updateTruckDetails } = useUpdateTruckDetails({
		refetchServices,
	});

	const { newFields } = useMutateFieldsHelper({
		type,
		truckList,
		fields: controls,
		watch,
	});

	const handleFormSubmit = (data) => {
		updateTruckDetails(data);
	};

	return (
		<div className={styles.container}>
			<Layout
				control={control}
				fields={newFields}
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
