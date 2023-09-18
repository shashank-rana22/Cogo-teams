import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import LeadTable from '../../commons/LeadTable';
import useGetLeadEnrichmentLogs from '../../hooks/useGetLeadEnrichmentLogs';

import getEnrichmentColumns from './getEnrichmentLogs';
import styles from './styles.module.css';

function EnrichmentInfo({ lead_id = null }) {
	const columns = getEnrichmentColumns();
	const {
		loading,
		response,
		params,
		setParams,
		paginationData,
	} = useGetLeadEnrichmentLogs({ lead_id });

	const onPageChange = (newPage) => {
		setParams({ ...params, page: newPage });
	};
	return (
		<div className={styles.container}>
			<LeadTable columns={columns} data={response} loading={loading} height={200} width={300} />
			{!loading && !isEmpty(response)
				&& (
					<div className={styles.pagination}>
						<Pagination
							type="number"
							currentPage={paginationData?.page}
							totalItems={paginationData?.count}
							pageSize={paginationData?.page_limit}
							onPageChange={onPageChange}
						/>
					</div>
				)}
		</div>
	);
}

export default EnrichmentInfo;
