import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useEffect, useState } from 'react';

import Layout from '../../commons/Layout';
import { NestedObj } from '../../commons/List/Interfaces';
import awbControls from '../../configurations/edit-awb-controls';

import styles from './styles.module.css';

interface Props {
	setShowEdit?: Function;
	item?: NestedObj;
	editAwbNumber?: Function;
	loading?: boolean;
}

function EditAwbNumber({
	setShowEdit = () => {},
	item = {},
	editAwbNumber = () => {},
	loading,
}:Props) {
	const [serviceProviderData, setServiceProviderData] = useState({});

	const { control, handleSubmit, setValue, watch, formState:{ errors } } = useForm();

	const fields = awbControls({
		item,
		setServiceProviderData,
		serviceProviderData,
	});

	useEffect(() => {
		fields.forEach((c) => {
			setValue(c.name, item[c.name] || c?.value);
		});
		setValue('procured_date', new Date(item?.procured_date));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const { awb_number:awbNumber = '' } = watch();

	useEffect(() => {
		if (awbNumber) {
			let number = awbNumber;
			if (awbNumber.length === 4) {
				number = `${awbNumber.slice(0, 3)}-${awbNumber.slice(3)}`;
			}
			if (awbNumber.length === 5 && awbNumber[4] === '-') {
				number = `${awbNumber.slice(0, 3)}`;
			}
			if (awbNumber.length === 9 && awbNumber[8] !== '-') {
				number = `${awbNumber.slice(0, 8)}-${awbNumber.slice(8)}`;
			}
			if (awbNumber.length === 9 && awbNumber[8] === '-') {
				number = `${awbNumber.slice(0, 8)}`;
			}
			setValue('awb_number', number);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [awbNumber]);

	return (
		<div className={styles.addawb_container}>
			<div className={styles.modal_header}>EDIT AWB NUMBER</div>
			<Layout
				fields={fields}
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
