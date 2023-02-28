import { Button, Popover } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { format } from '@cogoport/utils/';
import { useState, useEffect } from 'react';

import Actions from '../components/EnrichmentTable/Actions';
import styles from '../styles.module.css';

const LIST_PRIMARY_COLUMNS_MAPPING = {
	enrichment_requests: ['id', 'business_name', 'created_at', 'registration_number', 'address', 'action'],

};

const LIST_SECONDARY_COLUMNS_MAPPING = {
	submitted_requests : ['id', 'business_name', 'created_at', 'registration_number', 'address', 'edit'],
	uploaded_files     : ['file_name', 'upload_date', 'organizations', 'num_pocs', 'download'],
};

const authKeyMapping = {
	feedback_requests        : 'get_allocation_feedback_requests',
	feedback_response_sheets : 'get_allocation_feedback_response_sheets',

};

const useListEnrichment = () => {
	const profileData = useSelector(({ profile }) => profile);

	const { debounceQuery, query: searchQuery = '' } = useDebounceQuery();
	const [searchValue, setSearchValue] = useState('');
	const [activeTab, setActiveTab] = useState('enrichment_requests');
	const [secondaryTab, setSecondaryTab] = useState('submitted_requests');
	const [enrichmentItem, setEnrichmentItem] = useState();
	const [popoverId, setPopoverId] = useState(null);
	const [params, setParams] = useState({
		sort_by    : 'created_at',
		sort_type  : 'desc',
		page_limit : 10,
		page       : 1,
		user_id    : profileData?.user?.id,
		partner_id : profileData?.partner?.id,
		filters    : {
			q: searchQuery || undefined,

		},

	});

	const [globalFilters, setGlobalFilters] = useState({
		organization_id         : undefined,
		created_at_greater_than : undefined,
		created_at_less_than    : undefined,

	});

	const { organization_id, created_at_greater_than, created_at_less_than } = globalFilters || {};

	// const clearFilters = () => {
	// 	setGlobalFilters({
	// 		search                  : '',
	// 		created_at_greater_than : undefined,
	// 		created_at_less_than    : undefined,

	// 	});
	// };

	// useEffect(() => {
	// 	clearFilters();
	// // eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [activeTab]);

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
				status: activeTab === 'requests_sent' ? 'responded' : undefined,
			},
		}));

		setSecondaryTab('submitted_requests');
	}, [activeTab]);

	const router = useRouter();

	const handleUploadClick = (feedback_request_id) => {
		router.push('/enrichment/[id]', `/enrichment/${feedback_request_id}`);
	};

	const columns = [
		{
			Header   : <div>ID</div>,
			id       : 'id',
			accessor : ({ id = '' }) => (
				<section>
					{id}
				</section>
			),
		},
		{
			Header   : <div>ORGANIZATION</div>,
			id       : 'business_name',
			accessor : ({ organization = '' }) => (
				<section>
					{organization.business_name || '-'}
				</section>
			),
		},
		{
			Header   : <div>REQUEST DATE</div>,
			id       : 'created_at',
			accessor : ({ created_at }) => (
				<div>
					{created_at	 ? (
						<div>
							{format(created_at, 'dd MMM yyyy') || '-'}

						</div>
					) : '___'}

				</div>

			),
		},
		{
			Header   : <div>PAN</div>,
			id       : 'registration_number',
			accessor : ({ organization = {} }) => (
				<section>
					{organization.registration_number || '-'}
				</section>
			),
		},
		{
			Header   : <div>Submission Date</div>,
			id       : 'submission_data',
			accessor : () => (

				<section>
					12-OCT-2022
				</section>
			),
		},

		{
			Header   : <div>File Name</div>,
			id       : 'file_name',
			accessor : () => (
				<section>

					Name
				</section>
			),
		},
		{
			Header   : <div>Upload Date</div>,
			id       : 'upload_date',
			accessor : () => (
				<section>
					12-OCT-2000
				</section>
			),
		},
		{
			Header   : <div>Organizations</div>,
			id       : 'organizations',
			accessor : () => (
				<section>
					Organiation Date
				</section>
			),
		},
		{
			Header   : <div>Number Of Pocs</div>,
			id       : 'num_pocs',
			accessor : () => (
				<section>
					Number Of Pocs
				</section>
			),
		},
		{
			Header   : <div>Download</div>,
			id       : 'download',
			accessor : () => (
				<section>
					<Button
						themeType="secondary"
						size="md"
						type="button"
					>
						Download

					</Button>
				</section>
			),
		},
		{
			Header   : <div>ADDRESS</div>,
			id       : 'address',
			accessor : ({ address = '', id = '' }, item = {}) => (

				address ? (
					<section style={{ display: 'flex' }}>
						<div className={styles.address}>
							{address}
						</div>

						<div
							className={styles.link_text}
							role="presentation"
							onClick={() => {
								setEnrichmentItem({
									item,
									type: 'address',
									id,

								});
							}}
						>
							View More

						</div>
					</section>
				) : '-'

			),
		},
		{
			Header   : <div>View / Add Details</div>,
			id       : 'edit',
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
							View / Add Details

						</Button>
					</section>
				);
			},
		},

		{
			id       : 'action',
			Header   : 'Action',
			accessor : (item) => {
				const { id } = item;

				return (
					<div className={styles.content_container}>
						<Popover
							visible={popoverId === id}
							placement="left"
							interactive
							render={(
								<Actions onClickCta={({ type }) => {
									if (type === 'manual') {
										handleUploadClick(id);
									} else {
										setEnrichmentItem({
											item,
											id,
											type,
										});
									}
									setPopoverId(null);
								}}
								/>
							)}
							onClickOutside={() => setPopoverId(null)}
						>
							<div
								className={styles.svg_container}
							>
								<IcMOverflowDot
									height={16}
									width={16}
									onClick={() => setPopoverId((pv) => (pv === id ? null : id))}
								/>
							</div>
						</Popover>
					</div>
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
		columns: filteredColumns,
		list,
		paginationData,
		refetch,
		loading,
		setParams,
		getNextPage,
		enrichmentItem,
		setEnrichmentItem,
		activeTab,
		setActiveTab,
		secondaryTab,
		setSecondaryTab,
		globalFilters,
		setGlobalFilters,
		debounceQuery,
		searchValue,
		setSearchValue,

	};
};

export default useListEnrichment;
