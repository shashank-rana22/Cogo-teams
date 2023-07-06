import { Button, Pagination, Modal, Pill, Tooltip } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import EmptyState from '../../../commons/EmptyState';
import StyledTable from '../../../commons/StyledTable';
import getConstants from '../../../config/getConstants';
import FileData from '../FileData';

import styles from './style.module.css';

function FileList({
	params,
	setParams,
	data,
	loading,
}) {
	const [fileInfo, setFileInfo] = useState({
		fileId   : null,
		fileName : null,
	});

	const { STATUS_PILL_MAPPING, ICON_MAPPING } = getConstants();
	const { setSort, Component } = ICON_MAPPING[params?.sort_type];

	const columns = [
		{
			id       : 1,
			Header   : 'File Id',
			accessor : ({ id = '' }) => id,
		},
		{
			id       : 2,
			Header   : 'File Name',
			accessor : ({ file_name = '' }) => file_name,
		},
		{
			id       : 3,
			Header   : 'File Url',
			accessor : ({ file_url = '' }) => file_url,
		},
		{
			id       : 4,
			Header   : 'Status',
			accessor : ({ status = '' }) => (
				<Pill
					key={STATUS_PILL_MAPPING[status]?.label}
					size="md"
					color={STATUS_PILL_MAPPING[status]?.color}
				>
					{STATUS_PILL_MAPPING[status]?.label}
				</Pill>
			),
		},
		{
			id     : 5,
			Header : (
				<div className={styles.created_container}>
					Created at

					<Component
						onClick={() => setParams({ ...params, sort_type: setSort })}
						style={{ cursor: 'pointer', marginLeft: '4px' }}
					/>
				</div>
			),
			accessor: ({ created_at = '' }) => created_at,
		},
		{
			id       : 6,
			Header   : 'View Stats',
			accessor : ({ file_id, file_name, status = '' }) => (
				<Button
					onClick={() => {
						setFileInfo({ fileName: file_name, fileId: file_id });
					}}
					size="sm"
					type="button"
					themeType="primary"
					className={styles.btn_stats}
					disabled={!(status === 'success')}
				>
					{status === 'success' ? 'Stats'
						: (
							<Tooltip content="File is not processed." placement="bottom">
								Stats
							</Tooltip>
						)}
				</Button>
			),
		},
	];
	const data1 = [
		{
			file_name  : 'tanner',
			file_url   : 'linsley',
			status     : 'uploaded',
			created_at : '',
			id         : 2,
			file_id    : 12,
		},
		{
			file_name  : 'sagar',
			file_url   : 'asas',
			status     : 'processing',
			created_at : '',
			id         : 3,
			file_id    : 13,
		},
		{
			file_name  : 'sagar',
			file_url   : 'asas',
			status     : 'WRONG_UPLOAD',
			created_at : '',
			id         : 3,
			file_id    : 13,
		},
		{
			file_name  : 'Bhargav',
			file_url   : 'linssdsfdsfley',
			status     : 'success',
			created_at : '',
			id         : 4,
			file_id    : 14,
		},
	];

	const getNextPage = (newPage) => {
		setParams({ ...params, page: newPage });
	};

	const onClose = () => {
		setFileInfo({ fileName: null, fileId: null });
	};

	if (isEmpty(data1) && !loading) {
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
			<StyledTable columns={columns} data={data1} loading={loading} />

			<div className={styles.paginationDiv}>
				{/* {data?.total_count > 10
					? ( */}
				<Pagination
					type="table"
					currentPage={params?.page}
					totalItems={20}
					pageSize={params?.per_page}
					onPageChange={getNextPage}
				/>
				{/* ) : null} */}
			</div>

			{fileInfo.fileId && (
				<Modal id={fileInfo.fileId} size="md" show={fileInfo.fileId} onClose={onClose} placement="top">
					<Modal.Header title={fileInfo.fileName} />

					<Modal.Body>
						<FileData id={fileInfo.fileId} />
					</Modal.Body>
				</Modal>
			)}
		</>
	);
}

export default FileList;
