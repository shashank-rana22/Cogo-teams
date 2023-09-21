import { useTicketsRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import {
	useEffect,
	useCallback,
} from 'react';

import { STATUS_KEY_MAPPING } from '../constants';

const PAGE_DECREMENT = 1;

const getPayload = ({
	performerId,
	status,
	page,
}) => ({
	PerformedByID : performerId,
	size          : 10,
	page          : page - PAGE_DECREMENT,
	RequestType   : 'feedback',
	Statuses      : status || undefined,
});

const useGetFeedbacks = ({ activeTab, page }) => {
	const { id : performerId = '' } = useSelector((state) => state?.profile?.user);

	const status = STATUS_KEY_MAPPING[activeTab];

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
					status,
					page,
				}),
			});
		} catch (error) {
			console.error('error:', error);
		}
	}, [performerId, trigger, status, page]);

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
