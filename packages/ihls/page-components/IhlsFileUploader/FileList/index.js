import { Button, Pagination, Modal, Pill, Tooltip } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

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
	const [show, setShow] = useState(false);
	const onClose = () => {
		setShow(!show);
	};

	const [fileId, setFileId] = useState();
	const [fileName, setFileName] = useState();

	const columns = [
		{
			id       : 1,
			Header   : 'File Id',
			accessor : ({ id }) => id || '',
		},
		{
			id       : 2,
			Header   : 'File Name',
			accessor : ({ file_name }) => file_name || '',
		},
		{
			id       : 3,
			Header   : 'File Url',
			accessor : ({ file_url }) => file_url || '',
		},
		{
			id       : 4,
			Header   : 'Status',
			accessor : ({ status }) => (
				<Pill
					key={STATUS_PILL_MAPPING[status]?.label}
					// prefix={item.prefixIcon}
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
			accessor: ({ created_at }) => created_at || '',
		},
		{
			id       : 6,
			Header   : 'View stats',
			accessor : ({ file_id, file_name, status }) => {
				if (status === 'success') {
					return (
						<Button
							onClick={() => { setShow(true); setFileId(file_id); setFileName(file_name); }}
							size="sm"
							themeType="primary"
							className={styles.btn_stats}
							disabled={!(status === 'success')}
						>
							Stats
						</Button>
					);
				}

				return (
					<Button
						onClick={() => { setShow(true); setFileId(file_id); setFileName(file_name); }}
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
				);
			},
		},
	];
	const data1 = [
		{
			file_name  : 'tanner',
			file_url   : 'linsley',
			status     : 'uploaded',
			created_at : '',
			id         : 2,
		},
		{
			file_name  : 'sagar',
			file_url   : 'asas',
			status     : 'processing',
			created_at : '',
			id         : 3,
		},
		{
			file_name  : 'Bhargav',
			file_url   : 'linssdsfdsfley',
			status     : 'success',
			created_at : '',
			id         : 4,
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
					emptyText="No records found"
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
			<Modal size="md" show={show} onClose={onClose} placement="top">
				<Modal.Header title={fileName} />
				<FileData id={fileId} />
			</Modal>
		</>
	);
}

export default FileList;
