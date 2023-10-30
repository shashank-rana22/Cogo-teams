import { Pagination } from '@cogoport/components';
import React from 'react';

import StyledTable from '../../../../../commons/styledTable';
import OrganizationColumn from '../../../../../configs/OrganizationUserTable';
import useGetOrganizationUsers from '../../../../../hooks/useGetOrganizationUsers';

import styles from './styles.module.css';

function Users({ selfOrganizationId = '', orgData = {} }) {
	const { organizationData, param, setParam, loading } =	useGetOrganizationUsers({
		selfOrganizationId,
	});

	const { list = [], page, totalRecords, total_count: totalCount } = organizationData || {};

	return (
		<div>
			<StyledTable
				data={list}
				columns={OrganizationColumn({ orgData })}
				loading={loading}
			/>

			{totalCount >= param.page_limit
				? (
					<div className={styles.pagination_container}>
						<Pagination
							type="table"
							currentPage={page}
							totalItems={totalRecords}
							pageSize={param.page_limit}
							onPageChange={(val) => setParam({ ...param, page: val })}
						/>
					</div>
				)
				: null}
		</div>
	);
}

export default Users;
