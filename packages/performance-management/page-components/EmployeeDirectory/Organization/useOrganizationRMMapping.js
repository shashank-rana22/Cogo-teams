import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

const useOrganizationRMMapping = ({ partner_id = '', detailsLoading }) => {
	const [hierarchy, setHierarchy] = useState({
		reporting_managers : [],
		reportees          : [],
		user               : {},
	});

	const [params, setParams] = useState({
		partner_id,
		// user_id: personDetails.user_id,
	});

	console.log('partner_id', partner_id);

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
			// eslint-disable-next-line no-console
			console.log('err', err);
		}
	};

	useEffect(() => {
		if (!detailsLoading) {
			setParams({
				partner_id: partner_id || undefined,
			});
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [detailsLoading]);

	useEffect(() => {
		fetchData();

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params]);

	const handleReset = () => {
		setParams({
			partner_id: partner_id || undefined,
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
