import { Button, Pill } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMDownload } from '@cogoport/icons-react';
import { useRequest } from '@cogoport/request';
import { startCase, format } from '@cogoport/utils';
import { useState } from 'react';

import styles from '../styles.module.css';

function useGetIngestionList() {
	const [row, setRow] = useState({});

	const [tableModal, setTableModal] = useState('');

	const [params, setParams] = useState({
		page                       : 1,
		request_file_data_required : true,
	});

	const validParams = {};
	Object.entries(params.filters || {}).forEach(([filterKey, value]) => {
		if (value) {
			validParams.filters = {};
			validParams.filters[filterKey] = params.filters[filterKey];
		}
	});

	Object.keys(params)
		.forEach((key) => {
			if (params[key] && key !== 'filters') {
				validParams[key] = params[key];
			}
		});

	const [{ data, loading }, refetch] = useRequest({
		method : 'get',
		url    : 'list_ingestion_requests',
		params : { ...validParams },
	}, { manual: false });

	const downloadErrorCsv = (link) => {
		window.open(link, '_blank');
	};

	const formProps = useForm();

	const tableListModal = (_id) => {
		setRow(_id);
		setTableModal('uploadList');
	};

	const UPLOAD_STATUS_MAPPING = {
		init       : 'yellow',
		completed  : 'green',
		processing : 'red',
	};

	const reUploadFiles = (_row) => {
		setRow(_row);
		setTableModal('reUpload');
	};

	const columns = [
		{
			key      : 'name',
			Header   : 'FILE NAME',
			accessor : ({ request_files = {} }) => (
				<div className={styles.name}>{startCase(request_files?.sheet_name || '___')}</div>
			),
		},
		{
			key      : 'num_org',
			Header   : 'NUMBER OF ORGS',
			accessor : ({ request_files = {} }) => (
				<div className={styles.number_of_org}>{request_files?.total_records_count || '___'}</div>

			),
		},
		{
			key      : 'uploaded_by',
			Header   : 'UPLOADED BY',
			accessor : ({ user_detail }) => (
				<div className={styles.name}>{startCase(user_detail?.name || '___')}</div>
			),
		},
		{
			key      : 'uploaded_date',
			Header   : 'UPLOAD DATE',
			accessor : ({ updated_at }) => (
				<div className={styles.updated_at}>
					{updated_at	 ? (
						<div className={styles.created_date}>
							{format(updated_at, 'dd MMM yyyy') || '___'}

							<div className={styles.created_time}>
								{format(updated_at, 'hh:mm aaa') || '___'}
							</div>
						</div>
					) : '___'}
				</div>

			),
		},
		{
			id       : 'status',
			Header   : 'STATUS',
			accessor : ({ request_files = {} }) => (
				<div className={styles.status}>
					<Pill size="sm" color={UPLOAD_STATUS_MAPPING[request_files?.stage]}>
						{request_files?.stage ? startCase(request_files?.stage) : '___'}
					</Pill>
				</div>

			),
		},
		{
			key      : 'type',
			Header   : 'TYPE',
			accessor : ({ ingestion_type }) => (
				<div className={styles.type}>{startCase(ingestion_type || '___')}</div>
			),
		},
		{
			key      : 'error',
			Header   : 'ERROR REPORT',
			accessor : ({ request_files = {} }) => (
				<div className={styles.name}>
					{request_files?.errored_data_url ? (
						<Button
							onClick={() => { downloadErrorCsv(request_files?.errored_data_url); }}
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
		row,
		formProps,
		params,
		setParams,
		refetch,
	};
}

export default useGetIngestionList;
