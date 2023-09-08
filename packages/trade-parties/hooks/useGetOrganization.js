import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

const useGetOrganization = ({ refetch = () => {}, initialCall = true }) => {
	const [data, setData] = useState([]);
	const [{ loading }, trigger] = useRequest(
		{
			url: '/get_organization',
		},
		{
			manual: true,
		},

	);
	const apiTrigger = useCallback(async (val) => {
		try {
			const res = await trigger({ params: val });

			if (res?.data) {
				setData(res?.data);
				refetch({ data: res?.data });
			}
		} catch (err) {
			setData([]);
		}
	}, [trigger, refetch]);

	useEffect(() => {
		if (initialCall) {
			apiTrigger();
		}
	}, [apiTrigger, initialCall]);

	return { data, loading, apiTrigger };
};
export default useGetOrganization;
