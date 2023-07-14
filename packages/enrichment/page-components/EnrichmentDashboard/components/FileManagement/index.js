import { Modal } from '@cogoport/components';
import { useState } from 'react';

import Header from '../../commons/Header';
import TableComponent from '../../commons/TableComponent';

import UploadDocumentModal from './UploadDocumentModal';

function FileManagement(props) {
	const {
		refetch = () => {},
		list = [],
		paginationData = {},
		loading = false,
		setParams = () => {},
		getNextPage = () => {},
		columns = [],
		debounceQuery,
		searchValue,
		setSearchValue,
		primaryTab = '',
	} = props;

	const [showUpload, setShowUpload] = useState(false);

	return (
		<div>

			<Header
				refetch={refetch}
				debounceQuery={debounceQuery}
				searchValue={searchValue}
				setSearchValue={setSearchValue}
				setShowUpload={setShowUpload}
				setParams={setParams}
				primaryTab={primaryTab}
			/>

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

export default FileManagement;
