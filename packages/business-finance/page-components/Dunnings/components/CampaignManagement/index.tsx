import React, { useState } from 'react';

import CustomList from '../../../commons/CustomList';

import CreateCycleForm from './CreateCycleForm';
import { dummyData } from './dummyData';
import FilterHeaders from './FilterHeaders';
import { listConfig } from './listConfig';
import RenderActions from './RenderActions';
import RenderViewMore from './RenderViewMore';
import ShowMore from './ShowMore';

function CampaignManagement() {
	const [globalFilters, setGlobalFilters] = useState({});
	const [dropdown, setDropdown] = useState('');
	const [showCreateForm, setShowCreateForm] = useState(false);
	const [formData, setFormData] = useState({
		triggerType   : 'oneTime',
		frequency     : 'daily',
		severityLevel : 'low',
	});

	const showDropDown = (e) => <ShowMore dropdown={dropdown} rowId={e?.id} />;

	const functions = () => ({
		renderActions :	() => <RenderActions />,
		viewMore      : ({ id }) => (
			<RenderViewMore
				id={id}
				dropdown={dropdown}
				setDropdown={setDropdown}
			/>
		),
	});

	return (
		<div>
			<div>
				<FilterHeaders
					globalFilters={globalFilters}
					setGlobalFilters={setGlobalFilters}
					setShowCreateForm={setShowCreateForm}
				/>
			</div>

			<div style={{ background: 'white' }}>
				<CustomList
					config={listConfig()}
					itemData={dummyData}
					// loading={loading || recurringListLoading}
					functions={functions()}
					// page={expenseFilters.pageIndex || 1}
					// pageSize={expenseFilters.pageSize}
					// handlePageChange={(pageValue:number) => {
					// 	setExpenseFilters((p) => ({ ...p, pageIndex: pageValue }));
					// }}
					// showPagination
					renderDropdown={showDropDown}
				/>
			</div>

			{showCreateForm && (
				<CreateCycleForm
					showCreateForm={showCreateForm}
					setShowCreateForm={setShowCreateForm}
					formData={formData}
					setFormData={setFormData}
				/>
			)}

		</div>
	);
}

export default CampaignManagement;
