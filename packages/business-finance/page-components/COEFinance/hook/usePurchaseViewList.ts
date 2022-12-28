

import { useRequestBf } from '@cogoport/request';
import React, { useState,useEffect } from 'react';
import { PURCHASE_VIEW_CONFIG } from '../configurations/PURCHASE_VIEW_LIST';


const  useGetPurchaseViewList=()=> {
	const [page,setPage]=useState<number>(1)
	
    const [{ data, loading, error }, refetch] = useRequestBf(
		{
			url     : '/purchase/bills/list',
			method  : 'get',
			params : {
				pageIndex : page
				},
			authKey : 'get_purchase_bills_list',
		},
		{ manual: false },
	);

	useEffect(()=>{
		refetch()
	},[page])

const config=PURCHASE_VIEW_CONFIG;
    

	return {
        data,
        loading,
        config,
		handlePageChange:setPage,
		page
    };
}

export default  useGetPurchaseViewList;
