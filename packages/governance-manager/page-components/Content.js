import { Pagination } from '@cogoport/components';
import { useState } from 'react';

import useListOrganizationServices from './hooks/useLIstOrgnizationServices';
import ListSupplier from './ListSupplier';
import Stats from './Stats';
import StatusBar from './StatusBar';
import styles from './styles.module.css';

function Content() {
	const [currentPage, setCurrentPage] = useState(1);
	const [activeTab, setActiveTab] = useState('need_analysis');
	const [approvalStats, setApprovalStats] = useState({});
	const {
		data:supplierList,
		loading, totalCount,
	}	= 	useListOrganizationServices({
		currentPage,
		activeTab,
		setApprovalStats,
	});

	return (
		<>
			<h2>Governance Manager</h2>
			<Stats />
			<StatusBar
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				approvalStats={approvalStats}
			/>
			<ListSupplier currentPage={currentPage} supplierList={supplierList} loading={loading} />
			{
				!loading
				&& (
					<Pagination
						className={styles.pagination}
						type="number"
						currentPage={currentPage}
						totalItems={totalCount}
						pageSize={10}
						onPageChange={setCurrentPage}
					/>
				)

			}
		</>
	);
}

export default Content;
