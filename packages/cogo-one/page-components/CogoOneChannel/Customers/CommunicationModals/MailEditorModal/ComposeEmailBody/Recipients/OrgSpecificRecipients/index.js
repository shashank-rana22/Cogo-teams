import { MultiSelect } from '@cogoport/components';
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
	const allowedOrgs = useMemo(() => (
		isEmpty(VIEW_TYPE_GLOBAL_MAPPING?.[viewType]?.allowed_organizations)
			? ['organizations', 'lead_organizations']
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
		initialLoad = false,
	} = useGetOrgUsers({
		orgId   : emailState?.orgData?.orgId || emailState?.orgId,
		orgType : emailState?.orgData?.orgType || 'organizations',
		allowedOrgs,
	});

	const selectOptions = useMemo(
		() => getOrgListOptions({
			organizationData, viewType,
		}) || null,
		[organizationData, viewType],
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
					disabled={orgInitialLoad}
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

			<MultiSelect
				key={initialLoad ? orgLoading : ''}
				className={type === 'toUserEmail' ? styles.users_select : styles.users_cc_select}
				placeholder="Search user"
				isClearable
				value={emailRecipientType || []}
				onChange={(val) => setEmailState(
					(prev) => ({ ...prev, [type]: val }),
				)}
				disabled={!(emailState?.orgData?.orgId || emailState?.orgId) || orgLoading}
				size="sm"
				multiple
				options={getAllowedEmailsList({ orgData, orgType: emailState?.orgData?.orgType }) || []}
				renderLabel={(item) => <RenderLabel item={item} />}
			/>
		</div>
	);
}

export default OrgSpecificRecipients;
