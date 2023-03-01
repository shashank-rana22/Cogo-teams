import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetCogoverseChatData = ({ country = {}, date = {} }) => {
	const CountryMobileCode = country?.mobile_country_code || '';

	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_cogoverse_platform_chat_data',
		method : 'GET',

	}, { manual: true });

	const getCogoverseChatData = async () => {
		try {
			await trigger({
				params: {
					mobile_country_code : CountryMobileCode || undefined,
					start_date          : date?.startDate || undefined,
					end_date            : date?.endDate || undefined,

				},
			});
		} catch (err) {
			Toast.error(err?.message);
		}
	};

	useEffect(() => {
		(async () => {
			await getCogoverseChatData();
		})();
		// eslint-disable-next-line
	}, [date, CountryMobileCode]);

	return {
		chatLoading : loading,
		chatData    : data,

	};
};

export default useGetCogoverseChatData;
