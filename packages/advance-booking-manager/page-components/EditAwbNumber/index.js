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
	const { commodity, bookingDate } = formValues;

	const mutatedControls = awbControls({ commodity, bookingDate });

	useEffect(() => {
		mutatedControls.forEach((controlFields) => {
			setValue(controlFields.name, item[controlFields.name] || controlFields?.value);
		});
		setValue('bookingDate', item?.bookingDate ? new Date(item?.bookingDate) : undefined);
		setValue('customClearanceDate', item?.customClearanceDate ? new Date(item?.customClearanceDate) : undefined);
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
