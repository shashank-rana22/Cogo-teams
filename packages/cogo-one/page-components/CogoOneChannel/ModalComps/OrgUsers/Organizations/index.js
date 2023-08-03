import { Input } from '@cogoport/components';
import { IcMSearchdark } from '@cogoport/icons-react';
import { useState } from 'react';

import useListOrganization from '../../../../../hooks/useListOrganizations';

import OrganizationList from './OrganizationList';
import OrgUsersList from './OrgUserList';
import styles from './styles.module.css';

function Organizations({
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
	} = useListOrganization({ search });

	const { list = [] } = listData || {};

	return (
		<div className={styles.org_container}>
			{showUser ? (
				<OrgUsersList
					orgDetail={orgDetail}
					setActiveTab={setActiveTab}
					setOpenKamContacts={setOpenKamContacts}
					key={id}
					activeOrg={activeOrg}
					setShowUser={setShowUser}
					endPoint="list_organization_users"
					filterKey="organization_id"
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
						list={list}
						loading={loading}
						handleScroll={handleScroll}
						setOrgDetail={setOrgDetail}
						orgDetail={orgDetail}
						setShowUser={setShowUser}
					/>
				</>
			)}
		</div>
	);
}
export default Organizations;
