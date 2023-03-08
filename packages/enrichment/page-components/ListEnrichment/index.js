import { TabPanel, Tabs } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

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

	const router = useRouter();

	const onChangeTab = (newTab) => {
		router.push(`/enrichment?tab=${newTab}`, `/enrichment?tab=${newTab}`);

		setActiveTab(newTab);
	};

	return (
		<section>
			<div className={styles.title}>Enrichment Data</div>

			<div>
				<Tabs
					themeType="primary"
					activeTab={activeTab}
					onChange={onChangeTab}
				>
					<TabPanel name="enrichment_requests" title="Enrichment Requests">
						<LeftPanel
							list={list}
							columns={columns}
							loading={loading}
							activeTab={activeTab}
							searchValue={searchValue}
							listRefetch={listRefetch}
							getNextPage={getNextPage}
							globalFilters={globalFilters}
							debounceQuery={debounceQuery}
							setSearchValue={setSearchValue}
							paginationData={paginationData}
							setGlobalFilters={setGlobalFilters}
						/>
					</TabPanel>

					<TabPanel name="requests_sent" title="Requests Sent">
						<RightPanel
							list={list}
							columns={columns}
							loading={loading}
							activeTab={activeTab}
							setParams={setParams}
							setApiName={setApiName}
							searchValue={searchValue}
							listRefetch={listRefetch}
							getNextPage={getNextPage}
							globalFilters={globalFilters}
							debounceQuery={debounceQuery}
							setSearchValue={setSearchValue}
							paginationData={paginationData}
							setGlobalFilters={setGlobalFilters}
						/>
					</TabPanel>
				</Tabs>
			</div>
		</section>
	);
}

export default ListEnrichment;
