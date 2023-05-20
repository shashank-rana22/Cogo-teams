import { usePublicRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const GetDashBoardTabs = () => {
	const [{ data, loading }, trigger] = usePublicRequest({
		url     : `${process.env.NEXT_PUBLIC_CMS_URL}v1/cogo_partner/configstore/contents/dashboard-urls`,
		method  : 'GET',
		headers : {
			authorization: `Bearer ${process.env.NEXT_PUBLIC_CMS_TOKEN}`,
		},
	}, { manual: true });

	const getFileContent = useCallback(
		() => {
			try {
				trigger();
			} catch (error) {
				console.log(error, 'error');
			}
		},
		[trigger],
	);

	useEffect(() => {
		if (process.env.NODE_ENV === 'production') {
			getFileContent();
		}
	}, [getFileContent, trigger]);

	return {
		loading,
		data,
	};
};

export default GetDashBoardTabs;
