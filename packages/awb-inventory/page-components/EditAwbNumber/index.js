import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useEffect, useState } from 'react';

import Layout from '../../commons/Layout';
import awbControls from '../../configurations/edit-awb-controls';

import styles from './styles.module.css';

const AWB_ZERO_INDEX = 0;
const AWB_THIRD_INDEX = 3;
const AWB_FOURTH_INDEX = 4;
const AWB_EIGHTH_INDEX = 8;
const CHECK_LENGTH_FOUR = 4;
const CHECK_LENGTH_FIVE = 5;
const CHECK_LENGTH_NINE = 9;

function EditAwbNumber({
	setShowEdit = () => {},
	item = {},
	editAwbNumber = () => {},
	loading,
}) {
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
			if (awbNumber.length === CHECK_LENGTH_FOUR) {
				number = `${awbNumber.slice(AWB_ZERO_INDEX, AWB_THIRD_INDEX)}-${awbNumber.slice(AWB_THIRD_INDEX)}`;
			}
			if (awbNumber.length === CHECK_LENGTH_FIVE && awbNumber[AWB_FOURTH_INDEX] === '-') {
				number = `${awbNumber.slice(AWB_ZERO_INDEX, AWB_THIRD_INDEX)}`;
			}
			if (awbNumber.length === CHECK_LENGTH_NINE && awbNumber[AWB_EIGHTH_INDEX] !== '-') {
				number = `${awbNumber.slice(AWB_ZERO_INDEX, AWB_EIGHTH_INDEX)}-${awbNumber.slice(AWB_EIGHTH_INDEX)}`;
			}
			if (awbNumber.length === CHECK_LENGTH_NINE && awbNumber[AWB_EIGHTH_INDEX] === '-') {
				number = `${awbNumber.slice(AWB_ZERO_INDEX, AWB_EIGHTH_INDEX)}`;
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
