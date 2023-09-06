import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

const ZERO = 0;
const DUMMY_LIST_DATA = [
	{
		id                           : 'a121ceed-0500-4114-8b08-18abe6f131b7',
		organization_serial_id       : null,
		sage_organization_id         : 'TP94646',
		created_at                   : '2023-09-05T05:23:10.893Z',
		updated_at                   : '2023-09-05T05:23:10.893Z',
		account_type                 : 'importer_exporter',
		trade_party_detail_serial_id : '94646',
		status                       : 'active',
		sage_details                 : {
			sage_business_name : 'LACMA ENTERPRISE',
			sage_org_id        : 'TP94646',
		},
	},
];
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

			if (res.data?.total === ZERO) {
				setData(DUMMY_LIST_DATA);
			} else {
				setData(res.data?.list);
			}
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
