import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback } from 'react';

const useAddUploadList = ({ onClose, subTabsValue }) => {
	const { profile } = useSelector((store) => store);

	const [{ loading:uploadListLoading }, trigger] = useRequestBf(
		{
			url     : '/payments/dunning/create-exceptions',
			method  : 'post',
			authKey : 'get_payments_dunning_create_exceptions',
		},
		{ manual: true },
	);

	const getUploadList = useCallback((data, fileValue) => {
		(async () => {
			try {
				await trigger({
					data: {
						excludedRegistrationNos : data.excludedRegistrationNos,
						exceptionType           : subTabsValue === 'masterExceptionList' ? 'MASTER' : 'CYCLE_WISE',
						exceptionFile           : fileValue,
						actionType              : 'UPLOADE',
						createdBy               : profile?.user?.id,
					},
				});
				onClose();
			} catch (error) {
				console.log(error);
			}
		})();
	}, [trigger]);

	return {

		uploadListLoading,
		getUploadList,
	};
};

export default useAddUploadList;
