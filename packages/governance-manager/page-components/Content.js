/* eslint-disable no-magic-numbers */
import { Pagination } from '@cogoport/components';
import { useState } from 'react';

import useListOrganizationServices from './hooks/useListOrgnizationServices';
import ListSupplier from './ListSupplier';
import Stats from './Stats';
import StatusBar from './StatusBar';
import styles from './styles.module.css';

function Content() {
	const [currentPage, setCurrentPage] = useState(1);
	const [activeTab, setActiveTab] = useState('need_analysis');
	const [approvalStats, setApprovalStats] = useState();
	const [currentService, setCurrentService] = useState('all');

	const {
		data:supplierList,
		loading, totalCount,
	}	= 	useListOrganizationServices({
		currentPage,
		activeTab,
		setApprovalStats,
		currentService,
	});

	return (
		<>
			<h2>Governance Manager</h2>
			<Stats />
			<StatusBar
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				approvalStats={approvalStats}
				currentService={currentService}
				setCurrentService={setCurrentService}
			/>
			<ListSupplier currentPage={currentPage} supplierList={supplierList} loading={loading} />
			{
				!loading
				&& (
					<Pagination
						className={styles.pagination}
						type="number"
						currentPage={currentPage}
						totalItems={totalCount || 1}
						pageSize={10}
						onPageChange={setCurrentPage}
					/>
				)

			}
		</>
	);
}

export default Content;
