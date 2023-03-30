import { Button, Pill } from '@cogoport/components';
import { IcMDownload } from '@cogoport/icons-react';
import { useRequest } from '@cogoport/request';
import { startCase, format } from '@cogoport/utils';

import styles from '../styles.module.css';

function useGetUploadList(id) {
	const UPLOAD_STATUS_MAPPING = {
		init       : 'yellow',
		completed  : 'green',
		processing : 'red',
	};

	// console.log('idididi', id);

	const [{ data, loading = false }] = useRequest({
		method : 'get',
		url    : 'list_ingestion_error_request_files',
		params : {
			// Month  : Month || undefined,
			// Year   : Year || undefined,
			// UserID : userId || undefined,
			filters: {
				ingestion_request_id: id,
			},
		},
		// params : {
		// 	Month  : Month || undefined,
		// 	Year   : Year || undefined,
		// 	UserID : userId || undefined,
		// },
	}, { manual: false });

	const onPageChange = () => {

	};
	const currentPage = 1;
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
			num_org       : 200,
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
		// {
		// 	key      : 'name',
		// 	Header   : 'FILE NAME',
		// 	accessor : ({ name = '' }) => (
		// 		<div className={styles.name}>{startCase(name || '___')}</div>
		// 	),
		// },
		// {
		// 	key      : 'num_org',
		// 	Header   : 'NUMBER OF ORGS',
		// 	accessor : ({ num_org }) => (
		// 		<div className={styles.number_of_org}>{num_org || '___'}</div>

		// 	),
		// },
		// {
		// 	key      : 'uploaded_by',
		// 	Header   : 'UPLOADED BY',
		// 	accessor : ({ uploaded_by }) => (
		// 		<div className={styles.name}>{startCase(uploaded_by || '___')}</div>
		// 	),
		// },

		// {
		// 	key      : 'type',
		// 	Header   : 'TYPE',
		// 	accessor : ({ type = '' }) => (
		// 		<div className={styles.type}>{startCase(type || '___')}</div>
		// 	),
		// },

		// {
		// 	key      : 're_upload',
		// 	Header   : 'RE-UPLOAD',
		// 	accessor : ({ error }) => (
		// 		<div className={styles.re_upload}>
		// 			{error ? (
		// 				<Button onClick={() => setTableModal('reUpload')} size="md" themeType="secondary">
		// 					{' '}
		// 					{/* <IcMDownload style={{ marginRight: '4px' }} />
		// 					Download */}
		// 					Re-Upload
		// 				</Button>
		// 			) : ''}

		// 		</div>
		// 	),
		// },
		// {
		// 	key      : 'uploaded',
		// 	Header   : 'UPLOADED',
		// 	accessor : () => (
		// 		<div className={styles.uploaded}>
		// 			<Button onClick={() => setTableModal('uploadList')} size="md" themeType="tertiary">
		// 				{' '}
		// 				View All
		// 			</Button>

		// 		</div>
		// 	),
		// },

		{
			key      : 'type',
			Header   : 'ERROR TYPE',
			accessor : ({ type = '' }) => (
				<div className={styles.type}>{startCase(type || '___')}</div>
			),
		},
		{
			key      : 'uploaded_date',
			Header   : 'UPLOAD DATE',
			accessor : ({ created_at }) => (
				<div>
					{created_at	 ? (
						<div className={styles.created_date}>
							{format(created_at, 'dd MMM yyyy') || '___'}

							<div className={styles.created_time}>
								{format(created_at, 'hh:mm aaa') || '___'}
							</div>
						</div>
					) : '___'}
				</div>

			),
		},
		{
			id       : 'status',
			Header   : 'STATUS',
			accessor : ({ stage = '' }) => (
				<Pill size="sm" color={UPLOAD_STATUS_MAPPING[stage]}>
					{stage ? startCase(stage) : '___'}
				</Pill>
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
			key      : 'totals_count',
			Header   : 'TOTAL COUNT',
			accessor : ({ total_records_count }) => (
				<div className={styles.number_of_org}>{total_records_count || '___'}</div>

			),
		},
		{
			key      : 'successfully_migratedd',
			Header   : 'SUCCESSFULLY MIGRATED',
			accessor : ({ successfully_migrated_count }) => (
				<div className={styles.number_of_org}>{successfully_migrated_count || '___'}</div>

			),
		},

	];

	return {
		columns,
		dummyData,
		onPageChange,
		currentPage,
		data,
		loading,
	};
}

export default useGetUploadList;
