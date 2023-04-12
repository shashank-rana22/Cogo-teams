import { Button, Pill } from '@cogoport/components';
import { IcMDownload } from '@cogoport/icons-react';
import { useRequest } from '@cogoport/request';
import { startCase, format } from '@cogoport/utils';
import { useState } from 'react';

import { UPLOAD_STATUS_MAPPING } from '../constants/table-modal-mapping';
import styles from '../styles.module.css';

function useGetUploadList(id) {
	const [params, setParams] = useState({
		page    : 1,
		filters : {
			ingestion_request_id: id,
		},
	});

	const downloadErrorCsv = (_link) => {
		window.open(_link, '_blank');
	};

	const [{ data, loading }] = useRequest({
		method : 'get',
		url    : 'list_ingestion_request_files',
		params,

	}, { manual: false });

	const onPageChange = (pageNumber) => {
		setParams((previousParams) => ({
			...previousParams,
			page: pageNumber,
		}));
	};

	const columns = [

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
			id       : 'stage',
			Header   : 'STAGE',
			accessor : ({ stage }) => (
				<div className={styles.stage}>
					<Pill size="sm" color={UPLOAD_STATUS_MAPPING[stage]}>
						{ startCase(stage || '___') }
					</Pill>
				</div>

			),
		},
		{
			key      : 'error',
			Header   : 'ERROR REPORT',
			accessor : ({ errored_data_url }) => (
				<div className={styles.name}>
					{errored_data_url ? (
						<Button onClick={() => { downloadErrorCsv(errored_data_url); }} size="sm" themeType="tertiary">
							<IcMDownload style={{ marginRight: '4px' }} />
							Download
						</Button>
					) : null}

				</div>
			),
		},
		{
			key      : 'totals_count',
			Header   : 'TOTAL COUNT',
			accessor : ({ total_records_count }) => (
				<div className={styles.total_count}>{total_records_count || '___'}</div>

			),
		},
		{
			key      : 'successfully_migrated',
			Header   : 'SUCCESSFULLY MIGRATED',
			accessor : ({ successfully_migrated_count }) => (
				<div className={styles.successfully_migrated_count}>{successfully_migrated_count || '___'}</div>

			),
		},
		{
			key      : 'remark',
			Header   : 'REMARKS REPORT',
			accessor : ({ remarks_data_url }) => (
				<div className={styles.remark}>
					{remarks_data_url ? (
						<Button onClick={() => { downloadErrorCsv(remarks_data_url); }} size="sm" themeType="tertiary">
							<IcMDownload style={{ marginRight: '4px' }} />
							Download
						</Button>
					) : null}

				</div>
			),
		},

	];

	return {
		columns,
		onPageChange,
		data,
		loading,
	};
}

export default useGetUploadList;
