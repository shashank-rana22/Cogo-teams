import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useEffect } from 'react';

import Layout from '../../commons/Layout';
import awbControls from '../../configurations/edit-awb-controls';

import styles from './styles.module.css';

function EditAwbNumber({
	setShowEdit = () => {},
	item = {},
	editAwbNumber = () => {},
	loading = false,
}) {
	const { control, handleSubmit, watch, setValue, formState:{ errors } } = useForm();

	const formValues = watch();
	const { commodity, booking_date } = formValues;

	const mutatedControls = awbControls({ commodity, booking_date });

	useEffect(() => {
		mutatedControls.forEach((controlFields) => {
			setValue(controlFields.name, item[controlFields.name] || controlFields?.value);
		});
		setValue('booking_date', item?.bookingDate ? new Date(item?.bookingDate) : undefined);
		setValue('custom_clearance_date', item?.customClearanceDate ? new Date(item?.customClearanceDate) : undefined);
		setValue('destination_location_id', item?.destinationLocationId || undefined);
		setValue('commodity', item?.commodityDetails?.commodity || undefined);
		setValue('commodity_type', item?.commodityDetails?.commodityType || undefined);
		setValue('chargeable_weight', item?.chargeableWeight || undefined);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.addawb_container}>
			<div className={styles.modal_header}>EDIT AWB NUMBER</div>
			<Layout
				fields={mutatedControls}
				control={control}
				errors={errors}
			/>
			<div className={styles.button_container}>
				<Button
					size="md"
					themeType="secondary"
					onClick={() => setShowEdit(false)}
					style={{ marginRight: 12 }}
					disabled={loading}
				>
					Cancel
				</Button>
				<Button
					size="md"
					onClick={handleSubmit(editAwbNumber)}
					disabled={loading}
				>
					{loading ? 'Updating' : 'Update'}
				</Button>
			</div>
		</div>
	);
}
export default EditAwbNumber;
