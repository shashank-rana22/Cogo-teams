/* eslint-disable no-magic-numbers */
import { useState } from 'react';

import useListOrganizationServices from './hooks/useListOrgnizationServices';
import ListSupplier from './ListSupplier';
import Stats from './Stats';
import StatusBar from './StatusBar';

function Content() {
	const [currentPage, setCurrentPage] = useState(1);
	const [activeTab, setActiveTab] = useState('need_analysis');
	const [approvalStats, setApprovalStats] = useState(null);
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
			<ListSupplier
				currentPage={currentPage}
				supplierList={supplierList}
				loading={loading}
				totalCount={totalCount}
				setCurrentPage={setCurrentPage}
			/>
		</>
	);
}

export default Content;
