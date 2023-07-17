import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import Layout from '../../commons/Layout';
import List from '../../commons/List';
import { bookingControl } from '../../configurations/air-india-booking-control';
import { pluginHeader } from '../../configurations/plugin-header';
import useCreatePluginBooking from '../../hooks/useCreatePluginBooking';

import styles from './styles.module.css';

function AirIndiaBooking({
	showPlugInModal = [],
	setShowPlugInModal = () => {},
	refresh = {},
}) {
	const [locationData, setLocationData] = useState({});

	const requiredControl = bookingControl(setLocationData);

	const { control, handleSubmit, reset, formState:{ errors } } = useForm();

	const { createBooking, loading } = useCreatePluginBooking();

	return (
		<div className={styles.booking_container}>
			<h2 className={styles.title}>BOOKING REQUIREMENTS</h2>
			<div className={styles.apply_box}>
				<div style={{ width: '90%' }}>
					<Layout
						fields={requiredControl}
						control={control}
						errors={errors}
					/>
				</div>
				<Button
					size="md"
					themeType="primary"
					onClick={handleSubmit((finalData) => createBooking({
						finalData,
						setShowPlugInModal,
						reset,
						locationData,
						refresh,
					}))}
					disabled={loading}
				>
					Add
				</Button>
			</div>
			{!isEmpty(showPlugInModal)
			&& <List fields={pluginHeader} data={showPlugInModal} />}
		</div>
	);
}

export default AirIndiaBooking;
