import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

import getApiErrorString from '../utils/getApiErrorString';

const useListExistingPoc = ({ organization_id = '', trade_party_type = '', trade_party_id = '' }) => {
	const [apiList, setApiList] = useState([]);

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

	const apiTrigger = useCallback(() => {
		(
			async () => {
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
					}
				} catch (err) {
					Toast.error(getApiErrorString(err));
				}
			}
		)();
	}, [usersTrigger, pocsTrigger, organization_id, trade_party_id, trade_party_type]);

	useEffect(() => {
		apiTrigger();
	}, [apiTrigger]);

	return {
		loading : usersLoading || pocsLoading,
		data    : apiList,
		apiTrigger,
	};
};

export default useListExistingPoc;
// TODO
