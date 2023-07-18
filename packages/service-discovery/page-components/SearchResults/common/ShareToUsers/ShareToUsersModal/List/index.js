import { Toggle, Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';

import useGetShareUserList from '../../../../hooks/getShareUserList';

import styles from './styles.module.css';
import UsersCard from './UsersCard';

function ShareInviteUsers({ selectedId, setSelectedUser, org_id }) {
	const {
		loading,
		list,
		search,
		handleSearch,
		typeOfUsers = 'active',
		setTypeOfUsers,
	} = useGetShareUserList({ org_id });

	const onSearch = (value) => {
		handleSearch(value);
	};

	return (
		<>
			<Input
				prefix={<IcMSearchlight height="14px" width="14px" />}
				value={search}
				onChange={onSearch}
				placeholder="Search by Name / Email"
			/>

			<div className={styles.toggle_container}>
				<Toggle
					offLabel="Inactive"
					onLabel="Active"
					value={typeOfUsers}
					name="toggle"
					onChange={(e) => {
						setTypeOfUsers(e.target.checked ? 'invited' : 'active');
					}}
				/>
			</div>

			<div className={styles.container}>

				{!loading
					&& list.map((user) => (
						<UsersCard
							key={user.id}
							isSelected={selectedId === user.id}
							onClick={setSelectedUser}
							user={user}
						/>
					))}

				{!list.length && !loading ? (
					<div className={styles.empty_text}>
						No Users Found
					</div>
				) : null}
			</div>
		</>
	);
}

export default ShareInviteUsers;
