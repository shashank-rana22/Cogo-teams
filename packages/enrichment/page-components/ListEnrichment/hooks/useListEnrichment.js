import { Button } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { format, startCase } from '@cogoport/utils/';
import { useState, useEffect } from 'react';

import authKeyMapping from '../../../constants/get-auth-key-mapping';
import {
	LIST_PRIMARY_COLUMNS_MAPPING,
	LIST_SECONDARY_COLUMNS_MAPPING,
} from '../../../constants/get-table-columns';
import styles from '../styles.module.css';

const useListEnrichment = () => {
	const { profile, general } = useSelector((state) => state || {});

	const { partner_id, user_id } = profile;

	const { debounceQuery, query: searchQuery = '' } = useDebounceQuery();

	const [searchValue, setSearchValue] = useState('');

	const [activeTab, setActiveTab] = useState('enrichment_requests');

	const [secondaryTab, setSecondaryTab] = useState('submitted_requests');

	// const [selectedItem, setSelectedItem] = useState();

	const [showUpload, setShowUpload] = useState(false);

	const [params, setParams] = useState({
		sort_by    : 'created_at',
		sort_type  : 'desc',
		page_limit : 10,
		page       : 1,
		user_id,
		partner_id,
		filters    : {
			q: searchQuery || undefined,
		},
	});

	const [globalFilters, setGlobalFilters] = useState({
		organization_id         : undefined,
		created_at_greater_than : undefined,
		created_at_less_than    : undefined,

	});

	let listApiName = 'feedback_requests';

	if (activeTab === 'requests_sent' && secondaryTab === 'uploaded_files') {
		listApiName = 'feedback_response_sheets';
	}

	const [{ loading, data }, refetch] = useAllocationRequest({
		url     : `/${listApiName}`,
		method  : 'get',
		authkey : authKeyMapping[listApiName],
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
		setParams((prevParams) => ({
			...prevParams,

			filters: {
				...prevParams.filters,

				...(activeTab === 'requests_sent' && {
					status: secondaryTab === 'submitted_requests'
						? 'responded' : undefined,
				}),
			},

		}));
	}, [activeTab, secondaryTab]);

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
			accessor : (item) => {
				const { id } = item;

				return (
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
						{/*
						<Button
							themeType="primary"
							type="button"
							size="sm"
							onClick={() => setSelectedItem(item)}
						>
							Upload
						</Button> */}
					</section>
				);
			},
		},
	];

	const filteredColumns = columns.filter((listItem) => {
		if (activeTab === 'requests_sent') {
			return	LIST_SECONDARY_COLUMNS_MAPPING[secondaryTab]?.includes(listItem.id);
		}
		return LIST_PRIMARY_COLUMNS_MAPPING[activeTab]?.includes(listItem.id);
	});

	return {
		columns     : filteredColumns,
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
		secondaryTab,
		setSecondaryTab,
		globalFilters,
		setGlobalFilters,
		debounceQuery,
		searchValue,
		setSearchValue,
		partner_id,

	};
};

export default useListEnrichment;
