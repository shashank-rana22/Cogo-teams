import { Pagination } from '@cogoport/components';
import React from 'react';

import StyledTable from '../../commons/styledTable/index';
import organizationColumn from '../../configs/OrganizationUserTable';

import styles from './styles.module.css';

function Users({
	organizationData = {},
	param = {},
	setParam = () => {},
	orgLoader = false,
}) {
	const { list = [], page = 1, totalRecords = 10 } = organizationData || {};

	return (
		<div>
			<StyledTable
				data={list}
				columns={organizationColumn}
				loading={orgLoader}
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
