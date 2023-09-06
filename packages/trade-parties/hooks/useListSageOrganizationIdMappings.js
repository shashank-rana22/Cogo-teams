import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

const useListSageOrganizationIdMappings = ({ id }) => {
	const [data, setData] = useState({});
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/list_sage_organization_id_mappings',
			params : {
				sage_details_required : true,
				filters               : { trade_party_detail_serial_id: id },
			},
		},
		{
			manual: true,
		},
	);
	const apiTrigger = useCallback(async () => {
		try {
			const res = await trigger();

			setData(res?.data?.list);
		} catch (err) {
			setData([]);
			// console.log("error occured");
			/// /console.log(err);
		}
	}, [trigger]);
	useEffect(() => {
		apiTrigger();
	}, [apiTrigger]);

	return { data, loading, trigger };
};
export default useListSageOrganizationIdMappings;
