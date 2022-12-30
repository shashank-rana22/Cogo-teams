

import { useRequestBf } from '@cogoport/request';
import React, { useState,useEffect } from 'react';
import { PURCHASE_VIEW_CONFIG } from '../configurations/PURCHASE_VIEW_LIST';
import useDebounceQuery from '../../commons/utils/debounce'
import { GenericObject } from '../../commons/Interfaces';


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
				q:query||undefined,
				...filters,
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
