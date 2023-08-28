import { Pagination } from '@cogoport/components';
import React from 'react';

import StyledTable from '../../commons/styledTable/index.tsx';
import organizationColumn from '../../configs/OrganizationUserTable';
import useGetOrganizationUsers from '../../hooks/useGetOrganizationUsers';

import styles from './styles.module.css';

function Users({ selfOrganizationId = '', orgData = {} }) {
	const { organizationData, param, setParam, loading } = useGetOrganizationUsers({
		selfOrganizationId,
	});

	const { list = [], page, totalRecords } = organizationData || {};

	return (
		<div>
			<StyledTable
				data={list}
				columns={organizationColumn({ orgData })}
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
