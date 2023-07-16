import { Button } from '@cogoport/components';
import React, { useState } from 'react';

import List from '../../commons/List';
import { airIndiaCompletedFields } from '../../configurations/air-india-completed-fields';
import { airIndiaNewFields } from '../../configurations/air-india-new-fields';
import useGetAirIndiaAwbNumbers from '../../hooks/useGetAirIndiaAwbNumbers';
import functions from '../../utils/functions';

import styles from './styles.module.css';

const NO_DATA_COUNT = 0;

function AirIndiaAWB({ activeTab = 'air_india' }) {
	const [status, setStatus] = useState('inactive');

	const {
		loading,
		data = {},
		getAirIndiaAwbNumbersList,
		setPage = () => {},
		page,
		finalList = [],
		setFinalList = () => {},
	} = useGetAirIndiaAwbNumbers(activeTab, status);

	console.log('getAirIndiaAwbNumbersList', getAirIndiaAwbNumbersList);

	return (
		<div className={styles.air_india_container}>
			<div className={styles.button_group}>
				<Button
					size="md"
					themeType="secondary"
					className={`${status === 'active' && 'active'}`}
					onClick={() => setStatus('active')}
				>
					New Bookings |
					{' '}
					{data.active || NO_DATA_COUNT}
				</Button>
				<Button
					size="md"
					themeType="secondary"
					className={`${status === 'inactive' && 'active'}`}
					onClick={() => setStatus('inactive')}
				>
					Completed |
					{' '}
					{data.inactive || NO_DATA_COUNT}
				</Button>
			</div>
			<List
				data={data}
				loading={loading}
				setPage={setPage}
				page={page}
				setFinalList={setFinalList}
				finalList={finalList}
				fields={
					status === 'inactive'
						? airIndiaCompletedFields
						: airIndiaNewFields
				}
				functions={functions()}
				status={status}
			/>
		</div>
	);
}

export default AirIndiaAWB;
