/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useEffect, useState } from 'react';

import Layout from '../../commons/Layout';
import awbControls from '../../configurations/add-awb-controls';
import useCreateAwbNumber from '../../hooks/useCreateAwbNumber';
import useGetAWBPrefix from '../../hooks/useGetAWBPrefix';

import styles from './styles.module.css';

function AddAwbNumber({
	setShow,
	awbList,
	setActiveTab,
	setPage,
	setFinalList,
	page,
}) {
	const [serviceProviderData, setServiceProviderData] = useState({});
	const [isTopAirlines, setIsTopAirlines] = useState(true);
	const { createAwbNumber, loading } = useCreateAwbNumber(
		setShow,
		awbList,
		setActiveTab,
		setPage,
		setFinalList,
		page,
	);
	const { data, getAWBPrefix } = useGetAWBPrefix();

	console.log('serviceProviderData', serviceProviderData);

	const { control, handleSubmit, setValue, watch, formState:{ errors } } = useForm();

	const fields = awbControls({
		isTopAirlines,
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
	}, [airlineId]);

	useEffect(() => {
		if (data) {
			setValue('first_awb_number', data);
		}
	}, [data]);

	useEffect(() => {
		setIsTopAirlines(false);
	}, []);

	useEffect(() => {
		let awbNumber = firstAwbNumber;
		if (firstAwbNumber.length === 4) {
			awbNumber = `${firstAwbNumber.slice(0, 3)}-${firstAwbNumber.slice(
				3,
			)}`;
		}
		if (firstAwbNumber.length === 5 && firstAwbNumber[4] === '-') {
			awbNumber = `${firstAwbNumber.slice(0, 3)}`;
		}
		if (firstAwbNumber.length === 9) {
			awbNumber = `${firstAwbNumber.slice(0, 8)}-${firstAwbNumber.slice(
				8,
			)}`;
		}
		if (firstAwbNumber.length === 10 && firstAwbNumber[9] === '-') {
			awbNumber = `${firstAwbNumber.slice(0, 8)}`;
		}
		setValue('first_awb_number', awbNumber);
	}, [firstAwbNumber]);

	return (
		<div className={styles.addawb_container}>
			<div className={styles.modal_header}>AWB INVENTORY</div>
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
