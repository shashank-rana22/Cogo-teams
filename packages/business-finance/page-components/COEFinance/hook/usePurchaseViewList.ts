

import { useRequestBf } from '@cogoport/request';
import React, { useState,useEffect } from 'react';
import { PURCHASE_VIEW_CONFIG } from '../configurations/PURCHASE_VIEW_LIST';
<<<<<<< Updated upstream
import useDebounceQuery from '../../commons/utils/debounce'
=======
import { GenericObject } from '../../commons/Interfaces';
>>>>>>> Stashed changes


interface Props{
	filters:GenericObject;
  }

const  useGetPurchaseViewList=({filters}:Props)=> {
	const [page,setPage]=useState<number>(1)
	const [currentTab, setCurrentTab] = useState<string>('all');
	const {debounceQuery, query }=useDebounceQuery();
	const [searchValue, setSearchValue] = useState<number|string>('');
	
	
    const [{ data, loading, error }, refetch] = useRequestBf(
		{
			url     : '/purchase/bills/list',
			method  : 'get',
			params : {
				pageIndex : page,
<<<<<<< Updated upstream
				pageSize:	10,
						q : query||undefined,
=======
				...filters,
>>>>>>> Stashed changes
				},
			authKey : 'get_purchase_bills_list',
		},
		{ manual: false },
	);
	useEffect(() => {
		debounceQuery(searchValue);
	}, [searchValue]);

	useEffect(()=>{
		refetch()
	},[page,query,currentTab])
	
const config=PURCHASE_VIEW_CONFIG;
    

	return {
        data,
        loading,
        config,
		handlePageChange:setPage,
		currentTab,
		setCurrentTab,
		page,
		setSearchValue,	
		searchValue,
    };
}

export default  useGetPurchaseViewList;
