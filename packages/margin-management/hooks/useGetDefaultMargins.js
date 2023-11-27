import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useEffect } from 'react';

import toastApiError from '../utils/toastApiError';

function useGetDefaultMargins({
	activeService = '',
	filterParams = {},
}) {
	const { authParams, selected_agent_id } = useSelector(({ profile }) => ({
		authParams        : profile?.authParams,
		selected_agent_id : profile?.selected_agent_id,
	}));

	const [{ data, loading }, trigger] = useRequest(
		{
			url    : '/list_margins',
			params : {
				filters: {
					agent_id              : selected_agent_id || undefined,
					status                : 'active',
					...(filterParams),
					margin_type           : filterParams?.margin_type,
					service               : activeService,
					is_partner_id_present : false,
					page                  : undefined,
				},
				margin_stats_required : true,
				page_limit            : 10,
				page                  : filterParams?.page,
			},
		},
		{ manual: true },
	);

	const apiTrigger = useCallback(async () => {
		try {
			await trigger();
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		apiTrigger();
	}, [
		apiTrigger,
		filterParams,
		authParams,
		selected_agent_id,
		activeService,
	]);

	return {
		data,
		loading,
	};
}

export default useGetDefaultMargins;
