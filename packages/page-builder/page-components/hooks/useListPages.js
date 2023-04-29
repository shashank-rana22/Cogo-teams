import { Pill, Popover } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils/';
import { useState, useEffect } from 'react';

import Actions from '../ListPages/Actions';

export const STATUS_MAPPING = {
	active: {
		status      : 'Active',
		color       : 'blue',
		buttonLabel : 'Active',
	},
	inactive: {
		status      : 'Inactive',
		color       : 'green',
		buttonLabel : 'Inactive',
	},
	draft: {
		status      : 'Draft',
		color       : 'red',
		buttonLabel : 'Draft',
	},
};

const useListPages = () => {
	// const { profile, general } = useSelector((state) => state || {});

	// const { partner: { id: partner_id }, user: { id: user_id } } = profile;

	// const { query: { tab = '' }, locale = '' } = general;

	const { debounceQuery, query: searchQuery = '' } = useDebounceQuery();

	const [searchValue, setSearchValue] = useState('');
	const [showCreatePage, setShowCreatePage] = useState(false);
	// const [showActions, setShowActions] = useState(null);

	const [params, setParams] = useState({
		sort_by    : 'created_at',
		sort_type  : 'desc',
		page_limit : 10,
		page       : 1,
		filters    : {
			q: searchQuery || undefined,
		},
	});

	// const [globalFilters, setGlobalFilters] = useState({
	// 	status   : undefined,
	// 	tags     : undefined,
	// 	category : undefined,

	// });

	const [{ loading, data }, refetch] = useRequest({
		url    : 'list_page_builder_dynamic_pages',
		method : 'get',
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

	const router = useRouter();

	const handleOnClick = (id) => {
		router.push('/page-builder/[id]', `/page-builder/${id}`);
	};

	const columns = [

		{
			id       : 'page_name',
			Header   : 'Name',
			accessor : ({ page_name, id }) => (
				<section style={{ cursor: 'pointer' }} role="presentation" onClick={() => handleOnClick(id)}>
					{startCase(page_name) || '___'}
				</section>

			),
		},
		{
			id       : 'page_url',
			Header   : 'Page URL',
			accessor : ({ page_url = '' }) => (
				<section>
					{page_url || '___'}

				</section>

			),
		},
		{
			id       : 'page_description',
			Header   : 'Page Description',
			accessor : ({ page_description }) => (
				<section>
					{page_description || '__'}
				</section>
			),
		},
		{
			id       : 'category',
			Header   : 'Category',
			accessor : ({ category }) => (
				<section>
					{category || '___'}
				</section>
			),
		},
		// {
		// 	id       : 'tags',
		// 	Header   : 'Tags',
		// 	accessor : ({ tags }) => (
		// 		<div className={styles.schedule_type}>
		// 			<Badge color={CONFIGURATIONS_STATUS_COLOR_MAPPING[tags]} style={{ margin: '0px 8px' }} />
		// 			{startCase(tags || '___') }
		// 		</div>
		// 	),
		// },

		{
			id       : 'created_at',
			Header   : 'Create At',
			accessor : ({ created_at }) => (

				<section>
					{formatDate({
						date       : created_at,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType : 'date',
					}) || '-'}

				</section>
			),
		},
		{
			Header   : 'STATUS',
			key      : 'status',
			id       : 'status',
			accessor : ({
				status = '',
			}) => (
				<Pill
					size="md"
					color={STATUS_MAPPING[status]?.color}
				>
					{STATUS_MAPPING[status]?.status || 'Nil'}
				</Pill>
			),
		},
		{
			Header   : 'Actions',
			accessor : (item) => (
				<div>
					<Popover
						placement="left"
						interactive
						render={(
							<Actions refetch={refetch} item={item} />

						)}
					>
						<div>
							<IcMOverflowDot
								height={16}
								width={16}
								style={{ cursor: 'pointer' }}
							/>
						</div>
					</Popover>
				</div>
			),
		},
	];

	return {
		showCreatePage,
		setShowCreatePage,
		columns,
		list,
		loading,
		paginationData,
		getNextPage,
		refetch,
		params,
		setParams,
		setSearchValue,
		searchValue,
		debounceQuery,
	};
};

export default useListPages;
