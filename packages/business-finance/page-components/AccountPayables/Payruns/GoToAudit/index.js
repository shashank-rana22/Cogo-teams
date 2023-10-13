import { Toggle } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import List from '../../../commons/List/index';
import useGetAudit from '../hooks/useGetAudit';

import AuditHeader from './AuditHeader';
import FooterCard from './FooterCard';
import renderFunction from './renderFunction';
import styles from './styles.module.css';

const FIRST_PAGE = 1;

function GoToAudit() {
	const { query } = useRouter();
	const handleVersionChange = () => {
		window.location.href = `/${query.partner_id}/business-finance/account-payables/audit/${query.payrun_id}`;
	};

	const [remarks, setRemarks] = useState([]);
	const {
		loading = false,
		auditData = {},
		config = {},
		setGlobalFilters = () => {},
		globalFilters = {},
		updateInvoice = () => {},
		updateLoading = false,
	} = useGetAudit();

	const { list = [], totalNumberOfInvoices = 0 } = auditData || {};
	const pickNameFromElement = (list || [])[GLOBAL_CONSTANTS.zeroth_index]?.name || 'No Payrun Found';

	const { functions = {} } = renderFunction({ remarks, setRemarks, updateInvoice, updateLoading });

	return (
		<>
			<div className={styles.div_container}>
				<div className={styles.heading}>Account Payables</div>

				<Toggle
					name="toggle"
					size="md"
					onLabel="Old"
					offLabel="New"
					onChange={handleVersionChange}
				/>
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

		</>
	);
}
export default GoToAudit;
