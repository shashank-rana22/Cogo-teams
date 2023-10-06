import { Input } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';
import React, { useMemo, useState } from 'react';

import CustomSelect from '../../../../../../../common/CustomSelect';
import { SERVICE } from '../../../../../../../constants';
import useGetUserShipmentActivity from '../../../../../../../hooks/useGetUserShipmentActivity';
import getActivityListOptions from '../../../../../../../utils/getActivityListOptions';

import CustomSelectHeader from './CustomSelectHeader';
import styles from './styles.module.css';

function RenderLabel({ item = {}, activeTab = '' }) {
	if (activeTab === 'custom') {
		return item?.label;
	}

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
	emailState = {},
	setEmailState = () => {},
}) {
	const [initialLoad, setInitialLoad] = useState(true);
	const {
		activityData = {},
		activityLoading = false,
		setQuery,
		setSearchQuery,
	} = useGetUserShipmentActivity({
		organizationId : emailState?.orgData?.orgId || emailState?.orgId || emailState?.orgId,
		activeTab      : emailState?.customSubject?.activeTab,
		setInitialLoad,
	});

	const selectOptions = useMemo(
		() => getActivityListOptions({
			activityData,
			activeTab: emailState?.customSubject?.activeTab,
		}) || [],
		[activityData, emailState?.customSubject?.activeTab],
	);

	const handleSelectChange = (serialId) => setEmailState(
		(prev) => ({
			...prev,
			customSubject: {
				...prev?.customSubject,
				serialId,
			},
		}),
	);

	const handleChangeTab = (activeTab) => {
		setSearchQuery('');
		setEmailState(
			(prev) => ({
				...prev,
				customSubject: {
					...prev?.customSubject,
					activeTab,
					serialId: '',
				},
			}),
		);
	};

	return (
		<div className={styles.container}>
			<CustomSelect
				key={initialLoad ? activityLoading : ''}
				className={styles.subject_select}
				placeholder="Search Your Subject"
				isClearable
				value={emailState?.customSubject?.serialId}
				onChange={handleSelectChange}
				disabled={!(emailState?.orgData?.orgId || emailState?.orgId)}
				loading={emailState?.customSubject?.activeTab !== 'custom'
					? activityLoading
					: false}
				size="sm"
				multiple
				options={selectOptions}
				onSearch={setQuery}
				renderLabel={(item) => (
					<RenderLabel
						item={item}
						activeTab={emailState?.customSubject?.activeTab}
					/>
				)}
				optionsHeader={(
					<CustomSelectHeader
						activeTab={emailState?.customSubject?.activeTab}
						setActiveTab={handleChangeTab}
					/>
				)}
			/>

			<Input
				className={styles.subject_input}
				size="sm"
				value={emailState?.customSubject?.subjectText}
				placeholder="Write Your Subject here..."
				onChange={(subjectText) => setEmailState(
					(prev) => ({
						...prev,
						customSubject: {
							...prev?.customSubject,
							subjectText,
						},
					}),
				)}
			/>
		</div>
	);
}

export default ShipmentSubject;
