import { Toast, Checkbox } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import { FilterInterface } from '../Accruals/interface';

interface ShipmentInterface {
	filters?:FilterInterface
	setCheckedRows: React.Dispatch<React.SetStateAction<{}>>
	checkedRows?:object
}

const useShipmentView = ({ filters, checkedRows, setCheckedRows }:ShipmentInterface) => {
	const { user_id:userId } = useSelector(({ profile }) => ({
		user_id: profile?.user?.id,
	}));
	const [checkedRowsSerialId, setCheckedRowsSerialId] = useState([]);
	const [tempCheckedData, setTempCheckedData] = useState([]);
	const [payload, setPayload] = useState([]);
	const [checkedData, setCheckedData] = useState([]);
	const [apiData, setApiData] = useState({ pageNo: 0, totalPages: 0, total: 0, totalRecords: 0, list: [] });
	const {
		year = '', month = '', shipmentType = '',
		profitAmount = '', profitType = '', tradeType = '', service = '', range,
		jobState = '', query = '',
	} = filters || {};

	const rangeMapping = {
		'>'  : 'gt',
		'>=' : 'gte',
		'<'  : 'lt',
		'<=' : 'lte',
	};

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
			url     : 'pnl/accrual/add-to-selected',
			method  : 'post',
			authKey : 'post_pnl_accrual_add_to_selected',
		},
		{ manual: true },
	);

	const refetch = async () => {
		try {
			const resp = await shipmentTrigger({
				params: {
					query                : query || undefined,
					year                 : year || undefined,
					month                : month || undefined,
					serviceType          : service || undefined,
					tradeType            : tradeType || undefined,
					jobType              : shipmentType || undefined,
					profitComparisonType : rangeMapping[range] || undefined,
					jobState             : jobState || undefined,
					profitAmount         : profitAmount || undefined,
					profitType           : profitType || undefined,
					page                 : 1,
					pageLimit            : 10,
					// page,
					// sortType,
				},
			});
			setApiData(resp.data);
		} catch (error) {
			setApiData({ pageNo: 0, totalPages: 0, total: 0, totalRecords: 0, list: [] });
			// toast.error(error?.data?.message);
		}
	};

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
		} else {
			setPayload([]);
		}
	};
	const getTableHeaderCheckbox = () => {
		const { page: pages = 0 } = paginationData;
		const isAllRowsChecked = !isEmpty(groupListData)
		&& (checkedRows?.[`page-${pages}`] || []).length === (groupListData || []).length;
		const isSemiRowsChecked = (checkedRows?.[`page-${pages}`] || []).length > 0;

		return (
			<Checkbox
				style={{ padding: '8px', left: '8px' }}
				semiChecked={isSemiRowsChecked}
				checked={isAllRowsChecked}
				onChange={onChangeTableHeaderCheckbox}
			/>
		);
	};

	useEffect(() => {
		if (tempCheckedData) {
			setCheckedData(tempCheckedData);
		}
	}, [tempCheckedData]);

	const onChangeTableBodyCheckbox = (event, item) => {
		const { page: pages = 0 } = paginationData;
		console.log(checkedRows, 'checkedRows');
		if (event?.target?.checked) {
			setCheckedRows({
				...checkedRows,
				[`page-${pages}`]: [
					...(checkedRows?.[`page-${pages}`] || []),
					`${item?.jobId || ''}`,
				],
			});
			setPayload([...payload, item]);
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

	const getTableBodyCheckbox = (item) => {
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
	};
	const addSelect = async (setOpenModal) => {
		const newPayload = payload.map((item) => ({
			...item,
			// expenseCurrency : geo.country.currency.code,
			// incomeCurrency  : geo.country.currency.code,
		}));
		try {
			const res = await addToSelectedTrigger({
				data: {
					shipmentList : newPayload,
					performedBy  : userId,
				},
			});
			if (res.data) {
				refetch();
				Toast.success(res.data);
				setPayload([]);
				setOpenModal(false);
			}
			// setCheckedData([]);
		} catch (error) {
			Toast.error(error?.data?.message);
		}
	};

	return {
		refetch,
		shipmentViewData,
		shipmentLoading,
		getTableBodyCheckbox,
		setPayload,
		selectedData,
		addSelect,
		checkedRowsSerialId,
		payload,
		selectedDataLoading,
		getTableHeaderCheckbox,
		checkedData,
	};
};
export default useShipmentView;
