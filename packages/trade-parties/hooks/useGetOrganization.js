import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

const useGetOrganization = ({ id }) => {
	const [data, setData] = useState([]);
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/get_organization',
			params : { id },
		},
		{
			manual: true,
		},

	);
	const apiTrigger = useCallback(async () => {
		try {
			const res = await trigger({});
			setData(res.data);
		} catch (err) {
			// console.log("error occured");
			/// /console.log(err);
		}
	}, [trigger]);
	useEffect(() => {
		apiTrigger();
	}, [apiTrigger]);

	return { data, loading };
};
export default useGetOrganization;
