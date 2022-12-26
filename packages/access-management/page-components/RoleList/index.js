import React from 'react';

import useRoleList from '../../hooks/useRoleList';

// import CreateRoleModal from './CreateRoleModal';
import Filters from './Filters';
import Header from './Header';
import List from './List';
// import Pagination from './Pagination';
import styles from './styles.module.css';

function RoleList() {
	const {
		showCreateRoleModal = false,
		onChangeShowCreateRoleModal = () => {},
		filters = {},
		onChangeFilters = () => {},
		onChangeParams = () => {},
		listAuthRolesApi = {},
		redirect = () => {},
		stakeHolderType,
		setStakeHolderType,
	} = useRoleList();

	return (
		<section className={styles.container} id="rnp_role_list_container">
			<Header
				onChangeShowCreateRoleModal={onChangeShowCreateRoleModal}
				onChangeFilters={onChangeFilters}
				stakeHolderType={stakeHolderType}
				setStakeHolderType={setStakeHolderType}
			/>

			<section id="rnp_role_list_filters_and_list_container">
				<Filters
					filters={filters}
					onChangeFilters={onChangeFilters}
					stakeHolderType={stakeHolderType}
				/>

				<section className={styles.list_container} id="rnp_role_list_list_and_pagination_container">
					<List listAuthRolesApi={listAuthRolesApi} redirect={redirect} />

					{/* <Pagination */}
					{/* 	listAuthRolesApi={listAuthRolesApi} */}
					{/* 	onChangeParams={onChangeParams} */}
					{/* /> */}
				</section>
			</section>

			{/* <CreateRoleModal */}
			{/* 	showCreateRoleModal={showCreateRoleModal} */}
			{/* 	onChangeShowCreateRoleModal={onChangeShowCreateRoleModal} */}
			{/* 	redirect={redirect} */}
			{/* /> */}
		</section>
	);
}

export default RoleList;
