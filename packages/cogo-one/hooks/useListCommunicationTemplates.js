import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useCallback, useState } from 'react';

import TemplateSuggestion from '../common/TemplateSuggestion';

const DEFAULT_PAGE = 1;
const SCROLL_RIGHT_LIMIT = 50;
const PAGE_ADDITION = 1;

const getParams = ({ page, tags }) => ({
	page,
	page_limit               : 10,
	pagination_data_required : true,
	template_data_required   : false,
	exclude_mjml             : true,
	filters                  : {
		type   : 'email',
		source : 'rich_text',
		tags   : tags || undefined,
	},
});

function useListCommunicationTemplates({
	tags = [],
	shouldTrigger = false,
	templateAddition = false,
	setEmailState = () => {},
}) {
	const [pagination, setPagination] = useState(DEFAULT_PAGE);
	const [templatesList, setTemplatesList] = useState([]);

	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_communication_templates',
		method : 'get',
	}, { manual: true });

	const fetchEmailTemplate = useCallback(async ({ page }) => {
		try {
			if (isEmpty(tags) || !shouldTrigger) {
				return;
			}

			const res = await trigger({
				params: getParams({ page, tags }),
			});

			setPagination(page);

			const newList = res?.data?.list?.map((item) => ({
				key      : item?.id,
				children : <TemplateSuggestion
					templateData={item}
					setEmailState={setEmailState}
					templateAddition={templateAddition}
				/>,
				value: item,
			}));

			setTemplatesList((prev) => ([...(prev || []), ...(newList || [])]));
		} catch (error) {
			console.error(error);
		}
	}, [setEmailState, shouldTrigger, tags, templateAddition, trigger]);

	const handleScroll = (e) => {
		const { clientWidth, scrollWidth, scrollLeft } = e.target;

		const reachedLeft = scrollWidth - (clientWidth + scrollLeft) <= SCROLL_RIGHT_LIMIT;

		const hasMoreData = pagination < data?.total;

		if (reachedLeft && hasMoreData && !loading) {
			fetchEmailTemplate({ page: pagination + PAGE_ADDITION });
		}
	};

	const handleRefresh = useCallback(() => {
		setTemplatesList([]);
		fetchEmailTemplate({ page: DEFAULT_PAGE });
	}, [fetchEmailTemplate]);

	useEffect(() => {
		handleRefresh();
	}, [handleRefresh]);

	return {
		data: loading ? {} : data,
		loading,
		fetchEmailTemplate,
		handleScroll,
		setTemplatesList,
		templatesList,
		handleRefresh,
	};
}

export default useListCommunicationTemplates;
