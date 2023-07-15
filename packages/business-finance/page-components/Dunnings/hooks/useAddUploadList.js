import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useCallback } from 'react';

const useAddUploadList = ({
	onClose,
	subTabsValue,
	setShowCycleExceptions,
	cycleListId,
	uncheckedRows = [],
	getMasterList,
}) => {
	const profile = useSelector((state) => state);
	const { profile: { user } } = profile || {};
	const SUB_TABS_VALUES = subTabsValue === 'masterExceptionList';
	const [{ loading:uploadListLoading }, trigger] = useRequestBf(
		{
			url     : '/payments/dunning/create-exceptions',
			method  : 'post',
			authKey : 'get_payments_dunning_create_exceptions',
		},
		{ manual: true },
	);

	const PROFILE_ID = user?.id;
	const UN_CHECKED_DATA = !isEmpty(uncheckedRows);
	const exceptionType = SUB_TABS_VALUES ? 'in master exceptions' : 'in this cycle exception';
	const getUploadList = useCallback(({ data, fileValue, entity }) => {
		(async () => {
			try {
				const res = await trigger({
					data: {
						excludedRegistrationNos: !isEmpty(data.excludedRegistrationNos)
							? data.excludedRegistrationNos : uncheckedRows,
						exceptionType : SUB_TABS_VALUES ? 'MASTER' : 'CYCLE_WISE',
						exceptionFile : fileValue,
						actionType    : UN_CHECKED_DATA ? 'DELETE' : 'UPLOAD',
						createdBy     : PROFILE_ID,
						cycleId       : SUB_TABS_VALUES ? undefined : cycleListId || undefined,
						entityCode    : entity,
					},
				});
				if (!isEmpty(res?.data)) {
					Toast.success(`${res?.data.length} customers succesfully added ${exceptionType}`);
				}
				onClose();
				if (SUB_TABS_VALUES) {
					getMasterList();
				}
				setShowCycleExceptions(false);
			} catch (error) {
				Toast.error(error?.message);
			}
		})();
	}, [trigger, PROFILE_ID, onClose, setShowCycleExceptions, SUB_TABS_VALUES, exceptionType,
		uncheckedRows, UN_CHECKED_DATA, getMasterList, cycleListId]);

	return {

		uploadListLoading,
		getUploadList,
	};
};

export default useAddUploadList;
