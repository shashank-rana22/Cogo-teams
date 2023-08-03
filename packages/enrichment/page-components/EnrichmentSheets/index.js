import { Modal } from '@cogoport/components';

import BackToEnrichment from '../../common/BackToEnrichment';
import TableComponent from '../../common/TableComponent';

import Header from './components/Header';
import UploadDocumentModal from './components/UploadDocumentModal';
import useEnrichmentSheets from './hooks/useEnrichmentSheets';
import styles from './styles.module.css';

function EnrichmentSheets() {
	const {
		refetch = () => {},
		list = [],
		paginationData = {},
		loading = false,
		getNextPage = () => {},
		columns = [],
		debounceQuery,
		searchValue,
		setSearchValue,
		showUpload = false,
		setShowUpload = () => {},
	} = useEnrichmentSheets();

	return (
		<div>
			<BackToEnrichment />

			<div className={styles.header}>

				<div className={styles.title}>Enrichment Sheets</div>

				<Header
					debounceQuery={debounceQuery}
					searchValue={searchValue}
					setSearchValue={setSearchValue}
					setShowUpload={setShowUpload}
				/>
			</div>

			<TableComponent
				columns={columns}
				list={list}
				loading={loading}
				paginationData={paginationData}
				getNextPage={getNextPage}
			/>

			{showUpload && (
				<Modal
					size="sm"
					show={showUpload}
					onClose={() => setShowUpload(false)}
				>
					<UploadDocumentModal
						setShowUpload={setShowUpload}
						refetch={refetch}
					/>
				</Modal>
			)}

		</div>
	);
}

export default EnrichmentSheets;
