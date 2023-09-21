import { useTicketsRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import {
	useEffect,
	useCallback,
} from 'react';

const PAGE_DECREMENT = 1;

const getPayload = ({
	performerId,
	page,
}) => ({
	PerformedByID : performerId,
	size          : 10,
	page          : page - PAGE_DECREMENT,
	RequestType   : 'feedback',
	Statuses      : '' || undefined,
});

const useGetFeedbacks = ({ page }) => {
	const { id : performerId = '' } = useSelector((state) => state?.profile?.user);

	const [{ data, loading }, trigger] = useTicketsRequest({
		url     : '/list',
		method  : 'get',
		authkey : 'get_tickets_list',
	}, { manual: true });

	const getFeedbacks = useCallback(() => {
		try {
			trigger({
				params: getPayload({
					performerId,
					page,
				}),
			});
		} catch (error) {
			console.error('error:', error);
		}
	}, [performerId, trigger, page]);

	const { items, ...rest } = data || {};

	useEffect(() => {
		getFeedbacks();
	}, [getFeedbacks]);

	return {
		loading,
		getFeedbacks,
		feedbacks : items || [],
		pageData  : rest,
	};
};

export default useGetFeedbacks;
