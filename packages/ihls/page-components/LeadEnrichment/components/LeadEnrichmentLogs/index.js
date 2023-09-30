import { Pagination, Modal, Button } from '@cogoport/components';
import { IcMEyeopen } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import LeadTable from '../../commons/LeadTable';
import useGetLeadEnrichmentLogs from '../../hooks/useGetLeadEnrichmentLogs';

import getEnrichmentColumns from './getEnrichmentLogs';
import styles from './styles.module.css';

function EnrichmentInfo({ leadId = null, setLeadId = () => {} }) {
	const columns = getEnrichmentColumns();
	const {
		loading,
		response,
		params,
		setParams,
		paginationData,
	} = useGetLeadEnrichmentLogs({ leadId });

	const onCloseLogs = () => setLeadId(null);

	const onPageChange = (newPage) => {
		setParams({ ...params, page: newPage });
	};
	return (
		<Modal style={{ width: '60%' }} show={leadId} onClose={onCloseLogs} placement="center">
			<Modal.Header title={(
				<div className={styles.modal_header}>
					<IcMEyeopen className={styles.eye_icon} />
					<span>
						Enrichment History
					</span>
				</div>
			)}
			/>
			<Modal.Body>
				<div className={styles.container}>
					{!loading && !isEmpty(response)
				&& (
					<div className={styles.pagination}>
						<Pagination
							type="table"
							currentPage={paginationData?.page}
							totalItems={paginationData?.count}
							pageSize={paginationData?.page_limit}
							onPageChange={onPageChange}
						/>
					</div>
				)}
					<LeadTable columns={columns} data={response} loading={loading} height={200} width={300} />
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={onCloseLogs}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default EnrichmentInfo;
