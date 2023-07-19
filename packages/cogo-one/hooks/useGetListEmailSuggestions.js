import { useDebounceQuery } from '@cogoport/forms';
import { useLensRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const getParams = ({ search }) => ({
	sender: search,
});

function useGetListEmailSuggestions({
	searchQuery = '',
	shouldShowSuggestions = false,
}) {
	const { query, debounceQuery } = useDebounceQuery();

	const [{ data, loading }, trigger] = useLensRequest({
		url    : '/list_email_suggestions',
		method : 'get',
	}, { manual: true });

	const getEmailSuggestions = useCallback(
		(props) => {
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
		if (shouldShowSuggestions) {
			getEmailSuggestions({ search: query });
		}
	}, [getEmailSuggestions, query, shouldShowSuggestions]);

	return {
		emailSuggestions: data,
		getEmailSuggestions,
		loading,
	};
}

export default useGetListEmailSuggestions;
