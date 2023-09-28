import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useCallback, useState } from 'react';

const DEFAULT_PAGE = 1;
const SCROLL_RIGHT_LIMIT = 50;
const PAGE_ADDITION = 1;

const getParams = ({ page, tags }) => ({
	page,
	page_limit               : 10,
	pagination_data_required : true,
	template_data_required   : true,
	exclude_mjml             : true,
	filters                  : {
		type   : 'email',
		source : 'rich_text',
		tags   : tags || undefined,
	},
});

function useListCommunicationTemplates({ tags = [], shouldTrigger = false }) {
	const [pagination, setPagination] = useState(DEFAULT_PAGE);

	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_communication_templates',
		method : 'get',
	}, { manual: true });

	const fetchEmailTemplate = useCallback(async ({ page }) => {
		try {
			if (isEmpty(tags) || !shouldTrigger) {
				return;
			}

			await trigger({
				params: getParams({ page, tags }),
			});

			setPagination(page);
		} catch (error) {
			console.error(error);
		}
	}, [shouldTrigger, tags, trigger]);

	const handleScroll = (e) => {
		const { clientHeight, scrollTop, scrollHeight } = e.target;

		const reachBottom = scrollHeight - (clientHeight + scrollTop) <= SCROLL_RIGHT_LIMIT;

		const hasMoreData = pagination < data?.total;

		if (reachBottom && hasMoreData && !loading) {
			fetchEmailTemplate({ page: pagination + PAGE_ADDITION });
		}
	};

	useEffect(() => {
		fetchEmailTemplate({ page: DEFAULT_PAGE });
	}, [fetchEmailTemplate]);

	return {
		data: loading ? {} : data,
		loading,
		fetchEmailTemplate,
		handleScroll,
	};
}

export default useListCommunicationTemplates;
