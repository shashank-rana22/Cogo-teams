import { Pagination, TabPanel, Tabs } from '@cogoport/components';

import EnrichmentTable from '../EnrichmentTable';
import Header from '../Header';
import Statistics from '../Statistics';

import styles from './styles.module.css';

function PrimaryTabs(props) {
	const {
		activeTab = '',
		setActiveTab = () => {},
		paginationData = {},
		loading = false,
		columns = [],
		getNextPage = () => {},
		list = [],
		secondaryTab = '',
		setSecondaryTab = () => {},
		filters,
		onChangeFilters,
		debounceQuery,
		searchValue,
		setSearchValue,
	} = props;

	const { page = 1, total_count = 1, page_limit = 10 } = paginationData;
	return (
		<div style={{ marginTop: 30 }}>
			<Tabs
				activeTab={activeTab}
				themeType="secondary"
				onChange={setActiveTab}
			>
				<TabPanel name="enrichment_requests" title="Enrichment Requests">

					<Header
						filters={filters}
						onChangeFilters={onChangeFilters}
						activeTab={activeTab}
						secondaryTab={secondaryTab}
						debounceQuery={debounceQuery}
						searchValue={searchValue}
						setSearchValue={setSearchValue}
					/>

					<Statistics />

					<EnrichmentTable
						columns={columns}
						list={list}
						loading={loading}
						paginationData={paginationData}
					/>

					<div className={styles.pagination_container}>
						<Pagination
							type="table"
							currentPage={page}
							totalItems={total_count}
							pageSize={page_limit}
							onPageChange={getNextPage}
						/>
					</div>
				</TabPanel>

				<TabPanel name="requests_sent" title="Requests Sent">

					<div className={styles.secondary_tabs}>
						<Tabs
							activeTab={secondaryTab}
							themeType="secondary"
							onChange={setSecondaryTab}
						>
							<TabPanel name="submitted_requests" title="Submitted Requests">

								<Header
									filters={filters}
									onChangeFilters={onChangeFilters}
									activeTab={activeTab}
									secondaryTab={secondaryTab}
									debounceQuery={debounceQuery}
									searchValue={searchValue}
									setSearchValue={setSearchValue}

								/>

								<EnrichmentTable
									columns={columns}
									list={list}
									loading={loading}
									paginationData={paginationData}
								/>

								<div className={styles.pagination_container}>
									<Pagination
										type="table"
										currentPage={page}
										totalItems={total_count}
										pageSize={page_limit}
										onPageChange={getNextPage}
									/>
								</div>

							</TabPanel>
							<TabPanel name="uploaded_files" title="Uploaded Files">
								<Header
									filters={filters}
									onChangeFilters={onChangeFilters}
									activeTab={activeTab}
									secondaryTab={secondaryTab}
									debounceQuery={debounceQuery}
									searchValue={searchValue}
									setSearchValue={setSearchValue}
								/>

								<EnrichmentTable
									columns={columns}
									list={list}
									loading={loading}
									paginationData={paginationData}
								/>

								<div className={styles.pagination_container}>
									<Pagination
										type="table"
										currentPage={page}
										totalItems={total_count}
										pageSize={page_limit}
										onPageChange={getNextPage}
									/>
								</div>
							</TabPanel>

						</Tabs>

					</div>

				</TabPanel>

			</Tabs>
		</div>
	);
}

export default PrimaryTabs;
