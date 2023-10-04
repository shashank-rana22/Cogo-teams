import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

const getParams = ({ page, query }) => ({
	page,
	page_limit               : 6,
	pagination_data_required : true,
	template_data_required   : true,
	exclude_mjml             : true,
	filters                  : {
		q      : query?.trim() || undefined,
		type   : 'email',
		source : 'rich_text',
	},
});

function useListEmailTemplates({ isTemplateView = false }) {
	const [search, setSearch] = useState('');

	const { query, debounceQuery } = useDebounceQuery();

	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_communication_templates',
		method : 'get',
	}, { manual: true });

	const fetchEmailTemplate = useCallback(async ({ page }) => {
		if (!isTemplateView) {
			return;
		}
		try {
			await trigger({
				params: getParams({ page, query }),
			});
		} catch (error) {
			console.error(error);
		}
	}, [trigger, query, isTemplateView]);

	useEffect(() => {
		debounceQuery(search);
	}, [debounceQuery, search]);

	useEffect(() => {
		fetchEmailTemplate({ page: 1 });
	}, [fetchEmailTemplate]);

	return {
		data, loading, fetchEmailTemplate, search, setSearch,
	};
}

export default useListEmailTemplates;
