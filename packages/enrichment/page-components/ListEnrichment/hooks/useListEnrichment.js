import { Pill, Button } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { format, startCase } from '@cogoport/utils/';
import { useState, useEffect } from 'react';

import AUTH_KEY_MAPPING from '../../../constants/auth-key-mapping';
import UPLOAD_DOCUMENT_STATUS_MAPPING from '../../../constants/upload-document-status-mapping';
import styles from '../styles.module.css';

const useListEnrichment = () => {
	const { profile, general } = useSelector((state) => state || {});

	const { partner: { id: partner_id }, user: { id: user_id } } = profile;

	const { query: { tab = '' }, locale = '' } = general;

	const { debounceQuery, query: searchQuery = '' } = useDebounceQuery();

	const [searchValue, setSearchValue] = useState('');

	const [activeTab, setActiveTab] = useState(tab || 'enrichment_requests');

	const [apiName, setApiName] = useState('feedback_requests');

	const [showUpload, setShowUpload] = useState(false);

	const [params, setParams] = useState({
		sort_by    : 'created_at',
		sort_type  : 'desc',
		page_limit : 10,
		page       : 1,
		filters    : {
			q: searchQuery || undefined,
			partner_id,
			user_id,
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
		authkey : AUTH_KEY_MAPPING[apiName],
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
				...prev.filters,
				status: activeTab === 'requests_sent' ? 'responded' : 'active',
			},
		}));
	}, [activeTab]);

	const router = useRouter();

	const handleUploadClick = (feedback_request_id) => {
		router.push(`/enrichment/[id]?tab=${activeTab}`, `/enrichment/${feedback_request_id}?tab=${activeTab}`);
	};

	const columns = [
		{
			id       : 'id',
			Header   : 'SERIAL ID',
			accessor : ({ organization, lead_organization }) => (
				<section>
					<Pill>
						#
						{lead_organization?.serial_id || organization?.serial_id}
					</Pill>
				</section>
			),
		},
		{
			id       : 'file_id',
			Header   : 'SERIAL ID',
			accessor : ({ serial_id }) => (
				<section>
					<Pill>
						#
						{serial_id || '-'}
					</Pill>
				</section>
			),
		},
		{
			id       : 'business_name',
			Header   : 'ORGANIZATION',
			accessor : ({ organization, lead_organization, lead_organization_id }) => (
				<section>
					{
						lead_organization_id ? (
							(lead_organization || {}).business_name || '-'
						) : (
							(organization || {}).business_name || '-'
						)
					}
				</section>
			),
		},
		{
			id       : 'created_at',
			Header   : 'REQUESTED AT',
			accessor : ({ created_at = '' }) => (
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
			accessor : ({ organization, lead_organization, lead_organization_id }) => (
				<section>
					{
						lead_organization_id ? (
							(lead_organization || {}).registration_number || '-'
						) : (
							(organization || {}).registration_number || '-'
						)
					}
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
					{created_at ? format(created_at, 'dd MMM yyyy') : '-'}
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
			id       : 'sheet_url',
			Header   : 'SHEET URL',
			accessor : ({ sheet_url }) => (
				<section>
					<Button
						themeType="secondary"
						size="md"
						type="button"
						disabled={sheet_url === null}
						// eslint-disable-next-line no-undef
						onClick={() => window.open(sheet_url, '_blank')}
					>
						Download
					</Button>
				</section>
			),
		},
		{
			id       : 'error_sheet_url',
			Header   : 'ERROR SHEET URL',
			accessor : ({ error_sheet_url }) => (
				<section>
					<Button
						themeType="secondary"
						size="md"
						type="button"
						disabled={!error_sheet_url}
						// eslint-disable-next-line no-undef
						onClick={() => window.open(error_sheet_url, '_blank')}
					>
						Download
					</Button>
				</section>
			),
		},
		{
			id       : 'edit',
			Header   : <div className={styles.action_header}>Action</div>,
			accessor : (item) => {
				const { id } = item;

				return (
					<section className={styles.content_container}>

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
						Add Details
					</Button>
				</section>
			),

		},
		{
			id       : 'status',
			Header   : 'STATUS',
			accessor : ({ status }) => (
				<seaction>
					<Pill
						size="md"
						color={UPLOAD_DOCUMENT_STATUS_MAPPING[status]}
					>
						{startCase(status) || '-'}
					</Pill>
				</seaction>
			),
		},
	];

	return {
		columns,
		listRefetch:	refetch,
		locale,
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
