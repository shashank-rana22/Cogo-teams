import { Pagination, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import EmptyState from '../../../../commons/EmptyState';
import StyledTable from '../../../../commons/StyledTable';
import FileData from '../FileData';

import getColumns from './columns';
import styles from './style.module.css';

function FileList({
	params = {},
	setParams = () => {},
	fileListData = {},
	fileListLoading = false,
}) {
	const [fileInfo, setFileInfo] = useState({
		fileId   : null,
		fileName : null,
	});

	const { data = {}, count = 0 } = fileListData;

	const { columns } = getColumns({ params, setParams, setFileInfo });

	const getNextPage = (newPage) => {
		setParams({ ...params, page: newPage });
	};

	const onClose = () => {
		setFileInfo({ fileName: null, fileId: null });
	};

	if (isEmpty(data) && !fileListLoading) {
		return (
			<div className={styles.empty_container}>
				<EmptyState
					height={280}
					width={440}
					emptyText="No files found"
					textSize="24px"
					flexDirection="column"
				/>
			</div>
		);
	}

	return (
		<>
			<StyledTable columns={columns} data={data} loading={fileListLoading} />

			<div className={styles.paginationDiv}>
				{count > params?.per_page
					? (
						<Pagination
							type="number"
							currentPage={params?.page}
							totalItems={count}
							pageSize={params?.per_page}
							onPageChange={getNextPage}
						/>
					) : null}
			</div>

			{fileInfo.fileId && (
				<Modal size="md" show={fileInfo.fileId} onClose={onClose} placement="top">
					<Modal.Header title={(<div className={styles.file_name}>{fileInfo.fileName}</div>)} />

					<Modal.Body>
						<FileData id={fileInfo.fileId} />
					</Modal.Body>
				</Modal>
			)}
		</>
	);
}

export default FileList;
