import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

const useCheckQuotationSentDuplicacy = ({ userId = '' }) => {
	const { profile = {} } = useSelector((state) => state);
	const { user = {} } = profile;
	const { id:performedBy } = user;

	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : '/check_sent_quotation_duplicacy',
	}, { manual: true });

	const checkDuplicacy = useCallback(() => {
		try {
			trigger({
				params: {
					user_id         : userId,
					performed_by_id : performedBy,
				},
			});
		} catch (err) {
			// console.log(err);
		}
	}, [userId, performedBy, trigger]);

	useEffect(() => {
		if (userId) { checkDuplicacy(); }
	}, [checkDuplicacy, userId]);

	return {
		quotationSentData: data,
		loading,
		checkDuplicacy,
	};
};

export default useCheckQuotationSentDuplicacy;
