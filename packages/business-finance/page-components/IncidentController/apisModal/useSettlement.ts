import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

const useSettlement = ({
	checkedData,
	type = '',
	id,
	incidentMappingId,
	refetch,
	checkResetButton,
	supportingDocUrl,
}) => {
	const [

		{ loading:createMatchLoading },
		createMatchTrigger,
	] = useRequestBf(
		{
			url     : 'payments/settlement/settle',
			method  : 'post',
			authKey : 'post_payments_settlement_settle',
		},
		{ manual: true },
	);

	const [
		{ loading:editMatchLoading },
		editMatchTrigger,
	] = useRequestBf(
		{
			url     : 'payments/settlement/edit',
			method  : 'post',
			authKey : 'post_payments_settlement_edit',
		},
		{ manual: true },
	);

	const [
		{ loading:checkLoading },
		checkTrigger,
	] = useRequestBf(
		{
			url     : 'payments/settlement/check',
			method  : 'post',
			authKey : 'post_payments_settlement_check',
		},
		{ manual: true },
	);

	const [
		{ loading:editCheckLoading },
		editCheckTrigger,
	] = useRequestBf(
		{
			url     : 'payments/settlement/edit-check',
			method  : 'post',
			authKey : 'post_payments_settlement_edit_check',
		},
		{ manual: true },
	);

	const [
		{ loading:rejectLoading },
		rejectTrigger,
	] = useRequestBf(
		{
			url     : 'payments/settlement/reject',
			method  : 'post',
			authKey : 'post_payments_settlemet_reject',
		},
		{ manual: true },
	);

	const editApi = type === 'history' ? editCheckTrigger : checkTrigger;

	const api = type === 'history' ? editMatchTrigger : createMatchTrigger;

	const loading = createMatchLoading || editMatchLoading;

	const loadingData = editCheckLoading || rejectLoading;

	const [changeData, setChangeData] = useState(checkedData || []);

	const { profile } = useSelector((state) => state || {});

	const setCheckedIdData = (itemData) => {
		const removeData = changeData.filter((item) => item.id !== itemData.id);
		setChangeData(removeData);
	};
	const approveData = (changeData || []).map((e) => e.currency);

	const allEqual = (item) => item.every((val) => val === item[0]);

	const nostroBut = (item) => item.every((val) => val === item[0] && val === changeData[0].ledCurrency);

	const approveCheck = allEqual(approveData);

	const nostroButton = nostroBut(approveData);

	useEffect(() => {
		const newData = checkedData?.map((item) => ({
			...item,
			balanceAfterAllocationValue : item.balanceAfterAllocation,
			allocationAmountValue       : item.allocationAmount,
			constTds                    : item.tds,
			constBalanceAmount          : item.balanceAmount,
			afterTdsAmountValue         : item.afterTdsAmount,
			nostroChangeAmount          : item.nostroAmount,
		}));

		setChangeData(newData);
	}, [checkedData, checkResetButton]);

	const setEditedValue = (itemData, value, setAmount, setBalance) => {
		setChangeData((p) => {
			const newValue = p;
			const newList = newValue;
			const index = newList?.findIndex((item) => item?.id === itemData?.id);
			if (index !== -1) {
				newList[index] = {
					...itemData,
					tds                   : value,
					afterTdsAmount        : setAmount,
					balanceAmount         : setBalance,
					tdsEditable           : false,
					allocationAmountValue : setBalance,
				};
			}

			return newList;
		});
	};

	const setAllocationValue = (itemData, value, setBalance, set = false) => {
		setChangeData((p) => {
			const newValue = p;
			const newList = newValue;
			const index = newList?.findIndex((item) => item?.id === itemData?.id);
			if (index !== -1) {
				newList[index] = {
					...itemData,
					allocationAmount       : value,
					balanceAfterAllocation : setBalance,
					allocationEditable     : set,
				};
			}

			return newList;
		});
	};
	const setEditedNostro = (itemData, value, setBalance) => {
		setChangeData((p) => {
			const newValue = p;
			const newList = newValue;
			const index = newList?.findIndex((item) => item?.id === itemData?.id);
			if (index !== -1) {
				newList[index] = {
					...itemData,
					nostroChangeAmount    : value,
					balanceAmount         : setBalance,
					allocationAmountValue : setBalance,
					nostroEditable        : false,
				};
			}

			return newList;
		});
	};
	const handleCrossClick = (itemData, info) => {
		setChangeData((p) => {
			const newValue = p;
			const newList = newValue;
			const index = newList?.findIndex((item) => item?.id === itemData?.id);
			if (index !== -1) {
				if (info === 'tds') {
					newList[index] = {
						...itemData,
						balanceAmount         : itemData.constBalanceAmount,
						afterTdsAmount        : itemData.afterTdsAmountValue,
						nostroChangeAmount    : itemData.nostroAmount,
						allocationAmountValue : itemData.allocationAmount,
						tds                   : itemData.constTds,
						tdsEditable           : false,
						allocationEditable    : false,
						nostroEditable        : false,
					};
				} else {
					newList[index] = {
						...itemData,
						allocationAmountValue  : itemData.balanceAmount,
						balanceAfterAllocation : itemData.balanceAfterAllocationValue,
						tdsEditable            : false,
						allocationEditable     : false,
						nostroEditable         : false,
					};
				}
			}
			return newList;
		});
	};

	const setEditeAble = (itemData, value, setEdit = false, setNost = false) => {
		setChangeData((p) => {
			const newValue = p;

			const newList = newValue;

			const index = newList?.findIndex((item) => item?.id === itemData?.id);

			if (index !== -1) {
				newList[index] = {
					...itemData,
					tdsEditable        : value,
					allocationEditable : setEdit,
					nostroEditable     : setNost,
				};
			}

			return newList;
		});
	};
	const submitMatch = async (value, setShow, newDate, item) => {
		const { remarks = undefined } = item;

		try {
			const payload = {
				stackDetails    : value,
				settlementDate  : newDate || undefined,
				createdBy       : profile.id,
				remark          : remarks,
				incidentId      : id,
				incidentMappingId,
				throughIncident : true,
				supportingDocUrl,
			};
			const response = await api({
				data: payload,
			});

			if (response?.hasError) return;
			setShow(false);
			refetch();

			Toast.success('Settle successfully');
		} catch (error) {
			Toast.error(error?.response?.data?.message);
		}
	};
	const setReject = async (item, setShow) => {
		const { remarks = undefined } = item;
		try {
			await rejectTrigger({
				data: {
					incidentId  : id,
					incidentMappingId,
					remark      : remarks,
					performedBy : profile.user?.id,
				},
			});
			setShow(false);
			refetch();
		} catch (error) {
			Toast.error(error?.response?.data?.message);
		}
	};

	const checkMatching = async (value, newDate) => {
		try {
			const infoData = value.map((item) => ({
				...item,
				nostroAmount     : item.nostroChangeAmount,
				allocationAmount : item.allocationAmountValue,
			}));

			const response = await editApi({
				data: {
					stackDetails    : infoData,
					settlementDate  : newDate || undefined,
					incidentId      : id,
					throughIncident : true,
					incidentMappingId,
					createdBy       : profile.user?.id,
				},
			});
			const { data = {} } = response || {};
			const { stackDetails = [] } = data || {};
			if (response?.hasError) return;

			setChangeData(
				stackDetails.map((item) => ({
					...item,

					constTds                    : item.tds,
					balanceAfterAllocationValue : item.balanceAfterAllocation,
					allocationAmountValue       : item.allocationAmount,
					constBalanceAmount          : item.balanceAmount,
					afterTdsAmountValue         : item.afterTdsAmount,
					nostroChangeAmount          : item.nostroAmount,
				})),
			);
			Toast.success('Dry Run Successful');
		} catch (error) {
			Toast.error(error?.response?.data?.message);
		}
	};
	return {
		submitMatch,
		setEditeAble,
		setEditedValue,
		setAllocationValue,
		handleCrossClick,
		setChangeData,
		changeData,
		setCheckedIdData,
		setEditedNostro,
		checkMatching,
		checkLoading,
		loadingData,
		loading,
		approveCheck,
		nostroButton,
		setReject,
	};
};
export default useSettlement;
