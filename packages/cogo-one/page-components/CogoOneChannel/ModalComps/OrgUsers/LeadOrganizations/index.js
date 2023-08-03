import { Input } from '@cogoport/components';
import { IcMSearchdark } from '@cogoport/icons-react';
import { useState } from 'react';

import useListLeadOrganization from '../../../../../hooks/useListLeadOrganizations';
import OrganizationList from '../Organizations/OrganizationList';
import OrgUsersList from '../Organizations/OrgUserList';

import styles from './styles.module.css';

function LeadOrganizations({
	setActiveTab = () => {},
	setOpenKamContacts = () => {},
	activeOrg = '',
}) {
	const [search, setSearch] = useState('');
	const [orgDetail, setOrgDetail] = useState({
		id   : '',
		name : '',
	});
	const [showUser, setShowUser] = useState(false);

	const { id = '' } = orgDetail;

	const {
		listData = {},
		loading = false,
		handleScroll = () => {},
	} = useListLeadOrganization({ search });

	const { list = [] } = listData || {};

	return (
		<div className={styles.container}>
			{showUser ? (
				<OrgUsersList
					orgDetail={orgDetail}
					setActiveTab={setActiveTab}
					setOpenKamContacts={setOpenKamContacts}
					setOrgDetail={setOrgDetail}
					key={id}
					activeOrg={activeOrg}
					setShowUser={setShowUser}
					endPoint="get_lead_organization_users"
					filterKey="lead_organization_id"
				/>
			) : (

				<>
					<div className={styles.input_container}>
						<Input
							placeholder="search by name..."
							onChange={setSearch}
							val={search}
							size="sm"
							prefix={<IcMSearchdark />}
						/>
					</div>
					<OrganizationList
						handleScroll={handleScroll}
						loading={loading}
						list={list}
						setOrgDetail={setOrgDetail}
						orgDetail={orgDetail}
						setShowUser={setShowUser}
					/>
				</>
			)}
		</div>
	);
}

export default LeadOrganizations;
