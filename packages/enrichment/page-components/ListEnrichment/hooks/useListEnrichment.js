import { Button, Popover } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { format, startCase } from '@cogoport/utils/';
import { useState, useEffect } from 'react';

import {
	LIST_PRIMARY_COLUMNS_MAPPING,
	LIST_SECONDARY_COLUMNS_MAPPING,
} from '../../../constants/get-table-columns';
import Actions from '../components/Enrichment/Actions';
import styles from '../styles.module.css';

const authKeyMapping = {
	feedback_requests        : 'get_allocation_feedback_requests',
	feedback_response_sheets : 'get_allocation_feedback_response_sheets',

};

const useListEnrichment = () => {
	const {
		profile = {},
	} = useSelector((state) => state);

	const { debounceQuery, query: searchQuery = '' } = useDebounceQuery();
	const [searchValue, setSearchValue] = useState('');
	const [activeTab, setActiveTab] = useState('enrichment_requests');
	const [secondaryTab, setSecondaryTab] = useState('submitted_requests');
	const [selectedItem, setSelectedItem] = useState();
	const [popoverId, setPopoverId] = useState(null);
	const [params, setParams] = useState({
		sort_by    : 'created_at',
		sort_type  : 'desc',
		page_limit : 10,
		page       : 1,
		user_id    : profile.user?.id,
		partner_id : profile.partner?.id,
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

	// useEffect(() => {
	// 	setParams((prevParams) => ({

	// 		...prevParams,
	// 		filters: {
	// 			...prevParams.filters,
	// 			status: activeTab === 'requests_sent' ? 'responded' : undefined,
	// 		},
	// 	}));

	// 	setSecondaryTab('submitted_requests');
	// }, [activeTab]);

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
			Header   : 'Organization',
			accessor : ({ organization = '' }) => (
				<section>
					{organization.business_name || '-'}
				</section>
			),
		},
		{
			id       : 'created_at',
			Header   : 'Request Date',
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
			Header   : 'Submission Date',
			accessor : () => (

				<section>
					12-OCT-2022
				</section>
			),
		},

		{
			id       : 'file_name',
			Header   : 'File Name',
			accessor : ({ file_name }) => (
				<section>

					{startCase(file_name) || '-'}
				</section>
			),
		},
		{
			id       : 'upload_date',
			Header   : 'Upload Date',
			accessor : ({ created_at }) => (
				<section>
					{format(created_at, 'dd MMM yyyy')}
				</section>
			),
		},
		{
			id       : 'organizations',
			Header   : 'Organizations',
			accessor : ({ organizations }) => (
				<section>
					{organizations || '-'}
				</section>
			),
		},
		{
			id       : 'num_pocs',
			Header   : 'Number Of Pocs',
			accessor : ({ num_pocs }) => (
				<section>
					{num_pocs || '-'}
				</section>
			),
		},
		{
			id       : 'download',
			Header   : 'Download',
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
			id       : 'address',
			Header   : 'Address',
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
								setSelectedItem({
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
			id       : 'edit',
			Header   : 'View / Add Details',
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
							Action

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
										setSelectedItem({
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
		columns     : filteredColumns,
		list,
		paginationData,
		listRefetch :	refetch,
		loading,
		setParams,
		getNextPage,
		selectedItem,
		setSelectedItem,
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
