import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import Layout from '../../commons/Layout';
import Header from '../../commons/List/ListHeader';
import CardItem from '../../commons/List/ListItem';
import { bookingControl } from '../../configurations/air-india-booking-control';
import { pluginHeader } from '../../configurations/plugin-header';
import useHandlePluginBooking from '../../hooks/useHandlePluginBooking';

import styles from './styles.module.css';

function AirIndiaBooking({
	pluginData = [],
	setPluginData = () => {},
	refresh = {},
	edit = false,
	item = {},
	setEdit = () => {},
}) {
	const [locationData, setLocationData] = useState({});
	const requiredControl = bookingControl(setLocationData, edit);

	const { control, handleSubmit, setValue, formState:{ errors } } = useForm();

	const { createBooking, loading } = useHandlePluginBooking(edit);

	const functions = {
		handleFlightDate: (singleItem) => {
			const { flight_date } = singleItem || {};
			const startDate = formatDate({
				date       : flight_date?.startDate,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				formatType : 'date',
			});
			const endDate = formatDate({
				date       : flight_date?.endDate,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				formatType : 'date',
			});
			return (
				startDate === endDate ? (
					startDate
				) : (
					<>
						<div>
							{startDate}
							{' '}
							-
							{' '}
						</div>
						<div>{endDate}</div>
					</>
				)
			);
		},
	};

	useEffect(() => {
		if (edit) {
			const { destination = {}, source = {}, flight_date = '' } = item || {};
			requiredControl.forEach((c) => {
				setValue(c.name, item[c.name]);
			});
			setValue('destination', destination?.id);
			setValue('source', source?.id);
			setValue('flight_date', new Date(flight_date));
		}
	}, [edit, item, requiredControl, setValue]);

	return (
		<div className={styles.booking_container}>
			<Modal.Header title="BOOKING REQUIREMENTS" />
			<div className={styles.apply_box}>
				<div style={{ width: '90%' }}>
					<Layout
						fields={requiredControl}
						control={control}
						errors={errors}
					/>
				</div>
				<Button
					onClick={handleSubmit((finalData) => createBooking({
						finalData: { ...finalData, id: item?.id },
						setPluginData,
						locationData,
						refresh,
						setEdit,
					}))}
					disabled={loading}
				>
					{edit ? 'Edit' : 'Add'}
				</Button>
			</div>
			{!isEmpty(pluginData) && (
				<div>
					<Header fields={pluginHeader} />
					{(pluginData || []).map((singleitem) => (
						<CardItem
							key={singleitem.id}
							singleitem={singleitem}
							fields={pluginHeader}
							functions={functions}
						/>
					))}
				</div>
			)}
		</div>
	);
}

export default AirIndiaBooking;
