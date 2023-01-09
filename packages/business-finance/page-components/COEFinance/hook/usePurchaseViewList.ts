

import { useRequestBf } from '@cogoport/request';
import React, { useState,useEffect } from 'react';
import { PURCHASE_VIEW_CONFIG } from '../configurations/PURCHASE_VIEW_LIST';
import useDebounceQuery from '../../commons/utils/debounce'
import { GenericObject,NestedObj } from '../../commons/Interfaces/index';


interface Props{
	filters:GenericObject;
	setFilters: (p: object) => void;
	sort:NestedObj;
}

const  useGetPurchaseViewList=({filters,setFilters,sort}:Props)=> {
	const [currentTab, setCurrentTab] = useState('all');
	const {debounceQuery, query }=useDebounceQuery();
	const [searchValue, setSearchValue] = useState('');

	
	console.log(filters,'filtersfiltersfilters');
	const showFilter=()=>{
		if(filters?.invoiceType==='PURCHASE'){
			return 'BILL';
		}
		else if(filters?.invoiceType==='PROFORMA'){
			return 'BILL';
		}
		return filters;
	}
	
	// const showBill=()=>{
	// 	if(filters?.invoiceType==='PURCHASE')
	// 	{
	// 		return true;
	// 	}
	// 	else if(filters?.invoiceType==='PROFORMA')
	// 	{
	// 		return false;
	// 	}
	// 	return undefined;
	// }

    const [{ data, loading, error }, refetch] = useRequestBf(
		{
			url     : '/purchase/bills/list',
			method  : 'get',
			params : {
				// ...filters,
				filter:showFilter(),
				proforma:filters?.invoiceType==='PURCHASE'?true:undefined,
				status: currentTab!=='all' && currentTab!=='UrgencyTag' ? currentTab : undefined,
				isUrgent: currentTab==='UrgencyTag'?true:undefined,
				...sort,
				},
			authKey : 'get_purchase_bills_list',
		},
		{ manual: false },
	);

	useEffect(() => {
		debounceQuery(searchValue);
	}, [searchValue]);

	useEffect(() => {
		setFilters((prev:GenericObject)=>({...prev,q:query||undefined,pageIndex:1,pageSize:10}))
	},[query])

	useEffect(() => {
		refetch();
	}, [sort]);
	
	
const config=PURCHASE_VIEW_CONFIG;
    

	return {
        data,
        loading,
        config,
		currentTab,
		setCurrentTab,
		setSearchValue,	
		searchValue,
    };
}

export default  useGetPurchaseViewList;
