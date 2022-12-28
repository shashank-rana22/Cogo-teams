

import { useRequestBf } from '@cogoport/request';
import React, { useEffect } from 'react';
import { PURCHASE_VIEW_CONFIG } from '../configurations/PURCHASE_VIEW_LIST';


const  useGetPurchaseViewList=()=> {
    const [{ data, loading, error }, trigger] = useRequestBf(
		{
			url     : '/purchase/bills/list',
			method  : 'get',
			authKey : 'get_purchase_bills_list',
		},
		{ autoCancel: false },
	);

	useEffect(() => {
		trigger();
	}, []);

const config = PURCHASE_VIEW_CONFIG;
    

	return {
        data,
        loading,
        config,
    };
}

export default  useGetPurchaseViewList;
