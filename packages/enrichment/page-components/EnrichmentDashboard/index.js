import { TabPanel, Tabs } from '@cogoport/components';
import { useState } from 'react';

import useEnrichmentDashboard from './hooks/useEnrichmentDashboard';
import PRIMARY_TABS_MAPPING from './utils/primary-tabs-mapping';

function EnrichmentDashboard() {
	const [primaryTab, setPrimaryTab] = useState('manual_enrichment');

	const [secondaryTab, setSecondaryTab] = useState('active');

	const options = Object.values(PRIMARY_TABS_MAPPING);

	const {
		refetch,
		list,
		paginationData,
		loading,
		setParams,
		getNextPage,
		columns = [],
		debounceQuery,
		searchValue,
		setSearchValue,
	} = useEnrichmentDashboard({ primaryTab, secondaryTab, setSecondaryTab });

	return (
		<div>
			<Tabs
				activeTab={primaryTab}
				onChange={setPrimaryTab}
				themeType="secondary"
			>
				{(options || []).map((option) => {
					const { key = '', title = '', containerComponent: ContainerComponent = null } = option;

					if (!ContainerComponent) return null;

					return (
						<TabPanel
							name={key}
							key={key}
							title={title}
						>
							<ContainerComponent
								refetch={refetch}
								list={list}
								paginationData={paginationData}
								loading={loading}
								setParams={setParams}
								getNextPage={getNextPage}
								columns={columns}
								primaryTab={primaryTab}
								debounceQuery={debounceQuery}
								searchValue={searchValue}
								setSearchValue={setSearchValue}
								secondaryTab={secondaryTab}
								setSecondaryTab={setSecondaryTab}
							/>
						</TabPanel>
					);
				})}

			</Tabs>
		</div>
	);
}

export default EnrichmentDashboard;
