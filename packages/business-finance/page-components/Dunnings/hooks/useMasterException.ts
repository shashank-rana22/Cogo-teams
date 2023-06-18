import { Toast } from '@cogoport/components';
import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useEffect, useState } from 'react';

interface ExceptionFiltersInterface {
	category?: string;
	creditDays?: string ;
	cycleStatus?: string;
	pageIndex?: number;
}
interface Props {
	exceptionFilter?: ExceptionFiltersInterface;
	subTabsValue?: string;
	setShowConfirmationModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Profile {
	profile?: { user: { id: string } }
}

const useMasterException = ({ exceptionFilter, subTabsValue, setShowConfirmationModal }:Props) => {
	const [searchValue, setSearchValue] = useState('');
	const { category = '', creditDays = 0, cycleStatus = '', pageIndex } = exceptionFilter || {};
	const profile: Profile = useSelector((state) => state);
	const { profile: { user } } = profile || {};
	const PROFILE_ID = user?.id;

	const [sort, setSort] = useState({
		sortType : '',
		sortBy   : '',
	});

	const [{ data, loading:masterExceptionLoading }, trigger] = useRequestBf(
		{
			url     : '/payments/dunning/master-exceptions',
			method  : 'get',
			authKey : 'get_payments_dunning_master_exceptions',
		},
		{ manual: true },
	);
	const [{ data:cycleWiseData, loading:cycleWiseLoading }, cycleWiseApi] = useRequestBf(
		{
			url     : '/payments/dunning/list-dunning',
			method  : 'get',
			authKey : 'get_payments_dunning_list_dunning',
		},
		{ manual: true },
	);
	const [{ loading: deleteMasterLoading }, deleteMasterApi] = useRequestBf(
		{
			url     : '/payments/dunning/delete-master-exception',
			method  : 'post',
			authKey : 'get_payments_dunning_delete_master_exception',
		},
		{ manual: true },
	);
	const { query = '', debounceQuery } = useDebounceQuery();

	useEffect(() => {
		debounceQuery(searchValue);
	}, [searchValue, debounceQuery]);

	const getMasterList = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						segmentation : category || undefined,
						creditDays   : creditDays ? parseInt(creditDays, 10) : undefined,
						query        : query || undefined,
						pageIndex,
						sortBy       : sort?.sortBy || undefined,
						sortType     : sort?.sortType || undefined,
					},
				});
			} catch (error) {
				console.log(error);
			}
		})();
	}, [category, creditDays, query, sort?.sortBy, pageIndex, sort?.sortType, trigger]);

	const getCycleWiseList = useCallback(() => {
		(async () => {
			try {
				await cycleWiseApi({
					params: {
						query       : query || undefined,
						pageIndex,
						cycleStatus : cycleStatus || undefined,
						sortBy      : sort?.sortBy || undefined,
						sortType    : sort?.sortType || undefined,
					},
				});
			} catch (error) {
				console.log(error);
			}
		})();
	}, [query, pageIndex, sort?.sortBy, sort?.sortType, cycleStatus, cycleWiseApi]);

	const deleteMasterException = useCallback((id, type) => {
		(async () => {
			try {
				await deleteMasterApi({
					params: {
						id,
						actionType : type,
						updatedBy  : PROFILE_ID,
					},
				});
				getMasterList();
				setShowConfirmationModal(false);
				Toast.success('Deleted Successfully !!');
			} catch (error) {
				Toast.error(error?.message || 'Delete Failed');
			}
		})();
	}, [deleteMasterApi, getMasterList, PROFILE_ID, setShowConfirmationModal]);

	useEffect(() => {
		if (subTabsValue === 'masterExceptionList') {
			getMasterList();
		} else {
			getCycleWiseList();
		}
	}, [getMasterList, getCycleWiseList, subTabsValue]);

	useEffect(() => {
		setSearchValue('');
	}, [subTabsValue]);

	return {
		data,
		masterExceptionLoading,
		getMasterList,
		cycleWiseData,
		cycleWiseLoading,
		getCycleWiseList,
		searchValue,
		setSearchValue,
		deleteMasterLoading,
		deleteMasterException,
		sort,
		setSort,

	};
};

export default useMasterException;
