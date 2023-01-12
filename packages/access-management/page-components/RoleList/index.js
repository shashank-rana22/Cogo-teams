import { Pill, Tooltip, Pagination, Button, Table } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
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
		onChangeFilters = () => {},
		onChangeParams = () => {},
		listAuthRolesApi = {},
		redirect = () => {},
		stakeHolderType,
		setStakeHolderType,
	} = useRoleList();

	const { page = 0, page_limit: pageLimit = 0, total: totalPage = 0 } = listAuthRolesApi.data || {};

	const columns = [
		{
			Header   : 'Role Description',
			accessor : (itemData) => (
				<section className={styles.role_description_container}>
					<div className={styles.title}>{itemData?.name}</div>
					<div className={styles.subtitle}>{itemData?.remarks}</div>
				</section>
			),
		},
		{
			Header   : 'Role Type',
			accessor : (itemData) => {
				const roleType = (itemData?.role_type || '').toLowerCase() === 'default';
				return (
					<Pill className={styles.role_type_container} color={roleType ? 'blue' : 'orange'}>
						{itemData?.role_type}
					</Pill>
				);
			},
		},
		{
			Header   : 'Partner',
			accessor : (itemData) => (
				<section className={styles.partner_container}>
					{itemData?.partner?.business_name}
				</section>
			),
		},
		{
			Header   : 'Users',
			accessor : (itemData) => (
				<section className={styles.partner_container}>
					{itemData?.user_count}
				</section>
			),
		},
		{
			Header   : 'Level',
			accessor : (itemData) => (
				<section className={styles.partner_container}>
					{startCase(itemData?.hierarchy_level)}
				</section>
			),
		},
		{
			Header   : 'Functions',
			accessor : (itemData) => (
				<section>
					{itemData?.role_functions?.length <= 1 ? (
						(itemData?.role_functions || []).map((item) => (
							<Pill
								className={styles.function_head}
								style={{ margin: 5 }}
								color="red"
							>
								{item}
							</Pill>
						))
					) : (
						<div className={styles.sub_functions_container}>
							<Pill
								className={styles.function_head}
								style={{ margin: 5 }}
								color="red"
							>
								{itemData?.role_functions[0]}
							</Pill>

							<Tooltip
								content={(
									itemData?.role_functions.slice(1).map((item) => (
										<Pill
											className={styles.function_head}
											style={{ margin: 5 }}
											color="red"
										>
											{item}
										</Pill>
									))
								)}
								placement="top"
							>
								<strong>
									(+
									{/* eslint-disable-next-line no-unsafe-optional-chaining */}
									{itemData?.role_functions.length - 1}
									)
								</strong>
							</Tooltip>
						</div>
					)}
				</section>
			),
		},
		{
			Header   : 'Sub Functions',
			accessor : (itemData) => (
				<section>
					{itemData?.role_sub_functions?.length <= 1 ? (
						(itemData?.role_sub_functions || []).map((item) => (
							<Pill
								className={styles.function_head}
								style={{ margin: 5 }}
								color="green"
							>
								{item}
							</Pill>
						))
					) : (
						<div className={styles.sub_functions_container}>
							<Pill
								className={styles.function_head}
								style={{ margin: 5 }}
								color="green"
							>
								{itemData?.role_sub_functions[0]}
							</Pill>

							<Tooltip
								content={(
									itemData?.role_sub_functions.slice(1).map((item) => (
										<Pill
											className={styles.function_head}
											style={{ margin: 5 }}
											color="green"
										>
											{item}
										</Pill>
									))
								)}
								placement="top"
							>
								<strong>
									(+
									{/* eslint-disable-next-line no-unsafe-optional-chaining */}
									{itemData?.role_sub_functions.length - 1}
									)
								</strong>
							</Tooltip>
						</div>
					)}
				</section>
			),
		},
		{
			Header   : ' ',
			accessor : (itemData) => (
				<section>
					<Button themeType="secondary" onClick={() => redirect(itemData?.id)}>
						<IcMEdit style={{ marginRight: 5 }} />
						Edit
					</Button>
				</section>
			),
		},
	];

	// console.log('listAuthRolesApi.data?.list', listAuthRolesApi.data?.list);
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
							totalItems={totalPage}
							pageSize={pageLimit}
							handlePageChange={(val) => onChangeParams({ page: val })}
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
