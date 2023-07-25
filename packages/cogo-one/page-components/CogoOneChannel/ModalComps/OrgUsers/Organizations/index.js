import { AsyncSelect } from '@cogoport/forms';
import { useState } from 'react';

import OrgUsersList from '../OrgUserList';

import styles from './styles.module.css';

const ACTIVE_SERVICE_MAPPING = {
	organization: {
		asynKey   : 'organizations',
		endPoint  : 'list_organization_users',
		filterKey : 'organization_id',
	},
	lead_organization: {
		asynKey   : 'list_lead_organizations',
		endPoint  : 'get_lead_organization_users',
		filterKey : 'lead_organization_id',
	},
};

function Organizations({ setActiveTab = () => {}, setOpenKamContacts = () => {}, activeOrg = '' }) {
	const [orgId, setOrgId] = useState('');

	const {
		asynKey,
		endPoint,
		filterKey,
	} = ACTIVE_SERVICE_MAPPING[activeOrg];

	return (
		<>
			<AsyncSelect
				asyncKey={asynKey}
				initialCall
				onChange={setOrgId}
				value={orgId}
				className={styles.container}
				placeholder="Search by serial id / business name"
				size="md"
				isClearable
			/>
			<div className={styles.org_users_styles}>
				<OrgUsersList
					orgId={orgId}
					setActiveTab={setActiveTab}
					setOpenKamContacts={setOpenKamContacts}
					setOrgId={setOrgId}
					key={orgId}
					endPoint={endPoint}
					filterKey={filterKey}
				/>
			</div>

		</>
	);
}
export default Organizations;
