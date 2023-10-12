import { MultiSelect, Select } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import React, { useMemo } from 'react';

import CustomSelect from '../../../../../../../../common/CustomSelect';
import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../../../../../../constants/viewTypeMapping';
import useGetOrganizations from '../../../../../../../../hooks/useGetOrganizations';
import useGetOrgUsers from '../../../../../../../../hooks/useGetOrgUsers';
import getAllowedEmailsList from '../../../../../../../../utils/getAllowedEmailsList';

import CustomSelectHeader from './CustomSelectHeader';
import { getOrgListOptions, RenderLabel, RenderOrgLabel, resetEmailRecipientData } from './orgSpecificFunctions';
import styles from './styles.module.css';

function OrgSpecificRecipients({
	type = '',
	setEmailState = () => {},
	emailRecipientType = [],
	recipientTypes = [],
	emailState = {},
	viewType = '',
}) {
	const isLeadUser = emailState?.orgData?.orgId === 'lead_users';

	const allowedOrgs = useMemo(() => (
		isEmpty(VIEW_TYPE_GLOBAL_MAPPING?.[viewType]?.allowed_organizations)
			? ['organizations', 'other_organizations']
			: VIEW_TYPE_GLOBAL_MAPPING?.[viewType]?.allowed_organizations
	), [viewType]);

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
	} = useGetOrgUsers({
		orgId   : emailState?.orgData?.orgId || emailState?.orgId,
		orgType : emailState?.orgData?.orgType || 'organizations',
		userIds : emailState?.user_ids?.[type],
		allowedOrgs,
		type,
		isLeadUser,
	});

	const selectOptions = useMemo(
		() => getOrgListOptions({
			organizationData, activeTab: emailState?.orgData?.orgType,
		}) || null,
		[emailState?.orgData?.orgType, organizationData],
	);

	const handleChangeTab = (activeTab) => {
		setSearchQuery('');
		setEmailState(
			(prev) => resetEmailRecipientData({
				prev,
				recipientTypes,
				orgType : activeTab,
				orgId   : '',
			}),
		);
	};

	const handleSelectChange = (val) => {
		setEmailState(
			(prev) => {
				if (val === prev?.orgData?.orgId) {
					return prev;
				}

				return resetEmailRecipientData({
					prev,
					recipientTypes,
					orgId: val,
				});
			},
		);
	};

	const ActiveSelectComponent = emailState?.orgData?.orgId === 'lead_users' ? Select : MultiSelect;

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
				key={initialLoad ? orgLoading : ''}
				className={type === 'toUserEmail' ? styles.users_select : styles.users_cc_select}
				placeholder="Search user"
				isClearable
				value={isLeadUser
					? emailRecipientType?.[GLOBAL_CONSTANTS.zeroth_index] || ''
					: emailRecipientType || []}
				onSearch={handleSearch}
				onChange={(val, obj) => {
					setEmailState(
						(prev) => ({
							...prev,
							[type]   : isLeadUser ? [val] : val,
							user_ids : {
								...prev?.user_ids,
								[type]: isLeadUser
									? [obj.id] : obj?.map((itm) => itm.id || ''),
							},
						}),
					);
				}}
				disabled={!(emailState?.orgData?.orgId || emailState?.orgId) || orgLoading}
				size="sm"
				multiple
				options={getAllowedEmailsList({ orgData, searchQuery }) || []}
				renderLabel={(item) => <RenderLabel item={item} />}
			/>
		</div>
	);
}

export default OrgSpecificRecipients;
