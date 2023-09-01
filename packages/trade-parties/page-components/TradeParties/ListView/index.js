import { Table, Button } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';

import styles from './styles.module.css';

const DATA_KEYS = [
	'serial_id',
	'registration_number',
	'legal_business_name',
	'country',
	'company_type',
	'view_details',
	'created_at',
	'organization_trade_parties_count',
];
function ListView({
	typeOfSearch,
	globalSearch,
	page,
	setTotalCount,
	setTotalPages,
	filterParams,
	setPageLimit,
}) {
	const [listData, setListData] = useState('');
	const [tableData, setTableData] = useState([]);

	const { query = '', debounceQuery } = useDebounceQuery();

	const getHeader = (title, key) => ({
		Header   : title,
		accessor : key,
	});
	const tableColumns = [
		getHeader('ID', 'serial_id'),
		getHeader('BUSINESS NAME', 'legal_business_name'),
		getHeader('REGISTRATION NUMBER', 'registration_number'),
		getHeader('COUNTRY', 'country'),
		getHeader('COMPANY TYPE', 'company_type'),
		getHeader('LINKED COUNT', 'organization_trade_parties_count'),
		getHeader('CREATED AT', 'created_at'),
		getHeader('DETAILS', 'view_details'),
	];

	useEffect(() => {
		debounceQuery(globalSearch);
	}, [globalSearch, debounceQuery]);
	const setSearchFilters = () => {
		if (!globalSearch) return null;

		if (typeOfSearch === 'trade_party') {
			return {
				q: query,
			};
		}

		return {
			sage_organization_id: globalSearch,
		};
	};
	const [trigger] = useRequest(
		{
			url    : '/list_organization_trade_party_details',
			params : {
				page,
				organization_trade_parties_data_required : true,
				filters                                  : {
					trade_party_type: ['self', 'paying_party', 'collection_party'],
					...setSearchFilters(),
					...filterParams,
					// ...filters,
				},
			},
		},
		{ manual: true },
	);
	const apiTrigger = useCallback(async () => {
		try {
			const res = await trigger({});
			// console.log("list",res.DATA);
			setTotalCount(res.data.total_count);
			setTotalPages(res.data.total);
			setListData(res.data);
			setPageLimit(res.data.page_limit);
		} catch (err) {
			// console.log("error occured");
			/// /console.log(err);
		}
	}, [trigger, setTotalCount, setTotalPages, setListData, setPageLimit]);
	useEffect(() => {
		apiTrigger();
	}, [page, typeOfSearch, globalSearch, query, filterParams, apiTrigger]);

	// useEffect(()=>{
	//   useListOrganizationTradePartyDetails({
	//     page,
	//     searchQuery:setSearchFilters(),
	//     filterParams,
	//   });

	// },[])

	const formatArrayValues = (items, is_startcase = true) => {
		const formattedItem = items?.map((item) => (is_startcase ? startCase(item) : item));
		return formattedItem.join(', ') || '';
	};

	useEffect(() => {
		const DATA = [];
		listData?.list?.forEach((item) => {
			const formattedData = {
				serial_id: (
					<div className={styles.serial_id}>{`# ${item.serial_id}`}</div>
				),
				legal_business_name : item.legal_business_name,
				registration_number : item.registration_number,
				country             : item.country?.display_name,
				company_type        : item.company_type,
				created_at          : formatDate({
					date       : item.created_at,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					formatType : 'date',
				}),
				view_details: (
					<Link href={`trade-parties/${item.id}`}>
						<Button size="md" themeType="secondary">
							View details
						</Button>
					</Link>
				),
				organization_trade_parties_count: (
					<div>
						{item.organization_trade_parties_count}
						{item.all_trade_party_types?.length ? (
							<span style={{ marginLeft: 4 }}>
								(
								{formatArrayValues(item.all_trade_party_types)}
								)
							</span>
						) : null}
					</div>
				),
			};

			const DATA_TO_PUSH = {};

			DATA_KEYS?.forEach((dataKey) => {
				DATA_TO_PUSH[dataKey] = formattedData[dataKey] || item[dataKey] || '-';
			});

			DATA.push(DATA_TO_PUSH);
		});

		setTableData(DATA);
	}, [listData]);

	return (
		<div>
			<Table columns={tableColumns} DATA={tableData} className={styles.table} />
		</div>
	);
}

export default ListView;
