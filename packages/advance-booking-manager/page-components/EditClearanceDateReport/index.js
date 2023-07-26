import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useEffect } from 'react';

import Layout from '../../commons/Layout';
import editClearanceDateReportControls from '../../configurations/edit-clearance-date-report-controls';

import styles from './styles.module.css';

function EditClearanceDateReport({
	setShowEdit = () => {},
	item = {},
	editClearanceDateReport = () => {},
	loading = false,
}) {
	const { control, handleSubmit, setValue, watch, formState:{ errors } } = useForm();

	const formValues = watch();
	const { booking_date } = formValues;

	const mutatedControls = editClearanceDateReportControls({ booking_date });

	useEffect(() => {
		mutatedControls.forEach((controlFields) => {
			if (controlFields.name === 'airlineId'
				|| controlFields.name === 'airportId'
				|| controlFields.name === 'awbNumber') {
				setValue(controlFields.name, item[controlFields.name] || controlFields?.value);
			}
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.edit_clearancereport_container}>
			<div className={styles.modal_header}>EDIT</div>
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
					style={{ marginRight: '12px' }}
					disabled={loading}
				>
					Cancel
				</Button>
				<Button
					size="md"
					onClick={handleSubmit(editClearanceDateReport)}
					disabled={loading}
				>
					{loading ? 'Updating' : 'Update'}
				</Button>
			</div>
		</div>
	);
}
export default EditClearanceDateReport;
