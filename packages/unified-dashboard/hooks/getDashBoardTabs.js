import { usePublicRequest } from '@cogoport/request';
import { useEffect } from 'react';

const GetDashBoardTabs = () => {
	const [{ data, loading }, trigger] = usePublicRequest({
		url     : `${process.env.CMS_URL}v1/cogo_partner/configstore/contents/dashboard-urls`,
		method  : 'GET',
		headers : {
			authorization: `Bearer ${process.env.CMS_TOKEN}`,
		},
	});

	useEffect(() => {
		const getFileContent = async () => {
			try {
				await trigger();
			} catch (error) {
				console.log(error, 'error');
			}
		};

		if (process.env.NODE_ENV === 'production') {
			getFileContent();
		}
	}, [trigger]);

	return {
		loading,
		data,
	};
};

export default GetDashBoardTabs;
