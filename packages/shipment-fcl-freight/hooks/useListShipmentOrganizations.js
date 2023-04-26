import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

const useListShipmentOrganizations = ({ shipment_data }) => {
	const [orgList, setOrgList] = useState({});
	const [{ loading }, trigger] = useRequest({
		url    : '/list_shipment_organizations',
		method : 'GET',
		params : {
			shipment_id: shipment_data?.id,
		},

	}, { manual: true });

	const getList = useCallback(async () => {
		try {
			const res = await trigger();

			setOrgList(res.data || {});
		} catch (err) {
			setOrgList({});

			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		getList();
	}, [getList]);

	return {
		loading,
		orgList,
	};
};
export default useListShipmentOrganizations;
