import { Toast } from '@cogoport/components';
import { useTicketsRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useEffect } from 'react';

const PAGE_DECREMENT = 1;

const getPayload = ({
	performerId,
	status,
	page,
	serialId,
}) => ({
	PerformedByID : performerId,
	UserID        : performerId,
	size          : 10,
	page          : page - PAGE_DECREMENT,
	RequestType   : 'feedback',
	Statuses      : status || undefined,
	SerialID      : serialId,
});

const useListTickets = ({ serialId = '', page = 1 }) => {
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
					serialId,
				}),
			});
		} catch (error) {
			Toast.error(error);
		}
	}, [trigger, performerId, page, serialId]);

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

export default useListTickets;
