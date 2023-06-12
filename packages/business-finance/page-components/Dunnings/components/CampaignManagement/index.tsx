import React, { useState } from 'react';

import CustomList from '../../../commons/CustomList';

import { dummyData } from './dummyData';
import FilterHeaders from './FilterHeaders';
import { listConfig } from './listConfig';
import RenderActions from './RenderActions';
import RenderViewMore from './RenderViewMore';
import ShowMore from './ShowMore';

function CampaignManagement() {
	const [globalFilters, setGlobalFilters] = useState({});
	const [dropdown, setDropdown] = useState('');

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

		</div>
	);
}

export default CampaignManagement;
