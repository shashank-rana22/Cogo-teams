import { TabPanel, Tabs } from '@cogoport/components';

import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import useListEnrichment from './hooks/useListEnrichment';
import styles from './styles.module.css';

function ListEnrichment() {
	const {
		list,
		loading,
		listRefetch,
		paginationData,
		columns,
		getNextPage,
		activeTab,
		setActiveTab,
		globalFilters,
		setGlobalFilters,
		debounceQuery,
		searchValue,
		setSearchValue,
		setApiName,
		setParams,
	} = useListEnrichment();

	return (

		<section>
			<div className={styles.title}>Enrichment Data</div>

			<div>
				<Tabs
					activeTab={activeTab}
					themeType="primary"
					onChange={setActiveTab}
				>
					<TabPanel name="enrichment_requests" title="Enrichment Requests">

						<LeftPanel
							list={list}
							loading={loading}
							paginationData={paginationData}
							columns={columns}
							getNextPage={getNextPage}
							activeTab={activeTab}
							globalFilters={globalFilters}
							setGlobalFilters={setGlobalFilters}
							debounceQuery={debounceQuery}
							searchValue={searchValue}
							setSearchValue={setSearchValue}
							listRefetch={listRefetch}
						/>

					</TabPanel>

					<TabPanel name="requests_sent" title="Requests Sent">

						<RightPanel
							list={list}
							loading={loading}
							paginationData={paginationData}
							columns={columns}
							getNextPage={getNextPage}
							activeTab={activeTab}
							globalFilters={globalFilters}
							setGlobalFilters={setGlobalFilters}
							debounceQuery={debounceQuery}
							searchValue={searchValue}
							setSearchValue={setSearchValue}
							setApiName={setApiName}
							setParams={setParams}
						/>

					</TabPanel>

				</Tabs>
			</div>
		</section>

	);
}

export default ListEnrichment;
