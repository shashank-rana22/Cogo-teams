import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useListExistingPoc = ({ organization_id = '', trade_party_type = '', trade_party_id = '' }) => {
	const [apiList, setApiList] = useState([]);
	const [loading, setLoading] = useState(false);

	const [{ loading:usersLoading }, usersTrigger] = useRequest('list_organization_users', { manual: true });
	const [{ loading:pocsLoading }, pocsTrigger] = useRequest('list_organization_pocs', { manual: true });

	const mergeResponse = (userData, pocData) => {
		const list = [...userData, ...pocData].map((item) => ({
			id                  : item?.id,
			name                : item?.name,
			email               : item?.email,
			mobile_country_code : item?.mobile_country_code,
			mobile_number       : item?.mobile_number,
			work_scopes         : item?.work_scopes || [],
		}));
		setApiList(list);
	};

	const apiTrigger = async () => {
		setLoading(true);
		try {
			const usersRes = await usersTrigger({
				params: {
					filters: {
						organization_id,
						status: 'active',
					},
					page_limit: 20,
				},
			});

			const pocsRes = await pocsTrigger({
				params: {
					trade_party_id,
					object_type : trade_party_type,
					status      : 'active',
				},
				page_limit: 20,
			});

			if (!usersRes.hasError && !pocsRes.hasError) {
				mergeResponse(usersRes?.data?.list, pocsRes?.data?.list);
				setLoading(false);
			}
		} catch (err) {
			setLoading(false);
			console.log(err);
		}
	};

	useEffect(() => {
		apiTrigger();
	}, []);

	return {
		loading : loading || usersLoading || pocsLoading,
		data    : apiList,
		apiTrigger,
	};
};

export default useListExistingPoc;
