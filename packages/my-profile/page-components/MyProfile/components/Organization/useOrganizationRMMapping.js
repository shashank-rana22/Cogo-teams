// import showErrorsInToast from '@cogo/utils/showErrorsInToastV2';
import { useRequest } from '@cogoport/request';
// import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

const useOrganizationRMMapping = ({ personDetails = {} }) => {
	// const {
	// 	general: { scope = '' },
	// } = useSelector((state) => state);

	const [hierarchy, setHierarchy] = useState({
		reporting_managers : [],
		reportees          : [],
		user               : {},
	});

	const [params, setParams] = useState({
		partner_id : personDetails.partner_id,
		user_id    : personDetails.user_id,
	});

	// const getOrganizationHeirarchyAPI = useRequest(
	// 	'get',
	// 	false,
	// 	scope,
	// )('/get_partner_user_rm_mapping');

	const [{ loading = false }, trigger] = useRequest({
		url    : 'get_partner_user_rm_mapping',
		method : 'GET',
	}, { manual: false });

	const fetchData = async () => {
		try {
			const res = await trigger({ params });

			setHierarchy({
				reporting_managers : res?.data?.reporting_managers,
				reportees          : res?.data?.reportees,
				user               : res?.data?.user,
			});
		} catch (err) {
			// showErrorsInToast(err?.data);
			console.log('err', err);
		}
	};

	useEffect(() => {
		fetchData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params]);

	// useEffect(async () => {
	// 	try {
	// 		const res = await getOrganizationHeirarchyAPI.trigger({ params });

	// 		setHierarchy({
	// 			reporting_managers : res?.data?.reporting_managers,
	// 			reportees          : res?.data?.reportees,
	// 			user               : res?.data?.user,
	// 		});
	// 	} catch (err) {
	// 		// showErrorsInToast(err?.data);
	// 		console.log('err', err);
	// 	}
	// }, [params]);

	const handleReset = () => {
		setParams({
			partner_id : personDetails.partner_id,
			user_id    : personDetails.user_id,
		});
	};

	return {
		loading,
		handleReset,
		hierarchy,
		params,
		setParams,
	};
};

export default useOrganizationRMMapping;
