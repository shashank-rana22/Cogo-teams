import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useEffect } from 'react';

import Layout from '../../commons/Layout';
import editClearanceDateReportContols from '../../configurations/edit-clearance-date-report-controls';

import styles from './styles.module.css';

function EditClearanceDateReport({
	setShowEdit = () => {},
	item = {},
	editClearanceDateReport = () => {},
	loading,
}) {
	const { control, handleSubmit, setValue, formState:{ errors } } = useForm();

	useEffect(() => {
		editClearanceDateReportContols.forEach((controlFields) => {
			setValue(controlFields.name, item[controlFields.name] || controlFields?.value);
		});
		setValue('procured_date', item?.procured_date ? new Date(item?.procured_date) : new Date());
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.edit_clearancereport_container}>
			<div className={styles.modal_header}>EDIT</div>
			<Layout
				fields={editClearanceDateReportContols}
				control={control}
				errors={errors}
			/>
			<div className={styles.button_container}>
				<Button
					size="md"
					themeType="secondary"
					onClick={() => setShowEdit(false)}
					style={{ marginRight: '12px' }}
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
