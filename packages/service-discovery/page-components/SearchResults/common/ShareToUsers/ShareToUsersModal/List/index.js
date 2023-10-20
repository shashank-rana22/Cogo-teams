import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';

import useGetShareUserList from '../../../../hooks/getShareUserList';

import styles from './styles.module.css';
import UsersList from './UsersList';

function ShareInviteUsers({ selectedId = '', setSelectedUser = () => {}, org_id = '' }) {
	const {
		loading,
		list,
		search,
		handleSearch,
	} = useGetShareUserList({ org_id });

	const onSearch = (value) => {
		handleSearch(value);
	};

	return (
		<div className={styles.container}>
			<Input
				prefix={<IcMSearchlight height="14px" width="14px" />}
				value={search}
				onChange={onSearch}
				placeholder="Search by Name / Email"
			/>

			<UsersList
				loading={loading}
				list={list}
				selectedId={selectedId}
				setSelectedUser={setSelectedUser}
			/>
		</div>
	);
}

export default ShareInviteUsers;
