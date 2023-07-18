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
	loading,
}) {
	const { control, handleSubmit, setValue, formState:{ errors } } = useForm();

	useEffect(() => {
		awbControls.forEach((c) => {
			setValue(c.name, item[c.name] || c?.value);
		});
		setValue('procured_date', item?.procured_date ? new Date(item?.procured_date) : new Date());
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.addawb_container}>
			<div className={styles.modal_header}>EDIT AWB NUMBER</div>
			<Layout
				fields={awbControls}
				control={control}
				errors={errors}
			/>
			<div className={styles.button_container}>
				<Button
					size="md"
					themeType="secondary"
					onClick={() => setShowEdit(false)}
					style={{ marginRight: 12 }}
				>
					Cancel
				</Button>
				<Button
					size="md"
					onClick={handleSubmit((finalData) => editAwbNumber(finalData))}
					disabled={loading}
				>
					{loading ? 'Updating' : 'Update'}
				</Button>
			</div>
		</div>
	);
}
export default EditAwbNumber;
