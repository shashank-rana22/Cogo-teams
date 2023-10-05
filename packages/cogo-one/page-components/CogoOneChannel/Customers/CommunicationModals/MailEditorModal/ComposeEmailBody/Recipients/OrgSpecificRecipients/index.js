import { MultiSelect } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React, { useMemo } from 'react';

import CustomSelect from '../../../../../../../../common/CustomSelect';
import useGetOrganizations from '../../../../../../../../hooks/useGetOrganizations';
import useGetOrgUsers from '../../../../../../../../hooks/useGetOrgUsers';
import getAllowedEmailsList from '../../../../../../../../utils/getAllowedEmailsList';

import CustomSelectHeader from './CustomSelectHeader';
import getOrgListOptions from './getOrgListOptions';
import styles from './styles.module.css';

function RenderLabel({ item = {} }) {
	return (
		<div>
			<div className={styles.agent_label}>
				{startCase(item?.label)}
			</div>
			<div className={styles.lower_label}>
				{item?.value}
			</div>
		</div>
	);
}

function resetEmailRecipientData({
	prev = {},
	recipientTypes = [],
	orgId = '',
	orgType = '',
}) {
	let newValues = {};

	recipientTypes.forEach(
		(itm) => {
			newValues = {
				...newValues,
				[itm?.value]: [],
			};
		},
	);

	let customSubject = {
		...(prev?.customSubject || {}),
		serialId: '',
	};

	if (orgType === 'lead_organizations') {
		customSubject = {
			...(prev?.customSubject || {}),
			activeTab : 'custom',
			serialId  : 'custom',
		};
	}

	return {
		...prev,
		...newValues,
		customSubject,
		orgData: {
			orgType: orgType || prev?.orgData?.orgType,
			orgId,
		},
	};
}

function OrgSpecificRecipients({
	type = '',
	setEmailState = () => {},
	emailRecipientType = [],
	recipientTypes = [],
	emailState = {},
}) {
	const {
		orgLoading = false,
		orgData = {},
		initialLoad = false,
	} = useGetOrgUsers({
		orgId   : emailState?.orgData?.orgId || emailState?.orgId,
		orgType : emailState?.orgData?.orgType || 'organizations',
	});

	const {
		organizationData = {},
		setQuery,
		setSearchQuery,
		initialLoad: orgInitialLoad = false,
		organizationsLoading = false,
	} = useGetOrganizations({
		activeTab : emailState?.orgData?.orgType,
		orgId     : emailState?.orgData?.orgId || emailState?.orgId,
	});

	const selectOptions = useMemo(
		() => getOrgListOptions({
			organizationData,
		}) || null,
		[organizationData],
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
					optionsHeader={(
						<CustomSelectHeader
							activeTab={emailState?.orgData?.orgType}
							setActiveTab={handleChangeTab}
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
				options={(getAllowedEmailsList({ orgData }) || [])}
				renderLabel={(item) => <RenderLabel item={item} />}
			/>
		</div>
	);
}

export default OrgSpecificRecipients;
