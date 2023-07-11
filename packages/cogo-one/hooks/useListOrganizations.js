import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const NEXT_PAGE = 1;
const PAGE_LIMIT = 50;

const getParams = ({ searchQuery, currentPage }) => ({
	q          : searchQuery || undefined,
	page       : NEXT_PAGE + currentPage,
	page_limit : PAGE_LIMIT,
});

const formatData = ({ list }) => list.map((item) => ({
	id: item?.id, orgName: item?.business_name,
}));

const useListOrganizations = ({ searchQuery }) => {
	const [, trigger] = useRequest({
		url    : '/list_organizations',
		method : 'get',
	}, { manual: true });

	const getOrganizations = useCallback(async ({
		setListData,
		setLoadingState,
		updateLoadingState = () => {},
		currentPage = 0,
	}) => {
		try {
			setLoadingState((prev) => ({ ...prev, chatsLoading: true }));

			const res = await trigger({ params: getParams({ searchQuery, currentPage }) });

			const { total = 1, page = 1, list = [] } = res?.data || {};
			const formattedData = formatData({ list }) || {};
			setListData((p) => ({
				...p,
				kamContacts     : [...formattedData, ...(p.kamContacts || [])],
				isLastPage      : page >= total,
				kamContactsPage : page,
			}));
		} catch (err) {
			console.error('err', err);
		} finally {
			updateLoadingState('chatsLoading');
		}
	}, [trigger, searchQuery]);

	return {
		getOrganizations,
	};
};
export default useListOrganizations;
