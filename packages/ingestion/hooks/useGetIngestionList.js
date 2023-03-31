import { Button, Pill } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMDownload } from '@cogoport/icons-react';
import { useRequest } from '@cogoport/request';
import { startCase, format } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import ReUploadModal from '../page-components/Ingestion/TableSection/Modals/ReUploadModal';
import UploadListModal from '../page-components/Ingestion/TableSection/Modals/UploadListModal';
import styles from '../styles.module.css';

function useGetIngestionList() {
	const [row, setRow] = useState({});

	const [params, setParams] = useState({
		page: 1,
	});
	const [{ data, loading = false }] = useRequest({
		method : 'get',
		url    : 'list_ingestion_requests',
		params,
	}, { manual: false });

	const formProps = useForm();

	const [tableModal, setTableModal] = useState();

	// useEffect(() => {
	// 	setParams({
	// 		...params,
	// 		q    : searchValue || undefined,
	// 		page : 1,
	// 	});
	// // eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [searchValue]);

	const tableListModal = (_id) => {
		setRow(_id);
		setTableModal('uploadList');
	};

	const CONSTANT_KEYS = {
		REUPLOAD    : 'reUpload',
		UPLOAD_LIST : 'uploadList',
	};

	const {
		REUPLOAD, UPLOAD_LIST,
	} = CONSTANT_KEYS;

	const TABLE_MODAL_MAPPING = {
		[REUPLOAD]    : ReUploadModal,
		[UPLOAD_LIST] : UploadListModal,

	};

	const UPLOAD_STATUS_MAPPING = {
		Uploading : 'yellow',
		active    : 'green',
		inactive  : 'red',
	};

	const Component = TABLE_MODAL_MAPPING[tableModal] || null;

	const dummyData = {
		page        : 1,
		page_limit  : 8,
		total       : 4,
		total_count : 35,
		list        : [{
			name          : 'yash',
			num_org       : 2,
			uploaded_by   : 'Nilap',
			uploaded_date : '2023-02-22T13:33:35.028Z',
			status        : 'Uploading',
			type          : 'CP',
			error         : true,
		},
		{
			name          : 'yash',
			num_org       : 2,
			uploaded_by   : 'Nilap',
			uploaded_date : '2023-02-22T13:33:35.028Z',
			status        : 'Uploaded',
			type          : 'CP',
			error         : true,
		},
		{
			name          : 'yash',
			num_org       : 2,
			uploaded_by   : 'Nilap',
			uploaded_date : '2023-02-22T13:33:35.028Z',
			status        : 'Error',
			type          : 'CP',
			error         : true,
		},
		{
			name          : 'yash',
			num_org       : 2,
			uploaded_by   : 'Nilap',
			uploaded_date : '2023-02-22T13:33:35.028Z',
			status        : 'Uploaded',
			type          : 'CP',
			error         : true,
		},
		{
			name          : 'yash',
			num_org       : 2,
			uploaded_by   : 'Nilap',
			uploaded_date : '2023-02-22T13:33:35.028Z',
			status        : 'Uploaded',
			type          : 'CP',
			error         : true,
		},
		{
			name          : 'yash',
			num_org       : 2,
			uploaded_by   : 'Nilap',
			uploaded_date : '2023-02-22T13:33:35.028Z',
			status        : 'Uploaded',
			type          : 'CP',
			error         : true,
		},
		{
			name          : 'yash',
			num_org       : 2,
			uploaded_by   : 'Nilap',
			uploaded_date : '2023-02-22T13:33:35.028Z',
			status        : 'Uploaded',
			type          : 'CP',
			error         : false,
		},
		{
			name          : 'yash',
			num_org       : 2,
			uploaded_by   : 'Nilap',
			uploaded_date : '2023-02-22T13:33:35.028Z',
			status        : 'Error',
			type          : 'CP',
			error         : true,
		},
		{
			name          : 'yash',
			num_org       : 2,
			uploaded_by   : 'Nilap',
			uploaded_date : '2023-02-22T13:33:35.028Z',
			status        : 'Uploaded',
			type          : 'SP',
			error         : false,
		}],

	};
	const columns = [
		{
			key      : 'name',
			Header   : 'FILE NAME',
			accessor : ({ name = '' }) => (
				<div className={styles.name}>{startCase(name || '___')}</div>
			),
		},
		{
			key      : 'num_org',
			Header   : 'NUMBER OF ORGS',
			accessor : ({ num_org }) => (
				<div className={styles.number_of_org}>{num_org || '___'}</div>

			),
		},
		{
			key      : 'uploaded_by',
			Header   : 'UPLOADED BY',
			accessor : ({ name }) => (
				<div className={styles.name}>{startCase(name || '___')}</div>
			),
		},
		{
			key      : 'uploaded_date',
			Header   : 'UPLOAD DATE',
			accessor : ({ updated_at }) => (
				<div>
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
			accessor : ({ status = '' }) => (
				<Pill size="sm" color={UPLOAD_STATUS_MAPPING[status]}>
					{status ? startCase(status) : '___'}
				</Pill>
			),
		},
		{
			key      : 'type',
			Header   : 'TYPE',
			accessor : ({ ingestion_type = '' }) => (
				<div className={styles.type}>{startCase(ingestion_type || '___')}</div>
			),
		},
		{
			key      : 'error',
			Header   : 'ERROR REPORT',
			accessor : ({ error }) => (
				<div className={styles.name}>
					{error ? (
						<Button size="md" themeType="tertiary">
							{' '}
							<IcMDownload style={{ marginRight: '4px' }} />
							Download
						</Button>
					) : ''}

				</div>
			),
		},
		{
			key      : 're_upload',
			Header   : 'RE-UPLOAD',
			// Todo change this later true condition
			accessor : ({ error }) => (
				<div className={styles.re_upload}>

					{true ? (
						<Button onClick={() => setTableModal('reUpload')} size="md" themeType="secondary">
							{' '}
							{/* <IcMDownload style={{ marginRight: '4px' }} />
							Download */}
							Re-Upload
						</Button>
					) : ''}

				</div>
			),
		},
		{
			key      : 'uploaded',
			Header   : 'UPLOADED',
			accessor : (item) => (
				<div className={styles.uploaded}>
					<Button onClick={() => { tableListModal(item); }} size="md" themeType="tertiary">
						{' '}
						View All
					</Button>

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
		// dummyData,
		onPageChange,
		loading,
		Component,
		tableModal,
		setTableModal,
		data,
		row,
		formProps,
		params,
		setParams,
	};
}

export default useGetIngestionList;
