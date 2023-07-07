import { Button, Pagination, Modal, Pill, Tooltip, Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import EmptyState from '../../../../commons/EmptyState';
import StyledTable from '../../../../commons/StyledTable';
import ICON_MAPPING from '../../constants/getIconMapping';
import STATUS_PILL_MAPPING from '../../constants/getStatusPillMapping';
import FileData from '../FileData';

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

	const { setSort, Component } = ICON_MAPPING[params?.sort_type];

	const { data = {}, count = 0 } = fileListData;

	const onClickName = (url) => {
		if (url) {
			window.open(url, '_blank');
		} else {
			Toast.info("File can't be downloaded.");
		}
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
			accessor : ({ file_name = '', url = null }) => (
				<Tooltip interactive content={file_name} placement="bottom">
					<div
						onClick={() => onClickName(url)}
						className={styles.text_wrap}
						role="presentation"
					>
						{file_name}
					</div>
				</Tooltip>
			),
		},
		{
			id       : 4,
			Header   : 'Status',
			accessor : ({ status = '' }) => {
				const { label = '', color = '' } = STATUS_PILL_MAPPING[status] || {};
				return (
					<Pill
						key={label}
						size="md"
						color={color}
					>
						{label}
					</Pill>
				);
			},
		},
		{
			id     : 5,
			Header : (
				<div className={styles.created_container}>
					Created at

					<Component
						onClick={() => setParams({ ...params, page: 1, sort_type: setSort })}
						style={{ cursor: 'pointer', marginLeft: '4px' }}
					/>
				</div>
			),
			accessor: ({ created_at = '' }) => (
				<div>
					{created_at ? (
						<div className={styles.created_date}>
							{formatDate({
								date       : created_at,
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								formatType : 'date',
							}) || '___'}
							::
							<div className={styles.created_time}>
								{formatDate({
									date       : created_at,
									timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
									formatType : 'time',
								}) || '___'}
							</div>
						</div>
					) : '___'}
				</div>
			),
		},
		{
			id       : 6,
			Header   : 'View Stats',
			accessor : ({ id, file_name, status = '' }) => (
				<Button
					onClick={() => {
						setFileInfo({ fileName: file_name, fileId: id });
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
