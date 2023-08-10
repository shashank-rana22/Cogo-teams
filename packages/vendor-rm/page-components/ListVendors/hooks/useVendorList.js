import { Tooltip, Button } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMCrossInCircle, IcCFtick, IcMArrowRotateDown, IcMArrowRotateUp, IcMError } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { format, isEmpty, startCase } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import styles from '../styles.module.css';

const ICON_STYLE = {
	height : '16px',
	width  : '16px',
};

const FIRST_INDEX = 1;

const ICON_MAPPING = {
	pending_verification : <IcMError {...ICON_STYLE} />,
	pending_from_user    : <IcMError {...ICON_STYLE} />,
	verified             : <IcCFtick {...ICON_STYLE} />,
	rejected             : <IcMCrossInCircle {...ICON_STYLE} />,
};

const iconFilterMapping = [
	{
		icon       : IcMArrowRotateUp,
		asc        : '#f68b21',
		filterType : 'asc',
		style      : { paddingTop: '2px' },
	},
	{
		icon       : IcMArrowRotateDown,
		desc       : '#f68b21',
		filterType : 'desc',
		style      : { paddingBottom: '2px' },
	},
];

const renderToolTipContent = (UNIQUE_SERVICES) => (
	<div>
		{(UNIQUE_SERVICES || []).map((item, index) => {
			if (index === GLOBAL_CONSTANTS.zeroth_index) {
				return null;
			}
			return <div key={item}>{startCase(item)}</div>;
		})}
	</div>
);

const renderUniqueServices = ({ services, type }) => {
	if (isEmpty(services)) return null;

	const UNIQUE_SERVICES = [];

	(services || []).forEach((item) => {
		if (type === 'category') {
			if (!UNIQUE_SERVICES.includes(item?.category)) {
				UNIQUE_SERVICES.push(item?.category);
			}
		} else if (!UNIQUE_SERVICES.includes(item?.sub_category)) {
			UNIQUE_SERVICES.push(item?.sub_category);
		}
	});

	const length = UNIQUE_SERVICES?.length;

	return (
		<div style={{ display: 'flex' }}>
			{startCase(UNIQUE_SERVICES?.[GLOBAL_CONSTANTS.zeroth_index])}
			<Tooltip
				content={renderToolTipContent(UNIQUE_SERVICES)}
				placement="left"
			>
				{length - FIRST_INDEX > GLOBAL_CONSTANTS.zeroth_index ? (
					<div className={styles.underline}>
						(+
						{length - FIRST_INDEX}
						{' '}
						more)
					</div>
				) : null}
			</Tooltip>
		</div>
	);
};

const useVendorList = () => {
	const { debounceQuery, query: searchQuery } = useDebounceQuery();

	const [searchValue, setSearchValue] = useState();

	const [params, setParams] = useState({
		filters: {
			status : 'active',
			q      : searchQuery || undefined,
		},
		page                     : 1,
		pagination_data_required : true,
	});

	const [showFilter, setShowFilter] = useState(false);

	const router = useRouter();

	const [{ data, loading }] = useRequest({
		method : 'get',
		url    : '/list_vendors',
		params,
	}, { manual: false });

	useEffect(() => {
		setParams((prevParams) => ({
			...prevParams,
			filters: {
				...prevParams.filters,
				q: searchQuery || undefined,
			},
		}));
	}, [searchQuery]);

	const handleViewMore = (id) => {
		const HREF = '/vendors/[vendor_id]';
		const as = `/vendors/${id}`;
		router.push(HREF, as);
	};

	const handleChangeQuery = (value) => {
		setSearchValue(value);
		debounceQuery(value);
	};

	const expectedFilters = ['category', 'sub_categpry', 'registration_number'];
	const isFilterInUse = expectedFilters.some((item) => Object.keys(params?.filters).includes(item));

	const getHeader = () => (
		<div className={styles.created_at_header}>
			<div>
				CREATED AT
			</div>
			<div className={styles.filter_icon_container}>
				{
					iconFilterMapping.map((item) => {
						const { icon: Icon, filterType = '', style = {} } = item;
						return (
							<Icon
								key={filterType}
								fill={item[params?.sort_type] || '#000'}
								onClick={() => setParams((pv) => ({
									...pv,
									sort_type: filterType,
								}))}
								style={style}
							/>
						);
					})
				}
			</div>
		</div>
	);

	const columns = [
		{
			Header   : 'VENDOR ID',
			id       : 'vendor_id',
			accessor : ({ serial_id = '' }) => (
				<section className={styles.bold}>
					#
					{serial_id}
				</section>
			),
		},
		{
			Header   : 'KYC STATUS',
			id       : 'kyc_status',
			accessor : ({ kyc_status = '' }) => (
				<section className={styles[kyc_status]}>
					{ICON_MAPPING[kyc_status]}
					{startCase(kyc_status)}
				</section>
			),
		},
		{
			Header   : 'NAME',
			id       : 'name',
			accessor : ({ business_name = '' }) => (
				<section className={styles.bold}>
					{startCase(business_name)}
				</section>
			),
		},
		{
			Header   : 'PAN',
			id       : 'registration_number',
			accessor : ({ registration_number = '' }) => (
				<section className={styles.bold}>
					{registration_number}
				</section>
			),
		},
		{
			Header   : 'CATEGORY',
			id       : 'category',
			accessor : ({ services = [] }) => (
				<section className={styles.bold}>
					{renderUniqueServices({ services, type: 'category' })}
				</section>
			),
		},
		{
			Header   : getHeader(),
			id       : 'created_at',
			accessor : ({ created_at = '' }) => (
				<section className={styles.bold}>
					{format(
						created_at,
						GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						{},
						false,
					)}
				</section>
			),
		},
		{
			Header   : '',
			id       : 'view_more',
			accessor : ({ id = '' }) => (
				<section className={styles.bold}>
					<Button
						size="md"
						themeType="secondary"
						onClick={() => handleViewMore(id)}
					>
						VIEW MORE
					</Button>
				</section>
			),
		},
	];

	return {
		loading,
		data,
		params,
		setParams,
		columns,
		showFilter,
		setShowFilter,
		searchValue,
		handleChangeQuery,
		isFilterInUse,
	};
};

export default useVendorList;
