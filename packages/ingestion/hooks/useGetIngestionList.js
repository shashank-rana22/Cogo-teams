import { Tooltip, Button, Pill } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMDownload } from '@cogoport/icons-react';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import { REDIRECT_LINK_MAPPING, REDIRECT_MAPPING } from '../constants/header-mapping';
import { UPLOAD_STATUS_MAPPING } from '../constants/table-modal-mapping';
import styles from '../styles.module.css';

const downloadErrorCsv = (link) => {
	window.open(link, '_blank');
};

function useGetIngestionList() {
	const [rowData, setRowData] = useState({});

	const [tableModal, setTableModal] = useState('');

	const [params, setParams] = useState({
		page                       : 1,
		request_file_data_required : true,
	});

	const [{ data, loading }, refetch] = useRequest({
		method : 'get',
		url    : 'list_ingestion_requests',
		params,
	}, { manual: false });

	const {
		general: { query = {} },
	} = useSelector((reduxState) => reduxState);

	const { partner_id = '' } = query;

	const formProps = useForm();

	const tableListModal = (id) => {
		setRowData(id);
		setTableModal('upload_list');
	};

	const reUploadFiles = (row) => {
		setRowData(row);
		setTableModal('re_upload');
	};

	const columns = [
		{
			key      : 'name',
			Header   : 'FILE NAME',
			accessor : ({ request_files = {} }) => (
				<Tooltip
					className={styles.popover}
					// visible={request_files?.sheet_name}
					content={request_files?.sheet_name || '___'}
					placement="top"
				>
					<div className={styles.name}>{startCase(request_files?.sheet_name || '___')}</div>
				</Tooltip>
			),
		},
		{
			key      : 'num_org',
			Header   : 'PROCESSED RECORDS',
			accessor : ({ request_files = {} }) => (
				<div className={styles.number_of_org}>
					{request_files?.successfully_migrated_count || '-'}
					{' '}
					/
					{' '}
					{request_files?.total_records_count || '-'}
				</div>

			),
		},
		{
			key      : 'description',
			Header   : 'DESCRIPTION',
			accessor : ({ description = '' }) => (
				<div className={styles.pop_container}>
					<Tooltip
						className={styles.popover}
						// visible={description}
						content={description || '___'}
						placement="left"
					>
						<div className={styles.description}>{startCase(description || '___')}</div>
					</Tooltip>
				</div>

			),
		},
		{
			key      : 'uploaded_by',
			Header   : 'UPLOADED BY',
			accessor : ({ user_detail }) => (
				<div className={styles.uploaded_by}>{startCase(user_detail?.name || '___')}</div>
			),
		},
		{
			key      : 'uploaded_date',
			Header   : 'UPLOAD DATE',
			accessor : ({ updated_at }) => (
				<div className={styles.updated_at}>

					{formatDate({
						date       : updated_at,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
						formatType : 'dateTime',
						separator  : ' | ',
					})}
				</div>

			),
		},
		{
			id       : 'stage',
			Header   : 'STAGE',
			accessor : ({ request_files = {} }) => (
				<div className={styles.status}>
					<Pill size="sm" color={UPLOAD_STATUS_MAPPING[request_files?.stage]}>
						{request_files?.stage ? startCase(request_files?.stage || '') : '___'}
					</Pill>
				</div>

			),
		},
		{
			key      : 'type',
			Header   : <div className={styles.type}>TYPE</div>,
			id       : 'type',
			accessor : (item = {}) => (
				<div className={styles.type}>

					<Tooltip
						className={styles.popover}
						content={`Redirecting to
							${REDIRECT_MAPPING[`${item?.is_channel_partner}_${item?.account_type}`]
							|| '---'}`}
						placement="top"
					>
						<Button
							className={styles.type_name}
							themeType="tertiary"
						>
							<a
								href={`/${partner_id}
								${REDIRECT_LINK_MAPPING[`${item?.is_channel_partner}_${item?.account_type}`]}
								?source_id=${item?.id}`}
							>
								{startCase(item?.ingestion_type || '___')}

							</a>

						</Button>
					</Tooltip>

				</div>
			),

		},
		{
			key      : 'error',
			Header   : 'ERROR REPORT',
			accessor : ({ request_files = {} }) => (
				<div className={styles.error}>
					{request_files?.errored_data_url ? (
						<Button
							onClick={() => downloadErrorCsv(request_files?.errored_data_url)}
							size="md"
							themeType="tertiary"
						>
							<IcMDownload style={{ marginRight: '4px' }} />
							Download
						</Button>
					) : null}

				</div>
			),
		},
		{
			key      : 're_upload',
			Header   : 'RE-UPLOAD',
			accessor : (item) => (
				<div className={styles.re_upload}>

					{item?.request_files?.errored_data_url ? (
						<Button onClick={() => { reUploadFiles(item); }} size="md" themeType="secondary">
							Re-Upload
						</Button>
					) : null}

				</div>
			),
		},
		{
			key      : 'uploaded',
			Header   : 'UPLOADED',
			accessor : (item) => (
				<div className={styles.uploaded}>

					{item.request_files?.errored_data_url ? (
						<Button onClick={() => { tableListModal(item); }} size="md" themeType="tertiary">
							View All
						</Button>
					) : null}

				</div>
			),
		},

	];

	const onPageChange = (pageNumber) => {
		setParams((previousParams) => ({
			...previousParams,
			page: pageNumber,
		}));
	};

	return {
		columns,
		onPageChange,
		loading,
		tableModal,
		setTableModal,
		data,
		row: rowData,
		formProps,
		params,
		setParams,
		refetch,
	};
}

export default useGetIngestionList;
