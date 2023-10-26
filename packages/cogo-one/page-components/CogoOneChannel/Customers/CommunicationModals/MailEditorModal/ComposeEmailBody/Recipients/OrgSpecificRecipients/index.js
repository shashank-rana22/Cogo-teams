import { Select } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import React, { useMemo, useState } from 'react';

import CustomSelect from '../../../../../../../../common/CustomSelect';
import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../../../../../../constants/viewTypeMapping';
import useGetOrganizations from '../../../../../../../../hooks/useGetOrganizations';
import useGetOrgUsers from '../../../../../../../../hooks/useGetOrgUsers';
import getAllowedEmailsList from '../../../../../../../../utils/getAllowedEmailsList';

import CustomSelectHeader from './CustomSelectHeader';
import {
	getOrgListOptions,
	RenderLabel,
	RenderOrgLabel,
	resetEmailRecipientData,
} from './orgSpecificFunctions';
import styles from './styles.module.css';

function ActiveSelectComponent({
	emailState = {},
	...rest
}) {
	if (emailState?.orgData?.orgId === 'lead_users') {
		return (
			<Select
				key="select"
				{...rest}
			/>
		);
	}

	return (
		<CustomSelect
			key="customSelect"
			{...rest}
		/>
	);
}

function OrgSpecificRecipients({
	type = '',
	setEmailState = () => {},
	emailRecipientType = [],
	recipientTypes = [],
	emailState = {},
	viewType = '',
}) {
	const [activeTab, setActiveTab] = useState('users');
	const isLeadUser = emailState?.orgData?.orgId === 'lead_users';

	const isChannelPartner = viewType.includes('cp_support');

	const allowedOrgs = useMemo(() => (
		isEmpty(VIEW_TYPE_GLOBAL_MAPPING?.[viewType]?.allowed_organizations)
			? ['organizations', 'lead_organizations', 'other_organizations']
			: VIEW_TYPE_GLOBAL_MAPPING?.[viewType]?.allowed_organizations
	), [viewType]);

	const organizationType = (activeTab === 'pocs' && emailState?.orgData?.orgId !== 'lead_users')
		? activeTab
		: emailState?.orgData?.orgType || 'organizations';

	const {
		organizationData = {},
		setQuery,
		setSearchQuery,
		initialLoad: orgInitialLoad = false,
		organizationsLoading = false,
	} = useGetOrganizations({
		activeTab : emailState?.orgData?.orgType,
		orgId     : emailState?.orgData?.orgId || emailState?.orgId,
		type,
		allowedOrgs,
		setEmailState,
	});

	const {
		orgLoading = false,
		orgData = {},
		handleSearch = () => {},
		initialLoad = false,
		searchQuery = '',
		setUserSearchQuery = () => {},
	} = useGetOrgUsers({
		orgId                  : emailState?.orgData?.orgId || emailState?.orgId,
		twinImporterExporterId : emailState?.orgData?.twinImporterExporterId || '',
		orgType                : organizationType,
		userIds                : emailState?.user_ids?.[type],
		allowedOrgs,
		type,
		isLeadUser,
		isChannelPartner,
	});

	const selectOptions = useMemo(
		() => getOrgListOptions({
			organizationData, activeTab: emailState?.orgData?.orgType,
		}) || null,
		[emailState?.orgData?.orgType, organizationData],
	);

	const handleChangeTab = (tab) => {
		setSearchQuery('');
		setActiveTab('users');
		setEmailState(
			(prev) => resetEmailRecipientData({
				prev,
				recipientTypes,
				orgType : tab,
				orgId   : '',
			}),
		);
	};

	const handleSelectChange = (val, obj) => {
		setEmailState(
			(prev) => {
				if (val === prev?.orgData?.orgId) {
					return prev;
				}

				return resetEmailRecipientData({
					prev,
					recipientTypes,
					orgId                  : val,
					twinImporterExporterId : obj?.twin_importer_exporter_id || val,
				});
			},
		);
	};

	return (
		<div className={styles.container}>
			{type === 'toUserEmail' ? (
				<CustomSelect
					className={styles.org_select}
					placeholder="Search organization"
					isClearable
					value={emailState?.orgData?.orgId}
					onChange={handleSelectChange}
					size="sm"
					loading={organizationsLoading}
					options={selectOptions}
					disabled={orgInitialLoad && emailState?.orgData?.orgId !== 'lead_users'}
					onSearch={setQuery}
					keyProp={emailState?.orgData?.orgType}
					renderLabel={(item) => <RenderOrgLabel item={item} />}
					optionsHeader={(
						<CustomSelectHeader
							activeTab={emailState?.orgData?.orgType}
							setActiveTab={handleChangeTab}
							allowedOrgs={allowedOrgs}
						/>
					)}
				/>
			) : null}

			<ActiveSelectComponent
				name="users"
				emailState={emailState}
				key={initialLoad ? orgLoading : ''}
				className={type === 'toUserEmail' ? styles.users_select : styles.users_cc_select}
				placeholder="Search user"
				isClearable
				onSearch={handleSearch}
				disabled={!(emailState?.orgData?.orgId || emailState?.orgId)}
				size="sm"
				multiple
				selectType="multi"
				selectedOptions={emailState?.user_ids?.[type] || []}
				options={getAllowedEmailsList({
					orgData,
					searchQuery,
					activeTab       : organizationType,
					selectedOptions : emailState?.user_ids?.[type],
					value           : emailRecipientType,
				}) || []}
				renderLabel={(item) => <RenderLabel item={item} activeTab={organizationType} />}
				value={isLeadUser
					? emailRecipientType?.[GLOBAL_CONSTANTS.zeroth_index] || ''
					: emailRecipientType || []}
				optionsHeader={(
					emailState?.orgData?.orgType?.includes('lead')
						? null
						: (
							<CustomSelectHeader
								activeTab={activeTab}
								setActiveTab={(val) => {
									setUserSearchQuery('');
									setActiveTab(val);
								}}
								type="users_select"
							/>
						)
				)}
				onChange={(val, obj) => {
					setEmailState(
						(prev) => ({
							...prev,
							[type]   : isLeadUser ? [val] : val,
							user_ids : {
								...prev?.user_ids,
								[type]: isLeadUser
									? [obj] : obj,
							},
						}),
					);
				}}
			/>
		</div>
	);
}

export default OrgSpecificRecipients;
