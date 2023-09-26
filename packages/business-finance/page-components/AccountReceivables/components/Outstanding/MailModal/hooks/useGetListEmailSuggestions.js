import { useDebounceQuery } from '@cogoport/forms';
import { useLensRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const SUGGESTIONS_TO_BE_FETCHED = 10;
const DEFAULT_PAGE = 1;

const getParams = ({ search }) => ({
	sender                   : search,
	page_limit               : SUGGESTIONS_TO_BE_FETCHED,
	page_no                  : DEFAULT_PAGE,
	pagination_data_required : true,
});

function useGetListEmailSuggestions({
	searchQuery = '',
}) {
	const { query, debounceQuery } = useDebounceQuery();

	const [{ data, loading }, trigger] = useLensRequest({
		url    : '/list_email_suggestions',
		method : 'get',
	}, { manual: true });

	const getEmailSuggestions = useCallback(
		(props = {}) => {
			try {
				trigger({
					params: getParams(props),
				});
			} catch (err) {
				console.error(err);
			}
		},
		[trigger],
	);

	useEffect(() => {
		debounceQuery(searchQuery);
	}, [debounceQuery, searchQuery]);

	useEffect(() => {
		if (query) {
			getEmailSuggestions({ search: query });
		}
	}, [getEmailSuggestions, query]);

	return {
		emailSuggestionsData: data || {},
		getEmailSuggestions,
		loading,
	};
}

export default useGetListEmailSuggestions;
