import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState } from 'react';

import List from '../../../commons/List/index.tsx';
import useGetAudit from '../hooks/useGetAudit';

import AuditHeader from './AuditHeader';
import FooterCard from './FooterCard';
import renderFunction from './renderFunction';
import styles from './styles.module.css';

function GoToAudit() {
	const [remarks, setRemarks] = useState({});
	const {
		loading,
		auditData,
		config,
		setGlobalFilters,
		globalFilters,
		updateInvoice,
		// updateLoading,
	} = useGetAudit();

	const { list, totalNumberOfInvoices = 0 } = auditData || {};
	const FIRST_PAGE = 1;
	const pickNameFromElement = (list || [])[GLOBAL_CONSTANTS.zeroth_index]?.name || 'No Payrun Found';

	const { functions } = renderFunction({ remarks, setRemarks, updateInvoice });

	return (
		<div>
			<div className={styles.div_container}>
				<div className={styles.heading}>Account Payables</div>
			</div>

			<AuditHeader
				totalNumberOfInvoices={totalNumberOfInvoices}
				globalFilters={globalFilters}
				payrunName={pickNameFromElement}
				setGlobalFilters={setGlobalFilters}
			/>

			<div className={styles.list_container}>
				<List
					itemData={auditData}
					loading={loading}
					config={config}
					functions={functions}
					setGlobalFilters={setGlobalFilters}
					rowStyle="border"
					showPagination
					pageSize={10}
					paginationType="number"
					page={globalFilters?.pageIndex || FIRST_PAGE}
					handlePageChange={(val) => setGlobalFilters((prev) => ({
						...prev,
						pageIndex: val,
					}))}
				/>
			</div>

			<FooterCard />
		</div>
	);
}
export default GoToAudit;
