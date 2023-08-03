import { Pill, Popover, Tooltip } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils/';
import { useState, useEffect } from 'react';

import {
	CONFIGURATIONS_STATUS_COLOR_MAPPING,
} from '../configurations/status-configuration-mapping';
import Actions from '../page-components/DynamicPagesList/components/Actions';
import styles from '../page-components/DynamicPagesList/components/List/styles.module.css';

const useDynamicPagesList = () => {
	const { debounceQuery, query: searchQuery = '' } = useDebounceQuery();

	const [searchValue, setSearchValue] = useState('');
	const [showCreatePage, setShowCreatePage] = useState(false);

	const [params, setParams] = useState({
		sort_by    : 'created_at',
		sort_type  : 'desc',
		page_limit : 10,
		page       : 1,
		filters    : {
			q: searchQuery || undefined,
		},
	});

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
				<section
					style={{
						cursor         : 'pointer',
						textDecoration : 'underline',
					}}
					role="presentation"
					onClick={() => handleOnClick(id)}
				>
					{startCase(page_name) || '___'}
				</section>

			),
		},
		{
			id       : 'page_url',
			Header   : 'URL',
			accessor : ({ page_url = '' }) => (

				<section>
					{page_url || '___'}
				</section>

			),
		},
		{
			id       : 'page_description',
			Header   : 'Description',
			accessor : ({ page_description }) => {
				const renderDescription = startCase(page_description);
				return (
					<Tooltip content={renderDescription} placement="bottom">
						<div className={styles.description}>{renderDescription || '___'}</div>
					</Tooltip>
				);
			},
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
		{
			id     : 'tags',
			Header : 'Tags',

			accessor: ({ tags = [] }) => {
				const totalTags = tags.length;

				if (totalTags === 0) {
					return '___';
				}

				const renderToolTip = tags.map((tag) => (
					<Pill size="md" color="orange">
						{startCase(tag)}
					</Pill>
				));

				return (
					<Tooltip content={renderToolTip} placement="bottom">
						<div className={styles.overflow_flex}>
							<div className={styles.tags_container}>
								{startCase(tags?.[0] || '___')}
							</div>
							{totalTags > 1 && (
								<strong>
									(+
									{totalTags - 1}
									)
								</strong>
							)}
						</div>
					</Tooltip>
				);
			},
		},

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
					color={CONFIGURATIONS_STATUS_COLOR_MAPPING[status]?.color}
				>
					{CONFIGURATIONS_STATUS_COLOR_MAPPING[status]?.status || 'Nil'}
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

export default useDynamicPagesList;
