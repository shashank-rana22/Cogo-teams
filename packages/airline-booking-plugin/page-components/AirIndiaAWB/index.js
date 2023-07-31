import { Button, Tooltip } from '@cogoport/components';
import { IcMEdit, IcMDelete } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import List from '../../commons/List';
import { airIndiaCompletedFields } from '../../configurations/air-india-completed-fields';
import { airIndiaNewFields } from '../../configurations/air-india-new-fields';
import CONSTANTS from '../../constants/constants';
import useGetAirIndiaAwbNumbers from '../../hooks/useGetAirIndiaAwbNumbers';
import useHandlePluginBooking from '../../hooks/useHandlePluginBooking';
import { commonFunctions } from '../../utils/commonFunctions';

import styles from './styles.module.css';

const { START_PAGE } = CONSTANTS;
const NO_DATA_COUNT = 0;

function AirIndiaAWB({
	activeTab = 'air_india',
	setEdit = () => {},
	item = {},
	setItem = () => {},
	setRefresh = () => {},
}) {
	const profile = useSelector((state) => state);
	const [status, setStatus] = useState('inactive');
	const [statusAwb, setStatusAwb] = useState([]);

	const { profile: { authParams } } = profile || {};
	const { stateBooking } = useHandlePluginBooking(true);

	const {
		loading,
		data = {},
		getAirIndiaAwbNumbersList,
		setPage = () => {},
		page,
		finalList = [],
		setFinalList = () => {},
	} = useGetAirIndiaAwbNumbers(activeTab, status);

	const otherFunctions = {
		handleAWBNumber: (singleItem) => {
			const { air_india_awb_number = {} } = singleItem || {};
			return (
				(air_india_awb_number?.awb_number ? (
					air_india_awb_number?.awb_number || '-'
				) : (
					<Button
						themeType="linkUi"
						onClick={() => {
							setItem(singleItem);
							setStatusAwb('move');
						}}
						style={{ padding: 0 }}
					>
						Move to New Bookings
					</Button>
				))
			);
		},
		handleAction: (singleItem) => (
			!singleItem?.air_india_awb_number?.awb_number && (
				<div className={styles.edit_button_group}>
					<Button
						size="md"
						themeType="linkUi"
						onClick={() => {
							setEdit(true);
							setItem(singleItem);
						}}
					>
						<div className={styles.tooltip_container}>
							<Tooltip
								content="Edit Booking"
								placement="right"
								interactive
							>
								<IcMEdit fill="var(--color-accent-orange-2)" />
							</Tooltip>
						</div>
					</Button>
					<Button
						size="md"
						themeType="linkUi"
						onClick={() => {
							setStatusAwb('delete');
							setItem(singleItem);
						}}
					>
						<div className={styles.tooltip_container}>
							<Tooltip
								content="Delete Booking"
								placement="right"
								interactive
							>
								<IcMDelete fill="var(--color-accent-orange-2)" />
							</Tooltip>
						</div>
					</Button>
				</div>
			)
		),
	};

	const functions = { ...commonFunctions, ...otherFunctions };

	useEffect(() => {
		if (!isEmpty(statusAwb)) {
			stateBooking({
				statusAwb,
				getAirIndiaAwbNumbersList,
				setFinalList,
				setPage,
				id: item?.id,
			});
			setStatusAwb([]);
		}
	}, [getAirIndiaAwbNumbersList, item?.id, setFinalList, setPage, stateBooking, statusAwb]);

	useEffect(() => {
		setFinalList([]);
		if (page === START_PAGE) {
			getAirIndiaAwbNumbersList();
		} else {
			setPage(START_PAGE);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(authParams)]);

	useEffect(() => {
		setRefresh({ setFinalList, setPage, getAirIndiaAwbNumbersList });
	}, [getAirIndiaAwbNumbersList, setFinalList, setPage, setRefresh]);

	return (
		<div className={styles.air_india_container}>
			<div className={styles.button_group}>
				<Button
					size="md"
					themeType="secondary"
					className={status === 'active' && 'active'}
					onClick={() => setStatus('active')}
				>
					New Bookings |
					{' '}
					{data.active || NO_DATA_COUNT}
				</Button>
				<Button
					size="md"
					themeType="secondary"
					className={status === 'inactive' && 'active'}
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
				functions={functions}
				status={status}
			/>
		</div>
	);
}

export default AirIndiaAWB;
