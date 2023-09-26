import { MultiSelect } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';
import React from 'react';

import useGetOrgUsers from '../../../../../../../../hooks/useGetOrgUsers';
import getAllowedEmailsList from '../../../../../../../../utils/getAllowedEmailsList';

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

function OrgSpecificRecipients({
	orgId = '',
	setOrgId = () => {},
	type = '',
	setEmailState = () => {},
	emailRecipientType = [],
	recipientTypes = [],
}) {
	const { orgLoading = false, orgData = {} } = useGetOrgUsers({ orgId });

	const handleChange = (val) => {
		setOrgId(val);

		setEmailState(
			(prev) => {
				let newValues = {};

				recipientTypes.forEach(
					(itm) => {
						newValues = {
							...newValues,
							[itm?.value]: [],
						};
					},
				);

				return { ...prev, ...newValues };
			},
		);
	};

	return (
		<div className={styles.container}>
			{type === 'toUserEmail' ? (
				<AsyncSelect
					className={styles.org_select}
					placeholder="Search organization"
					asyncKey="organizations"
					isClearable
					initialCall
					value={orgId}
					onChange={handleChange}
					size="sm"
				/>
			) : null}

			<MultiSelect
				className={type === 'toUserEmail' ? styles.users_select : styles.users_cc_select}
				placeholder="Search user"
				isClearable
				value={emailRecipientType}
				onChange={(val) => setEmailState(
					(prev) => ({ ...prev, [type]: val }),
				)}
				disabled={!orgId || orgLoading}
				size="sm"
				multiple
				options={(getAllowedEmailsList({ orgData }) || [])}
				renderLabel={(item) => <RenderLabel item={item} />}
			/>
		</div>
	);
}

export default OrgSpecificRecipients;
