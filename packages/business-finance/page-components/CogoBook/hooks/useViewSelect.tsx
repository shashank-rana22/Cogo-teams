import { Checkbox, Toast } from '@cogoport/components';
import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

const useViewSelect = (filters, query) => {
	const { debounceQuery } = useDebounceQuery();
	const [checkedRowsSerialId, setCheckedRowsSerialId] = useState([]);
	const [checkedRows, setCheckedRows] = useState({});
	const [checkedData, setCheckedData] = useState([]);
	const [viewData, setViewData] = useState({ pageNo: 0, totalPages: 0, total: 0, totalRecords: 0, list: [] });

	const {
		search,
		archivedStatus,
		date,
		range,
		jobType,
		profit,
	} = filters || {};

	const { service = '', shipmentType = '' } = query || {};

	useEffect(() => {
		debounceQuery(search !== '' ? search : undefined);
	}, [debounceQuery, search]);

	useEffect(() => {
		debounceQuery(search !== '' ? search : undefined);
	}, [debounceQuery, search]);

	const { user_id:userId } = useSelector(({ profile }) => ({
		user_id: profile.id,

	}));

	const [
		{ data:viewSelectedSidData, loading:viewSelectedSidLoading },
		viewSelectedSidTrigger,
	] = useRequestBf(
		{
			url     : 'pnl/accrual/view-selected',
			method  : 'get',
			authKey : 'get_pnl_accrual_view_selected',
		},
		{ manual: true },
	);

	const viewSelected = async () => {
		try {
			const resp = await viewSelectedSidTrigger({
				params: {
					...query,
					date           : date || undefined,
					jobType        : jobType || undefined,
					profit         : profit || undefined,
					range          : range || undefined,
					archivedStatus : archivedStatus || 'BOOKED' || undefined,
					serviceType    : service !== '' ? service : undefined,
					shipment       : shipmentType !== '' ? shipmentType : undefined,
					search         : search || undefined,
				},
			});
			if (resp.data) localStorage.setItem('viewKey', resp.data);
			setViewData(resp.data);
			setCheckedRows({});
		} catch (error) {
			setViewData({ pageNo: 0, totalPages: 0, total: 0, totalRecords: 0, list: [] });
			// toast.error(error?.data?.message);
		}
	};

	useEffect(() => {
		viewSelected();
	}, [archivedStatus]);

	const [
		{ data:actionConfirmedData, loading:actionConfirmedLoading },
		actionConfirmedTrigger,
	] = useRequestBf(
		{
			url     : 'pnl/accrual/archive',
			method  : 'patch',
			authKey : 'patch_pnl_accrual_archive',
		},
		{ manual: true },
	);

	const actionConfirm = async (isBookedActive) => {
		const actionStatus = isBookedActive ? 'BOOK' : 'ACCRUE';
		try {
			const rep = await actionConfirmedTrigger({
				data: {
					archiveShipmentIds : checkedRowsSerialId,
					performedBy        : userId,
					actionStatus,
				},
			});
			if (rep) {
				viewSelected();
			}
		} catch (error) {
			Toast.error(error?.data?.message);
		}
	};

	const [
		{ data:deleteSelectedInvoiceData, loading:deleteSelectedInvoiceLoading },
		deleteSelectedInvoiceTrigger,
	] = useRequestBf(
		{
			url     : 'pnl/accrual/archive',
			method  : 'delete',
			authKey : 'delete_pnl_accrual_archive',
		},
		{ manual: true },
	);

	const deleteSelected = async (id, handleModal) => {
		try {
			await deleteSelectedInvoiceTrigger({
				params: { ids: id },
			});
			handleModal(false);
			viewSelected();
			Toast.success('Deleted successfully');
		} catch (error) {
			Toast.error(error?.data?.message);
		}
	};

	const {
		pageNo: pageNos = 0,
		totalPages = 0,
		total = 0,
		totalRecords = 0,
		list = [],
	} = viewData || {};

	const groupListData = list || [];

	const paginationData = {
		page      : pageNos,
		totalPage : totalPages,
		total,
		totalRecords,
	};

	useEffect(() => {
		const itemData = (list || []).filter((item) => checkedRowsSerialId.find((x) => x === item.id));
		setCheckedData(itemData);
	}, [checkedRowsSerialId, viewData]);

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
		event.stopPropagation();

		const { page = 0 } = paginationData;

		setCheckedRows({
			...checkedRows,
			[`page-${page}`]: event?.target?.checked
				? (groupListData || [])?.map(({ id }) => `${id || ''}`)
				: [],
		});
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

	const onChangeTableBodyCheckbox = (event, item) => {
		event.stopPropagation();
		const { pageNo = 0 } = item;
		const { page = 0 } = paginationData;
		if (event.target.checked) {
			setCheckedRows({
				...checkedRows,
				[`page-${page}`]: [
					...(checkedRows?.[`page-${page}`] || []),
					`${item?.id || ''}`,
				],
			});
		} else {
			setCheckedRows({
				...checkedRows,
				[`page-${pageNo || page}`]: (
					checkedRows?.[`page-${pageNo || page}`] || []
				).filter((serialId) => serialId !== `${item?.id || ''}`),
			});
		}
	};

	const getTableBodyCheckbox = (item) => {
		const { page = 0 } = paginationData;

		const isChecked = (checkedRows?.[`page-${page}`] || []).includes(
			`${item?.id || ''}`,
		);

		return (
			<Checkbox
				checked={isChecked}
				onChange={(event) => onChangeTableBodyCheckbox(event, item)}
			/>
		);
	};

	return {
		getTableHeaderCheckbox,
		getTableBodyCheckbox,
		actionConfirm,
		viewSelected,
		deleteSelected,
		setCheckedRows,
		checkedRowsSerialId,
		checkedData,
		viewData,
		viewSelectedSidData,
		loading: viewSelectedSidLoading,
		actionConfirmedData,
		deleteSelectedInvoiceLoading,
		deleteSelectedInvoiceData,
		actionConfirmedLoading,
	};
};

export default useViewSelect;
