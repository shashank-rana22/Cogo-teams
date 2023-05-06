import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback } from 'react';

function useGetFaq() {
	const { general } = useSelector((state) => state);
	const { update = '', id } = general.query || {};

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : update && id ? `/get_faq_${update}` : null,

	}, { manual: false });

	const fetchFaq = useCallback(() => {
		try {
			trigger({
				params: { id },
			});
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data));
		}
	}, [id, trigger]);

	return { fetchFaq, data: data?.[`${update}_details`], loading };
}

export default useGetFaq;
