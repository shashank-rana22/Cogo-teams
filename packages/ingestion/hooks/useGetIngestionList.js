import { Button, Pill } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMDownload } from '@cogoport/icons-react';
import { startCase, format } from '@cogoport/utils';
import { useState } from 'react';

import styles from '../styles.module.css';

function useGetIngestionList() {
	// const [currentPage, setCurrentPage] = useState(1);

	const [ingestionData, setIngestionData] = useState({
		option1           : '',
		// orgDetails : {
		// 	isCp    : null,
		// 	country : '',
		// 	partner : '',
		// },
		// isCp              : null,
		country           : '',
		partner           : '',
		option2           : '',
		option3           : '',
		finalModalHeading : '',

	});

	const UPLOAD_STATUS_MAPPING = {
		Uploading : 'yellow',
		Uploaded  : 'green',
		Error     : 'red',
	};

	const loading = false;
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
			type          : 'CP',
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
			accessor : ({ uploaded_by }) => (
				<div className={styles.name}>{startCase(uploaded_by || '___')}</div>
			),
		},
		{
			key      : 'uploaded_date',
			Header   : 'UPLOAD DATE',
			accessor : ({ uploaded_date }) => (
				<div>
					{uploaded_date	 ? (
						<div className={styles.created_date}>
							{format(uploaded_date, 'dd MMM yyyy') || '___'}

							<div className={styles.created_time}>
								{format(uploaded_date, 'hh:mm aaa') || '___'}
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
			accessor : ({ type = '' }) => (
				<div className={styles.type}>{startCase(type || '___')}</div>
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
	];

	// const onPageChange = (pageNumber) => {
	// 	setCurrentPage(pageNumber);
	// };

	const formProps = useForm({
		defaultValues: {
			country_id : null,
			partner    : null,
			url        : '',
		},
	});

	return {
		columns,
		dummyData,
		// onPageChange,
		// currentPage,
		loading,
		ingestionData,
		setIngestionData,
		formProps,
	};
}

export default useGetIngestionList;
