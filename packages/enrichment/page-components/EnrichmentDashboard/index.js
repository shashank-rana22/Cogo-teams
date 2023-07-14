import { TabPanel, Tabs } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import ScopeSelect from '@cogoport/scope-select';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import useEnrichmentDashboard from './hooks/useEnrichmentDashboard';
import styles from './styles.module.css';
import PRIMARY_TABS_MAPPING from './utils/primary-tabs-mapping';

function EnrichmentDashboard() {
	const [primaryTab, setPrimaryTab] = useState('manual_enrichment');

	const [secondaryTab, setSecondaryTab] = useState('active');

	const geo = getGeoConstants();

	const allowedTabs = geo.navigations.enrichment.tabs;
	const tabOptions = Object.values(PRIMARY_TABS_MAPPING);

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
		authRoleId,
	} = useEnrichmentDashboard({ primaryTab, secondaryTab, setSecondaryTab });

	return (
		<div>

			<div className={styles.scope_select}>
				<ScopeSelect size="md" />
			</div>

			<div>
				<Tabs
					activeTab={primaryTab}
					onChange={setPrimaryTab}
					themeType="secondary"
					className={styles.tabs}
				>
					{(tabOptions || []).map((option) => {
						const { key = '', containerComponent: ContainerComponent = null } = option;

						if ((!ContainerComponent) || !allowedTabs.includes(key)) return null;

						return (
							<TabPanel
								name={key}
								key={key}
								title={startCase(key)}
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
									authRoleId={authRoleId}
								/>
							</TabPanel>
						);
					})}

				</Tabs>
			</div>

		</div>
	);
}

export default EnrichmentDashboard;
