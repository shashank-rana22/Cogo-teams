import { Button, Pill } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMDownload } from '@cogoport/icons-react';
import { useRequest } from '@cogoport/request';
import { startCase, format, isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import ReUploadModal from '../page-components/Ingestion/TableSection/Modals/ReUploadModal';
import UploadListModal from '../page-components/Ingestion/TableSection/Modals/UploadListModal';
import styles from '../styles.module.css';
import controls from '../utils/controls';

import useGetUploadList from './useGetUploadList';

function useGetIngestionList() {
	// const [currentPage, setCurrentPage] = useState(1);

	const [row, setRow] = useState({});
	const [{ data, loading = false }] = useRequest({
		method : 'get',
		url    : 'list_ingestion_requests',
		// params : {
		// 	Month  : Month || undefined,
		// 	Year   : Year || undefined,
		// 	UserID : userId || undefined,
		// },
	}, { manual: false });

	const [tableModal, setTableModal] = useState();

	const tableListModal = (_id) => {
		console.log(_id, 'id');
		setRow(_id);
		setTableModal('uploadList');
		// const { list = [], loading } = useGetUploadList(_id);
	};

	// const
	// const [ingestionData, setIngestionData] = useState({

	// 	performed_by_type : 'agent',
	// 	partner_id        : '',
	// 	option1           : '',
	// 	// orgDetails : {
	// 	// 	isCp    : null,
	// 	// 	country : '',
	// 	// 	partner : '',
	// 	// },
	// 	// isCp              : null,
	// 	country           : '',
	// 	partner           : '',
	// 	option2           : '',
	// 	option3           : '',
	// 	finalModalHeading : '',

	// 	country_id         : 'fe92b7c7-9481-4a3b-8d79-df9a7bf94a4e',
	// 	user_id            : '01141cde-f56d-49f4-934b-f6111c3e0678',
	// 	file_url           : '',
	// 	file_name          : 'KJBHDJKS',
	// 	ingestion_type     : 'organization',
	// 	description        : 'testing the ingestion apis',
	// 	is_channel_partner : false,
	// 	agent_id           : '',

	// });

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

	// Todo use later with api logic for color of pill
	// const ERROR_MAPPING = {
	// 	error      : 'red',
	// 	processing : 'yellow',
	// 	uploaded   : 'green',
	// };

	const UPLOAD_STATUS_MAPPING = {
		Uploading : 'yellow',
		active    : 'green',
		inactive  : 'red',
	};

	const Component = TABLE_MODAL_MAPPING[tableModal] || null;

	// const loading = false;
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
			accessor : ({ error }) => (
				<div className={styles.re_upload}>
					{error ? (
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

	// const onPageChange = (pageNumber) => {
	// 	setCurrentPage(pageNumber);
	// };

	return {
		columns,
		dummyData,
		// onPageChange,
		// currentPage,
		loading,
		// ingestionData,
		// setIngestionData,
		// formProps,
		// modalControls: mutatedControls,
		Component,
		tableModal,
		setTableModal,
		data,
		row,
	};
}

export default useGetIngestionList;
