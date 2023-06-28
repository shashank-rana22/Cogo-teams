import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useEffect, useState } from 'react';

import Layout from '../../commons/Layout';
import awbControls from '../../configurations/add-awb-controls';
import useCreateAwbNumber from '../../hooks/useCreateAwbNumber';
import useGetAWBPrefix from '../../hooks/useGetAWBPrefix';

import styles from './styles.module.css';

const AIRLINE_PREFIX_START = 0;
const AIRLINE_PREFIX_END = 3;
const SERIAL_NUMBER_START = 4;
const AWB_DIGIT_CHECK = 8;
const SERIAL_NUMBER_END = 9;
const CHECK_FOUR_AWB_LENGTH = 4;
const CHECK_FIVE_AWB_LENGTH = 5;
const CHECK_NINE_AWB_LENGTH = 9;
const CHECK_TEN_AWB_LENGTH = 10;

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
		booking_agent_id        : getShowElements(),
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
		if (firstAwbNumber.length === CHECK_FOUR_AWB_LENGTH) {
			awbNumber = `${firstAwbNumber.slice(AIRLINE_PREFIX_START, AIRLINE_PREFIX_END)}-${firstAwbNumber.slice(
				AIRLINE_PREFIX_END,
			)}`;
		}
		if (firstAwbNumber.length === CHECK_FIVE_AWB_LENGTH && firstAwbNumber[SERIAL_NUMBER_START] === '-') {
			awbNumber = `${firstAwbNumber.slice(AIRLINE_PREFIX_START, AIRLINE_PREFIX_END)}`;
		}
		if (firstAwbNumber.length === CHECK_NINE_AWB_LENGTH) {
			awbNumber = `${firstAwbNumber.slice(AIRLINE_PREFIX_START, AWB_DIGIT_CHECK)}-${firstAwbNumber.slice(
				AWB_DIGIT_CHECK,
			)}`;
		}
		if (firstAwbNumber.length === CHECK_TEN_AWB_LENGTH && firstAwbNumber[SERIAL_NUMBER_END] === '-') {
			awbNumber = `${firstAwbNumber.slice(AIRLINE_PREFIX_START, AWB_DIGIT_CHECK)}`;
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
