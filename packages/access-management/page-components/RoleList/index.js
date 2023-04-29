import { Pagination, Table } from '@cogoport/components';
import React from 'react';

import useRoleList from '../../hooks/useRoleList';

import CreateRoleModal from './CreateRoleModal';
import Filters from './Filters';
import Header from './Header';
import styles from './styles.module.css';

function RoleList() {
	const {
		showCreateRoleModal = false,
		onChangeShowCreateRoleModal = () => {},
		filters = {},
		onResetFilters = () => {},
		onChangeFilters = () => {},
		onChangeParams = () => {},
		listAuthRolesApi = {},
		redirect = () => {},
		stakeHolderType,
		setStakeHolderType,
		columns,
	} = useRoleList();

	const { page = 0, page_limit: pageLimit = 0, total_count = 0 } = listAuthRolesApi.data || {};

	return (
		<section className={styles.container} id="rnp_role_list_container">
			<Header
				onChangeShowCreateRoleModal={onChangeShowCreateRoleModal}
				onChangeFilters={onChangeFilters}
				stakeHolderType={stakeHolderType}
				onResetFilters={onResetFilters}
				setStakeHolderType={setStakeHolderType}
			/>

			<section id="rnp_role_list_filters_and_list_container">
				<Filters
					filters={filters}
					onChangeFilters={onChangeFilters}
					stakeHolderType={stakeHolderType}
				/>

				<section className={styles.list_container} id="rnp_role_list_list_and_pagination_container">
					<Table
						onRowClick={(item) => redirect(item?.id)}
						className={styles.table_container}
						columns={columns}
						data={listAuthRolesApi.data?.list || []}
						loading={listAuthRolesApi.loading}
					/>
					<div className={styles.pagination_container} id="rnp_role">
						<Pagination
							type="table"
							currentPage={page}
							totalItems={total_count}
							pageSize={pageLimit}
							onPageChange={(val) => onChangeParams({ page: val })}
						/>
					</div>
				</section>
			</section>

			<CreateRoleModal
				showCreateRoleModal={showCreateRoleModal}
				onChangeShowCreateRoleModal={onChangeShowCreateRoleModal}
				redirect={redirect}
			/>
		</section>
	);
}

export default RoleList;
