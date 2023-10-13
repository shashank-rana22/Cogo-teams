import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import Filters from '../common/Filters/index';
import getColumns from '../Configuration/newColumn';
import StyledTable from '../StyleTable';

function TabComponent({
	activeTab = '',
	incidentData = {},
	setFilters = () => {},
	filters = {},
	isSettlementExecutive = false,
	incidentLoading = false,
	getIncidentData = () => {},
	detailsModal = {},
	setDetailsModal = () => {},
	entityCode = '',
}) {
	const { t } = useTranslation(['incidentManagement']);
	const [isAscendingActive, setIsAscendingActive] = useState('');

	const { list = [], paginationData } = incidentData || {};

	const { total = 0, pageSize = 10 } = paginationData || {};

	const { page } = filters || {};

	const columns = getColumns({
		activeTab,
		setIsAscendingActive,
		setFilters,
		isAscendingActive,
		getIncidentData,
		t,
		detailsModal,
		setDetailsModal,
	});

	return (
		<div>
			<Filters
				onChangeFilters={setFilters}
				isSettlementExecutive={isSettlementExecutive}
				activeTab={activeTab}
				filters={filters}
				entityCode={entityCode}
			/>

			<StyledTable
				page={page}
				total={total}
				pageSize={pageSize}
				data={list}
				columns={columns}
				loading={incidentLoading}
				setFilters={setFilters}
				filters={filters}
			/>

		</div>
	);
}
export default TabComponent;
