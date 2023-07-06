import { Button, Pagination, Modal, Pill, Tooltip } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import EmptyState from '../../../commons/EmptyState';
import StyledTable from '../../../commons/StyledTable';
import FileData from '../FileData';

import styles from './style.module.css';

const STATUS_PILL_MAPPING = {
	uploaded: {
		label : 'Uploaded',
		color : 'yellow',
	},

	processing: {
		label : 'Processing',
		color : 'blue',
	},
	WRONG_UPLOAD: {
		label : 'Wrong Upload',
		color : 'red',
	},
	WRONG_DOING: {
		label : 'Wrong Doing',
		color : 'red',
	},
	success: {
		label : 'Processed',
		color : 'green',
	},
};

function FileList({
	params,
	setParams,
	data,
	loading,
}) {
	const [fileId, setFileId] = useState(null);
	const [fileName, setFileName] = useState(null);

	const onClose = () => {
		setFileId(null);
	};

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
					<div>Created at</div>
					{params?.sort_type === 'asc'
						? (
							<IcMArrowRotateDown
								onClick={() => setParams({ ...params, sort_type: 'desc' })}
								style={{ cursor: 'pointer', marginLeft: '4px' }}
							/>
						)
						: (
							<IcMArrowRotateUp
								onClick={() => setParams({ ...params, sort_type: 'asc' })}
								style={{ cursor: 'pointer', marginLeft: '4px' }}
							/>
						)}
				</div>
			),
			accessor: ({ created_at = '' }) => created_at,
		},
		{
			id       : 6,
			Header   : 'View stats',
			accessor : ({ file_id, file_name = '', status = '' }) => (
				<Button
					onClick={() => {
						setFileId(file_id); setFileName(file_name);
					}}
					size="sm"
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
			{fileId && (
				<Modal id={fileId} size="md" show={fileId} onClose={onClose} placement="top">
					<Modal.Header title={fileName} />
					<Modal.Body><FileData id={fileId} /></Modal.Body>
				</Modal>
			)}
		</>
	);
}

export default FileList;
