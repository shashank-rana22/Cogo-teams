import { Toast, Checkbox } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { format, isEmpty } from '@cogoport/utils';
import { useCallback, useEffect, useRef, useState } from 'react';

import calculateAccrue from './calculateAccrue';

const RANGE_MAPPING = {
	''      : '',
	'>'     : 'gt',
	'>='    : 'gte',
	'<'     : 'lt',
	'<='    : 'lte',
	'<=x=<' : 'btw',
};
const useShipmentView = ({
	filters = {}, checkedRows = {}, setCheckedRows = () => {},
	setBulkSection = () => {},
}) => {
	const didMountRef = useRef(false);
	const { user_id:userId } = useSelector(({ profile }) => ({
		user_id: profile?.user?.id,
	}));
	const [searchValue, setSearchValue] = useState('');
	const [checkedRowsSerialId, setCheckedRowsSerialId] = useState([]);
	const [viewSelected, setViewSelected] = useState(true);
	const [tempCheckedData, setTempCheckedData] = useState([]);
	const [payload, setPayload] = useState([]);
	const [profitValue, setProfitValue] = useState(0);
	const [checkedData, setCheckedData] = useState([]);
	const [profit, setProfit] = useState([]);
	const [apiData, setApiData] = useState({ pageNo: 0, totalPages: 0, total: 0, totalRecords: 0, list: [] });
	const {
		year = '', month = '', shipmentType = '',
		profitAmount = '', profitType = '', tradeType = '', service = '', range,
		jobState = '', page, date, profitPercent = '', profitPercentUpper = '', profitAmountUpper = '',
		sortType = '', sortBy = '', entity = '', channel = '', milestone = '',
	} = filters || {};

	const entityDetails = GLOBAL_CONSTANTS.cogoport_entities[entity] || {};

	const { id: entityId } = entityDetails;

	const { startDate, endDate } = date || {};

	const { calAccruePurchase, calAccrueSale } = calculateAccrue();
	const { query = '', debounceQuery } = useDebounceQuery();

	useEffect(() => {
		debounceQuery(searchValue);
	}, [searchValue, debounceQuery]);

	const [
		{ data:shipmentViewData, loading:shipmentLoading },
		shipmentTrigger,
	] = useRequestBf(
		{
			url     : 'pnl/accrual/shipments',
			method  : 'get',
			authKey : 'get_pnl_accrual_shipments',
		},
		{ manual: true },
	);

	const [
		{ data:selectedData, loading:selectedDataLoading },
		addToSelectedTrigger,
	] = useRequestBf(
		{
			url     : '/pnl/accrual/book-unbilled-shipments',
			method  : 'post',
			authKey : 'post_pnl_accrual_book_unbilled_shipments',
		},
		{ manual: true },
	);

	const refetch = useCallback(async () => {
		try {
			const resp = await shipmentTrigger({
				params: {
					query                : query || undefined,
					shipmentMilestone    : milestone || undefined,
					year                 : year || undefined,
					month                : month || undefined,
					serviceType          : service || undefined,
					tradeType            : tradeType || undefined,
					jobType              : shipmentType || undefined,
					entityCode           : entity || undefined,
					entityId             : entityId || undefined,
					profitComparisonType : RANGE_MAPPING[range] || undefined,
					jobState             : jobState || undefined,
					lowerProfitMargin    : profitAmount || profitPercent || undefined,
					profitType           : profitType || undefined,
					sortType             : sortType || undefined,
					channel              : channel || undefined,
					sortBy               : sortBy || undefined,
					upperProfitMargin    : profitAmountUpper || profitPercentUpper || undefined,
					startDate            : (startDate && endDate) ? format(startDate, 'yyy-MM-dd') : undefined,
					endDate              : (startDate && endDate) ? format(endDate, 'yyy-MM-dd') : undefined,
					page                 : page || undefined,
					pageLimit            : 10,
					archiveStatus        : 'UNBILLED',
				},
			});
			const data = { ...resp.data };
			const dataList = data?.list;
			(dataList || []).map((item, index) => {
				dataList[index] = {
					...item,
					newProfitPercentage: item.profitPercentage,
				};
				return dataList[index];
			});
			setApiData(resp.data);
		} catch (error) {
			if (error?.response?.data?.message) {
				Toast.error(error?.response?.data?.message);
			}
			setApiData({ pageNo: 0, totalPages: 0, total: 0, totalRecords: 0, list: [] });
		}
	}, [
		startDate,
		endDate,
		jobState,
		month,
		page,
		profitAmount,
		profitAmountUpper,
		profitPercent,
		profitPercentUpper,
		profitType,
		query,
		range,
		service,
		shipmentTrigger,
		shipmentType,
		sortBy,
		sortType,
		tradeType,
		year,
		entity,
		entityId,
		milestone,
		channel,
	]);

	useEffect(() => {
		if (didMountRef.current === false) {
			didMountRef.current = true;
		}
		if (query) {
			refetch();
		}
	}, [query, refetch, page, sortType, sortBy, year, month, viewSelected]);

	const {
		pageNo: pageNos = 0,
		totalPages = 0,
		total = 0,
		totalRecords = 0,
		list = [],
	} = apiData || {};

	const groupListData = list || [];

	const paginationData = {
		page      : pageNos,
		totalPage : totalPages,
		total,
		totalRecords,
	};

	useEffect(() => {
		const itemData = (list || []).filter((item) => checkedRowsSerialId.find((x) => x === item.jobId));
		setTempCheckedData(() => [...itemData]);
	}, [checkedRowsSerialId, apiData, list]);

	useEffect(() => {
		if (tempCheckedData) {
			setCheckedData(tempCheckedData);
		}
	}, [tempCheckedData]);

	useEffect(() => {
		setCheckedRowsSerialId([
			...Object.keys(checkedRows).reduce(
				(previousSerialIds, currentSerialId) => [
					...previousSerialIds,
					...(checkedRows?.[currentSerialId] || []),
				],
				[],
			),
		]);
	}, [checkedRows]);

	const onChangeTableHeaderCheckbox = (event) => {
		const { page: pages = 0 } = paginationData;
		setCheckedRows({
			...checkedRows,
			[`page-${pages}`]: event?.target?.checked
				? (groupListData || [])?.map(({ jobId }) => `${jobId || ''}`)
				: [],
		});

		if (event?.target?.checked) {
			setPayload([...list]);
			setBulkSection(() => ({ value: true }));
		} else {
			setPayload([]);
		}
	};
	function GetTableHeaderCheckbox() {
		const { page: pages = 0 } = paginationData;
		const isAllRowsChecked = !isEmpty(groupListData)
		&& (checkedRows?.[`page-${pages}`] || []).length === (groupListData || []).length;

		return (
			<Checkbox
				style={{ padding: '8px' }}
				checked={isAllRowsChecked}
				onChange={onChangeTableHeaderCheckbox}
			/>
		);
	}

	const onChangeTableBodyCheckbox = (event, item) => {
		const { page: pages = 0 } = paginationData;
		if (event?.target?.checked) {
			setCheckedRows({
				...checkedRows,
				[`page-${pages}`]: [
					...(checkedRows?.[`page-${pages}`] || []),
					`${item?.jobId || ''}`,
				],
			});
			setPayload([...payload, item]);
			setBulkSection(() => ({ value: false }));
		} else {
			setCheckedRows({
				...checkedRows,
				[`page-${pages}`]: (checkedRows?.[`page-${pages}`] || []).filter(
					(serialId) => serialId !== `${item?.jobId || ''}`,
				),
			});
			const filtered = payload?.filter((it) => it?.jobId !== item?.jobId);
			setPayload([...filtered]);
		}
	};

	function GetTableBodyCheckbox(item) {
		const { page: pages = 0 } = paginationData;
		const isChecked = (checkedRows?.[`page-${pages}`] || []).includes(
			`${item?.jobId || ''}`,
		);

		return (
			<Checkbox
				checked={isChecked}
				onChange={(event) => onChangeTableBodyCheckbox(event, item)}
			/>
		);
	}

	const addSelect = async (setOpenModal) => {
		const newPayload = payload.map((item) => ({
			...item,
		}));

		try {
			const res = await addToSelectedTrigger({
				data: {
					shipmentList   : newPayload,
					performedBy    : userId,
					archivedStatus : 'UNBILLED',
					selectionMode  : 'SINGLE',
					jobListRequest : {
						query                : query || undefined,
						year                 : year || undefined,
						month                : month || undefined,
						serviceType          : service || undefined,
						tradeType            : tradeType || undefined,
						jobType              : shipmentType || undefined,
						profitComparisonType : RANGE_MAPPING[range] || undefined,
						jobState             : jobState || undefined,
						lowerProfitMargin    : profitAmount || profitPercent || undefined,
						upperProfitMargin    : profitAmountUpper || profitPercentUpper || undefined,
						profitType           : profitType || undefined,
						startDate            : startDate ? format(startDate, 'yyy-MM-dd') : undefined,
						endDate              : endDate ? format(endDate, 'yyy-MM-dd') : undefined,
						pageLimit            : apiData?.totalRecords,
						page                 : 1,
					},
				},
			});
			if (res.data) {
				refetch();
				Toast.success('SUCCESS');
				setPayload([]);
				setOpenModal(false);
			}
		} catch (error) {
			if (error?.response?.data?.message) {
				Toast.error(error?.response?.data?.message);
			}
		}
	};

	const editProfitHandler = (itemData, editable = true) => {
		setApiData((prev) => {
			const data = { ...prev };
			const dataList = data?.list;
			const index = dataList?.findIndex(
				(item) => item?.jobId === itemData.jobId,
			);
			if (index !== -1) {
				dataList[index] = {
					...itemData,
					editProfit: editable,
				};
			}
			return { ...data, list: dataList };
		});
	};
	const changeProfitHandler = (value) => {
		setProfitValue(value);
	};
	const crossProfitHandler = (itemData) => {
		const { incomeBooked = 0, expenseBooked = 0 } = itemData || {};
		const totalProfit = +incomeBooked - +expenseBooked;
		setApiData((prev) => {
			const data = { ...prev };
			const dataList = data?.list;
			const index = dataList?.findIndex(
				(item) => item?.jobId === itemData.jobId,
			);
			if (index !== -1) {
				dataList[index] = {
					...itemData,
					newProfitPercentage : itemData.profitPercentage,
					expenseAccrued      : 0,
					incomeAccrued       : 0,
					profit              : totalProfit,
					editProfit          : false,
				};
			}
			return { ...data, list: dataList };
		});
		setProfit((p) => ({ ...p, [itemData.jobId]: undefined }));
	};

	const tickProfitHandler = (itemData) => {
		let incomeAccruedValue = '0';
		let expenseAccruedValue = '0';
		if (+profitValue - +itemData.profitPercentage === 0) {
			incomeAccruedValue = '0';
			expenseAccruedValue = '0';
		} else if (+profitValue - +itemData.profitPercentage > 0) {
			incomeAccruedValue = calAccrueSale(itemData, profitValue);
		} else {
			expenseAccruedValue = calAccruePurchase(itemData, profitValue);
		}
		const { incomeBooked = 0, expenseBooked = 0 } = itemData || {};
		const totalSales = +incomeBooked + +incomeAccruedValue;
		const totalPurchase = +expenseBooked + +expenseAccruedValue;
		const totalProfit = totalSales - totalPurchase;
		setApiData((prev) => {
			const data = { ...prev };
			const dataList = data?.list;
			const index = dataList?.findIndex(
				(item) => item?.jobId === itemData.jobId,
			);
			if (index !== -1) {
				dataList[index] = {
					...itemData,
					newProfitPercentage : profitValue,
					incomeAccrued       : incomeAccruedValue,
					expenseAccrued      : expenseAccruedValue,
					profit              : totalProfit.toFixed(4),
					editProfit          : false,
				};
			}
			return { ...data, list: dataList };
		});
		const { page: pages = 0 } = paginationData;
		if (checkedRows[`page-${pages}`]?.includes(itemData?.jobId)) {
			const newPayload = payload.map((i) => {
				const newElement = i;
				if (itemData.jobId === i.jobId) {
					newElement.newProfitPercentage = profitValue;
					newElement.expenseAccrued = expenseAccruedValue;
					newElement.incomeAccrued = incomeAccruedValue;
				}
				return newElement;
			});
			setPayload([...newPayload]);
		}
		setProfit({ ...profit, [itemData.jobId]: profitValue });
		setProfitValue(0);
	};

	return {
		refetch,
		shipmentViewData,
		shipmentLoading,
		changeProfitHandler,
		crossProfitHandler,
		tickProfitHandler,
		GetTableBodyCheckbox,
		setPayload,
		selectedData,
		editProfitHandler,
		profitValue,
		profit,
		addSelect,
		apiData,
		checkedRowsSerialId,
		payload,
		selectedDataLoading,
		GetTableHeaderCheckbox,
		checkedData,
		viewSelected,
		setViewSelected,
		setSearchValue,
		searchValue,
	};
};
export default useShipmentView;
