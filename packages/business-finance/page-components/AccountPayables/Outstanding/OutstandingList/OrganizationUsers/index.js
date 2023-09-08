import { Pagination } from '@cogoport/components';
import React from 'react';

import StyledTable from '../../commons/styledTable/index.tsx';
import organizationColumn from '../../configs/OrganizationUserTable';
import useGetOrganizationUsers from '../../hooks/useGetOrganizationUsers';

import styles from './styles.module.css';

function Users({ organizationId = '', setStats = () => {} }) {
	const { organizationData = {}, param = {}, setParam = () => { }, loading = false } = useGetOrganizationUsers({
		organizationId,
		setStats,
	});

	const { list = [], page = 1, totalRecords = 10 } = organizationData || {};

	return (
		<div>
			<StyledTable
				data={list}
				columns={organizationColumn}
				loading={loading}
			/>

			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={totalRecords}
					pageSize={param.page_limit}
					onPageChange={(val) => setParam({ ...param, page: val })}
				/>
			</div>
		</div>
	);
}

export default Users;
