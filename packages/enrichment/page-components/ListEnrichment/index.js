import { Modal, Pagination } from '@cogoport/components';
import { useState } from 'react';

import EnrichmentModal from './components/EnrichmentModal';
import EnrichmentTable from './components/EnrichmentTable';
import Header from './components/Header';
import PrimaryTabs from './components/PrimaryTabs';
// import Statistics from './components/Statistics';
import useListEnrichment from './hooks/useListEnrichment';
import styles from './styles.module.css';

function ListEnrichment() {
	const [activeTab, setActiveTab] = useState('enrichment_requests');

	const {
		list = [],
		// params,
		// setParams,
		loading = false,
		listRefetch,
		paginationData = {},
		// getNextPage,
		columns = [],
		// listItem,
		getNextPage = () => {},
		enrichmentItem,
		setEnrichmentItem,
	} = useListEnrichment();

	const { page = 1, total_count = 1, page_limit = 10 } = paginationData;

	return (

		<>
			<div className={styles.title}>Enrichment Data</div>

			<PrimaryTabs activeTab={activeTab} setActiveTab={setActiveTab} />

			<Header
				activeTab={activeTab}
				setActiveTab={setActiveTab}
			/>

			{/* <Statistics /> */}

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
