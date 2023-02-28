import { TabPanel, Tabs, Modal } from '@cogoport/components';

import { tabPanelMapping } from '../../configurations/tab-panels-mapping';

import Enrichment from './components/Enrichment';
import UploadDocumentModal from './components/UploadDocumentModal';
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
		selectedItem,
		setSelectedItem,
		activeTab,
		setActiveTab,
		secondaryTab,
		setSecondaryTab,
		globalFilters,
		setGlobalFilters,
		debounceQuery,
		searchValue,
		setSearchValue,
	} = useListEnrichment();

	return (

		<>
			<div className={styles.title}>Enrichment Data</div>

			<div style={{ marginTop: 30 }}>
				<Tabs
					activeTab={activeTab}
					themeType="primary"
					onChange={setActiveTab}
				>
					<TabPanel name="enrichment_requests" title="Enrichment Requests">

						<Enrichment
							list={list}
							loading={loading}
							paginationData={paginationData}
							columns={columns}
							getNextPage={getNextPage}
							activeTab={activeTab}
							secondaryTab={secondaryTab}
							globalFilters={globalFilters}
							setGlobalFilters={setGlobalFilters}
							debounceQuery={debounceQuery}
							searchValue={searchValue}
							setSearchValue={setSearchValue}

						/>
					</TabPanel>

					<TabPanel name="requests_sent" title="Requests Sent">

						<div className={styles.secondary_tabs}>
							<Tabs
								activeTab={secondaryTab}
								themeType="secondary"
								onChange={setSecondaryTab}
							>

								{Object.values(tabPanelMapping).map((item) => (

									<TabPanel name={item.name} title={item.title}>

										<Enrichment
											list={list}
											loading={loading}
											paginationData={paginationData}
											columns={columns}
											getNextPage={getNextPage}
											activeTab={activeTab}
											secondaryTab={secondaryTab}
											globalFilters={globalFilters}
											setGlobalFilters={setGlobalFilters}
											debounceQuery={debounceQuery}
											searchValue={searchValue}
											setSearchValue={setSearchValue}
										/>

									</TabPanel>
								))}

							</Tabs>

						</div>

					</TabPanel>

				</Tabs>
			</div>

			<Modal
				show={selectedItem}
				size="sm"
				onClose={() => setSelectedItem(null)}
			>
				<UploadDocumentModal
					selectedItem={selectedItem}
					setSelectedItem={setSelectedItem}
					refetch={listRefetch}
				/>

			</Modal>

		</>

	);
}

export default ListEnrichment;
