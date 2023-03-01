import { Button } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { format, startCase } from '@cogoport/utils/';
import { useState, useEffect } from 'react';

import authKeyMapping from '../../../constants/get-auth-key-mapping';
import styles from '../styles.module.css';

const useListEnrichment = () => {
	const { profile, general } = useSelector((state) => state || {});

	const partner_id = profile?.partner?.id;
	const user_id = profile?.user?.id;

	const { debounceQuery, query: searchQuery = '' } = useDebounceQuery();

	const [searchValue, setSearchValue] = useState('');

	const [activeTab, setActiveTab] = useState('enrichment_requests');
	const [apiName, setApiName] = useState('feedback_requests');

	// const [selectedItem, setSelectedItem] = useState();

	const [showUpload, setShowUpload] = useState(false);

	const [params, setParams] = useState({
		sort_by    : 'created_at',
		sort_type  : 'desc',
		page_limit : 10,
		page       : 1,
		partner_id,
		user_id,
		filters    : {
			q: searchQuery || undefined,
		},
	});

	const [globalFilters, setGlobalFilters] = useState({
		organization_id         : undefined,
		created_at_greater_than : undefined,
		created_at_less_than    : undefined,

	});

	const [{ loading, data }, refetch] = useAllocationRequest({
		url     : `/${apiName}`,
		method  : 'get',
		authkey : authKeyMapping[apiName],
		params,
	}, { manual: false });

	const { list = [], ...paginationData } = data || {};

	const getNextPage = (newPage) => {
		setParams((previousParams) => ({
			...previousParams,
			page: newPage,
		}));
	};

	useEffect(() => {
		setParams((previousParams) => ({
			...previousParams,
			filters: {
				...previousParams.filters,
				q: searchQuery || undefined,
			},
		}));
	}, [searchQuery]);

	useEffect(() => {
		if (activeTab === 'enrichment_requests') {
			setApiName('feedback_requests');
		}

		setParams((prev) => ({
			...prev,

			filters: {
				status: activeTab === 'requests_sent' ? 'responded' : 'requested',
			},
		}));
	}, [activeTab]);

	const router = useRouter();

	const handleUploadClick = (feedback_request_id) => {
		router.push('/enrichment/[id]', `/enrichment/${feedback_request_id}`);
	};

	const columns = [
		{
			id       : 'id',
			Header   : 'ID',
			accessor : ({ serial_id = '' }) => (
				<section>
					{serial_id || '-'}
				</section>
			),
		},
		{
			id       : 'business_name',
			Header   : 'ORGANIZATION',
			accessor : ({ organization = '' }) => (
				<section>
					{organization.business_name || '-'}
				</section>
			),
		},
		{
			id       : 'created_at',
			Header   : 'REQUESTED AT',
			accessor : ({ created_at }) => (
				<section>
					{created_at	 ? (
						<div>
							{format(created_at, 'dd MMM yyyy') || '-'}

						</div>
					) : '___'}

				</section>

			),
		},
		{
			id       : 'registration_number',
			Header   : 'PAN',
			accessor : ({ organization = {} }) => (
				<section>
					{organization.registration_number || '-'}
				</section>
			),
		},
		{
			id       : 'submission_date',
			Header   : ' SUBMISSION DATE',
			accessor : () => (

				<section>-</section>
			),
		},

		{
			id       : 'file_name',
			Header   : 'FILE NAME',
			accessor : ({ file_name }) => (

				<section>
					{startCase(file_name) || '-'}
				</section>
			),
		},
		{
			id       : 'upload_date',
			Header   : 'UPLOAD DATE',
			accessor : ({ created_at }) => (

				<section>
					{format(created_at, 'dd MMM yyyy')}
				</section>
			),
		},
		{
			id       : 'organizations',
			Header   : 'ORGANIZATIONS',
			accessor : ({ organizations }) => (

				<section>
					{organizations || '-'}
				</section>
			),
		},
		{
			id       : 'num_pocs',
			Header   : 'POCS COUNT',
			accessor : ({ num_pocs }) => (
				<section>
					{num_pocs || '-'}
				</section>
			),
		},
		{
			id       : 'download',
			Header   : 'DOWNLOAD',
			accessor : ({ sheet_url }) => (
				<section>
					<Button
						themeType="secondary"
						size="md"
						type="button"
						// eslint-disable-next-line no-undef
						onClick={() => window.open(sheet_url, '_blank')}
					>
						Download
					</Button>
				</section>
			),
		},
		{
			id       : 'edit',
			Header   : 'Action',
			accessor : (item) => {
				const { id } = item;

				return (
					<section>

						<Button
							themeType="secondary"
							size="sm"
							type="button"
							onClick={() => handleUploadClick(id)}
						>
							VIEW / EDIT DETAILS
						</Button>
					</section>
				);
			},
		},
		{
			id       : 'action',
			Header   : <div className={styles.action_header}>Action</div>,
			accessor : ({ id }) => (
				<section className={styles.content_container}>

					<Button
						themeType="secondary"
						type="button"
						size="sm"
						className={styles.edit_cta}
						onClick={() => handleUploadClick(id)}
					>
						Edit Details
					</Button>

				</section>
			),

		},

		{
			id       : 'status',
			Header   : 'STATUS',
			accessor : ({ status }) => (

				<seaction>
					{startCase(status) || '-'}
				</seaction>
			),
		},
	];

	return {
		columns,
		listRefetch :	refetch,
		locale      : general?.locale,
		list,
		paginationData,
		loading,
		setParams,
		getNextPage,
		showUpload,
		setShowUpload,
		activeTab,
		setActiveTab,
		globalFilters,
		setGlobalFilters,
		debounceQuery,
		searchValue,
		setSearchValue,
		partner_id,
		setApiName,

	};
};

export default useListEnrichment;
