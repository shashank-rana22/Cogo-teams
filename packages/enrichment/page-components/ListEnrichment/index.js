import { Modal } from '@cogoport/components';

import EnrichmentModal from './components/EnrichmentModal';
import PrimaryTabs from './components/PrimaryTabs';
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
		enrichmentItem,
		setEnrichmentItem,
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

			<PrimaryTabs
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				paginationData={paginationData}
				loading={loading}
				columns={columns}
				list={list}
				getNextPage={getNextPage}
				secondaryTab={secondaryTab}
				setSecondaryTab={setSecondaryTab}
				filters={globalFilters}
				onChangeFilters={setGlobalFilters}
				debounceQuery={debounceQuery}
				searchValue={searchValue}
				setSearchValue={setSearchValue}

			/>

			{
				enrichmentItem && (

					<Modal
						show={enrichmentItem}
						size="sm"
						onClose={() => setEnrichmentItem(null)}
					>

						<EnrichmentModal
							enrichmentItem={enrichmentItem}
							setEnrichmentItem={setEnrichmentItem}
							refetch={listRefetch}
						/>

					</Modal>

				)
			}

		</>

	);
}

export default ListEnrichment;
