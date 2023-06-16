import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useCallback } from 'react';

interface AddUploadInterface {
	onClose?: () => void;
	subTabsValue?: string;
	setShowCycleExceptions?: React.Dispatch<React.SetStateAction<boolean>>;
	cycleListId?: string;
	uncheckedRows?: Array<string>;
}

interface Profile {
	profile?: { user: { id: string } }
}

const useAddUploadList = ({
	onClose,
	subTabsValue,
	setShowCycleExceptions,
	cycleListId,
	uncheckedRows = [],
}:AddUploadInterface) => {
	const profile: Profile = useSelector((state) => state);
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
	const UN_CHECKED_DATA = uncheckedRows.length > 0;

	const getUploadList = useCallback((data, fileValue) => {
		(async () => {
			try {
				await trigger({
					data: {
						excludedRegistrationNos: !isEmpty(data.excludedRegistrationNos)
							? data.excludedRegistrationNos : uncheckedRows,
						exceptionType : SUB_TABS_VALUES ? 'MASTER' : 'CYCLE_WISE',
						exceptionFile : fileValue,
						actionType    : UN_CHECKED_DATA ? 'DELETE' : 'UPLOAD',
						createdBy     : PROFILE_ID,
						cycleId       : SUB_TABS_VALUES ? undefined : cycleListId || undefined,
					},
				});
				onClose();
				setShowCycleExceptions(false);
			} catch (error) {
				Toast.error(error?.message);
			}
		})();
	}, [trigger, PROFILE_ID, onClose, setShowCycleExceptions, SUB_TABS_VALUES,
		uncheckedRows, UN_CHECKED_DATA, cycleListId]);

	return {

		uploadListLoading,
		getUploadList,
	};
};

export default useAddUploadList;
