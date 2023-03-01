import { Modal, Pagination } from '@cogoport/components';
import { useState } from 'react';

import Header from './Header';
import List from './List';
import Statistics from './Statistics';
import styles from './styles.module.css';
import UploadDocumentModal from './UploadDocumentModal';

function Enrichment(props) {
	const {
		list,
		loading,
		paginationData,
		columns,
		getNextPage,
		activeTab,
		showStatistics,
		globalFilters,
		setGlobalFilters,
		debounceQuery,
		searchValue,
		setSearchValue,
		listRefetch = () => {},
	} = props;

	const { page = 1, total_count = 1, page_limit = 10 } = paginationData;

	const [showUpload, setShowUpload] = useState(false);

	return (
		<div>
			<Header
				filters={globalFilters}
				onChangeFilters={setGlobalFilters}
				activeTab={activeTab}
				debounceQuery={debounceQuery}
				searchValue={searchValue}
				setSearchValue={setSearchValue}
				setShowUpload={setShowUpload}
			/>

			{showStatistics && <Statistics />}

			<List columns={columns} list={list} loading={loading} />

			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={getNextPage}
				/>
			</div>

			{showUpload && (
				<Modal
					size="sm"
					show={showUpload}
					onClose={() => setShowUpload(false)}
				>
					<UploadDocumentModal
						setShowUpload={setShowUpload}
						refetch={listRefetch}
					/>
				</Modal>
			)}

		</div>
	);
}

export default Enrichment;
