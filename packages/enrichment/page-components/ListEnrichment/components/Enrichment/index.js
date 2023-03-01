import { Modal, Pagination } from '@cogoport/components';
import { useState } from 'react';

import Header from '../Header';
import Statistics from '../Statistics';
import UploadDocumentModal from '../UploadDocumentModal';

import List from './List';
import styles from './styles.module.css';

function Enrichment(props) {
	const {
		list,
		loading,
		paginationData,
		columns,
		getNextPage,
		activeTab,
		secondaryTab,
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
				secondaryTab={secondaryTab}
				debounceQuery={debounceQuery}
				searchValue={searchValue}
				setSearchValue={setSearchValue}
				setShowUpload={setShowUpload}
			/>

			{secondaryTab !== 'uploaded_files' && <Statistics />}

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
