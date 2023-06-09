import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useEffect, useState } from 'react';

import Layout from '../../commons/Layout';
import awbControls from '../../configurations/add-awb-controls';
import useCreateAwbNumber from '../../hooks/useCreateAwbNumber';
import useGetAWBPrefix from '../../hooks/useGetAWBPrefix';

import styles from './styles.module.css';

const AWB_ZERO_INDEX = 0;
const AWB_THIRD_INDEX = 3;
const AWB_FOURTH_INDEX = 4;
const AWB_EIGHTH_INDEX = 8;
const AWB_NINETH_INDEX = 9;
const CHECK_LENGTH_FOUR = 4;
const CHECK_LENGTH_FIVE = 5;
const CHECK_LENGTH_NINE = 9;
const CHECK_LENGTH_TEN = 10;

function AddAwbNumber({
	setShow,
	awbList,
	setActiveTab,
	setPage,
	setFinalList,
	page,
}) {
	const [serviceProviderData, setServiceProviderData] = useState({});

	const { createAwbNumber, loading } = useCreateAwbNumber(
		setShow,
		awbList,
		setActiveTab,
		setPage,
		setFinalList,
		page,
	);
	const { data, getAWBPrefix } = useGetAWBPrefix();

	const { control, handleSubmit, setValue, watch, formState:{ errors } } = useForm();

	const fields = awbControls({
		setServiceProviderData,
		serviceProviderData,
	});
	const { first_awb_number: firstAwbNumber = '', airline_id: airlineId = '', awb_block: awbBlock = '' } = watch();

	const getShowElements = () => !!awbBlock;

	const showElements = {
		importer_exporter_id    : getShowElements(),
		destination_location_id : getShowElements(),
	};
	useEffect(() => {
		if (airlineId) {
			getAWBPrefix(airlineId);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [airlineId]);

	useEffect(() => {
		if (data) {
			setValue('first_awb_number', data);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	useEffect(() => {
		let awbNumber = firstAwbNumber;
		if (firstAwbNumber.length === CHECK_LENGTH_FOUR) {
			awbNumber = `${firstAwbNumber.slice(AWB_ZERO_INDEX, AWB_THIRD_INDEX)}-${firstAwbNumber.slice(
				AWB_THIRD_INDEX,
			)}`;
		}
		if (firstAwbNumber.length === CHECK_LENGTH_FIVE && firstAwbNumber[AWB_FOURTH_INDEX] === '-') {
			awbNumber = `${firstAwbNumber.slice(AWB_ZERO_INDEX, AWB_THIRD_INDEX)}`;
		}
		if (firstAwbNumber.length === CHECK_LENGTH_NINE) {
			awbNumber = `${firstAwbNumber.slice(AWB_ZERO_INDEX, AWB_EIGHTH_INDEX)}-${firstAwbNumber.slice(
				AWB_EIGHTH_INDEX,
			)}`;
		}
		if (firstAwbNumber.length === CHECK_LENGTH_TEN && firstAwbNumber[AWB_NINETH_INDEX] === '-') {
			awbNumber = `${firstAwbNumber.slice(AWB_ZERO_INDEX, AWB_EIGHTH_INDEX)}`;
		}
		setValue('first_awb_number', awbNumber);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [firstAwbNumber]);

	return (
		<div className={styles.addawb_container}>
			<div className={styles.modal_header}>ADD AWB NUMBER</div>
			<Layout
				fields={fields}
				control={control}
				errors={errors}
				showElements={showElements}
			/>
			<div className={styles.button_container}>
				<Button
					size="md"
					themeType="secondary"
					onClick={() => setShow(false)}
					style={{ marginRight: 12 }}
				>
					Cancel
				</Button>
				<Button
					size="md"
					onClick={handleSubmit((finalData) => createAwbNumber(finalData))}
					disabled={loading}
				>
					{loading ? 'Creating' : 'Create'}
				</Button>
			</div>
		</div>
	);
}
export default AddAwbNumber;
