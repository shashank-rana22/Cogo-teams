import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useEffect, useState } from 'react';

import Layout from '../../commons/Layout';
import awbControls from '../../configurations/edit-awb-controls';

import styles from './styles.module.css';

const AIRLINE_PREFIX_START = 0;
const AIRLINE_PREFIX_END = 3;
const SERIAL_NUMBER_START = 4;
const AWB_DIGIT_CHECK = 8;
const CHECK_FOUR_AWB_LENGTH = 4;
const CHECK_FIVE_AWB_LENGTH = 5;
const CHECK_NINE_AWB_LENGTH = 9;

function EditAwbNumber({
	setShowEdit = () => {},
	item = {},
	editAwbNumber = () => {},
	loading,
}) {
	console.log('item', item);
	const [serviceProviderData, setServiceProviderData] = useState({});

	const { control, handleSubmit, setValue, watch, formState:{ errors } } = useForm();

	const fields = awbControls({
		item,
		setServiceProviderData,
		serviceProviderData,
	});
	// write prefill code below this line in useEffect
	useEffect(() => {
		fields.forEach((c) => {
			console.log('c.name', c.name, item[c.name]);
			setValue(c.name, item[c.name] || c?.value);
		});
		setValue('procured_date', item?.procured_date ? new Date(item?.procured_date) : new Date());
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const { awb_number:awbNumber = '' } = watch();

	useEffect(() => {
		if (awbNumber) {
			let number = awbNumber;
			if (awbNumber.length === CHECK_FOUR_AWB_LENGTH) {
				number = `${awbNumber.slice(
					AIRLINE_PREFIX_START,
					AIRLINE_PREFIX_END,
				)}-${awbNumber.slice(AIRLINE_PREFIX_END)}`;
			}
			if (awbNumber.length === CHECK_FIVE_AWB_LENGTH && awbNumber[SERIAL_NUMBER_START] === '-') {
				number = `${awbNumber.slice(AIRLINE_PREFIX_START, AIRLINE_PREFIX_END)}`;
			}
			if (awbNumber.length === CHECK_NINE_AWB_LENGTH && awbNumber[AWB_DIGIT_CHECK] !== '-') {
				number = `${awbNumber.slice(
					AIRLINE_PREFIX_START,
					AWB_DIGIT_CHECK,
				)}-${awbNumber.slice(AWB_DIGIT_CHECK)}`;
			}
			if (awbNumber.length === CHECK_NINE_AWB_LENGTH && awbNumber[AWB_DIGIT_CHECK] === '-') {
				number = `${awbNumber.slice(AIRLINE_PREFIX_START, AWB_DIGIT_CHECK)}`;
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
