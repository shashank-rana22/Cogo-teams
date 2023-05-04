import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

const useCheckQuotationSentDuplicacy = ({ orgId = '' }) => {
	const { profile = {} } = useSelector((state) => state);
	const { user = {} } = profile;
	const { id: performedBy } = user;

	const [{ loading, data }, trigger] = useRequest(
		{
			method : 'get',
			url    : '/check_sent_quotation_duplicacy',
		},
		{ manual: true, autoCancel: false },
	);

	const checkDuplicacy = useCallback(async () => {
		try {
			await trigger({
				params: {
					organization_id : orgId,
					performed_by_id : performedBy,
				},
			});
		} catch (err) {
			// console.log(err);
		}
	}, [orgId, performedBy, trigger]);

	useEffect(() => {
		if (orgId) {
			checkDuplicacy();
		}
	}, [checkDuplicacy, orgId]);

	return {
		quotationSentData: data,
		loading,
		checkDuplicacy,
	};
};

export default useCheckQuotationSentDuplicacy;
