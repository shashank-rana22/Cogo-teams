import { Input } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import CustomSelect from '../../../../../../../common/CustomSelect';
import { SERVICE } from '../../../../../../../constants';
import useGetUserShipmentActivity from '../../../../../../../hooks/useGetUserShipmentActivity';
import getActivityListOptions from '../../../../../../../utils/getActivityListOptions';

import CustomSelectHeader from './CustomSelectHeader';
import styles from './styles.module.css';

function RenderLabel({ item = {}, activeTab = '' }) {
	const shipmentType = activeTab === 'quotation' ? item?.primary_service : item?.shipment_type;

	const originPort = activeTab === 'quotation'
		? item?.services?.[item?.primary_service_id]?.origin_port
		: item?.origin_port;

	const destinationPort = activeTab === 'quotation'
		? item?.services?.[item?.primary_service_id]?.destination_port
		: item?.destination_port;

	return (
		<div>
			<div className={styles.agent_label}>
				{item?.label}
			</div>

			{shipmentType ? (
				<div className={styles.lower_label}>
					<span>
						{SERVICE?.[shipmentType] || startCase(shipmentType)}
					</span>
					<span>|</span>
					<span>
						{originPort?.port_code}
						{' '}
						-
						{' '}
						{destinationPort?.port_code}
					</span>
				</div>
			) : null}

			<div className={styles.created_at}>
				Created at:
				{' '}
				{formatDate({
					date       : item?.created_at,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
					formatType : 'dateTime',
					separator  : ', ',
				})}
			</div>
		</div>
	);
}

function ShipmentSubject({
	orgId = '',
	setEmailState = () => {},
}) {
	const [newSubject, setNewSubject] = useState({
		activeTab     : 'shipment',
		serialId      : '',
		customSubject : '',
	});

	const {
		activityData = {},
		activityLoading = false,
		setQuery,
		setSearchQuery,
	} = useGetUserShipmentActivity({
		organizationId : orgId,
		activeTab      : newSubject?.activeTab,
	});

	const selectOptions = (getActivityListOptions({
		activityData,
		activeTab: newSubject?.activeTab,
	}) || []);

	const handleSelectChange = (serialId) => setNewSubject(
		(prev) => ({ ...prev, serialId }),
	);
	const handleChangeTab = (activeTab) => {
		setSearchQuery('');
		setNewSubject(
			(prev) => ({ ...prev, activeTab, serialId: '' }),
		);
	};

	useEffect(() => {
		if (newSubject?.serialId && newSubject?.customSubject) {
			setEmailState((prev) => ({
				...prev,
				subject: `${newSubject?.serialId} | ${newSubject?.customSubject}`,
			}));
			return;
		}

		setEmailState((prev) => ({
			...prev,
			subject: '',
		}));
	}, [newSubject, setEmailState]);

	return (
		<div className={styles.container}>
			<CustomSelect
				className={styles.subject_select}
				placeholder="Search Your Subject"
				isClearable
				value={newSubject?.serialId}
				onChange={handleSelectChange}
				disabled={!orgId}
				loading={activityLoading}
				size="sm"
				multiple
				options={selectOptions}
				onSearch={setQuery}
				renderLabel={(item) => <RenderLabel item={item} activeTab={newSubject?.activeTab} />}
				optionsHeader={(
					<CustomSelectHeader
						activeTab={newSubject?.activeTab}
						setActiveTab={handleChangeTab}
					/>
				)}
			/>

			<Input
				className={styles.subject_input}
				size="sm"
				value={newSubject?.customSubject}
				placeholder="Write Your Subject here..."
				onChange={(customSubject) => setNewSubject(
					(prev) => ({ ...prev, customSubject }),
				)}
			/>
		</div>
	);
}

export default ShipmentSubject;
