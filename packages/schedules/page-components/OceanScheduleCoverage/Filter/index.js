import {Button, Select}  from "@cogoport/components"
import {useState} from 'react'
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { merge, startCase } from '@cogoport/utils';
import { asyncFieldsLocations } from '@cogoport/forms/utils/getAsyncFields';
import styles from './styles.module.css'

function Filter({filters,setFilters}) {

	const originPortOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params: { filters: { type: ['seaport'] } },
	}));

    const destinationPortOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params: { filters: { type: ['seaport'] } },
	}));



    const clearFilters  = () =>{
      setFilters(null)
    }

    return (
		<div className={styles.filter}>
            <Select className={styles.filter_select}
             {...originPortOptions} 
             placeholder="Origin Port" 
             value={filters?.origin_port}
             onChange={(value)=>setFilters((prev)=>({...prev,origin_port : value}))}
             />
            <Select className={styles.filter_select} 
            {...destinationPortOptions} 
            placeholder="Destination Port" 
            value={filters?.destination_port}
            onChange={(value)=>setFilters((prev)=>({...prev,destination_port : value}))}            
            />
            <Button themeType = "tirtery" onClick={clearFilters}>Clear Filter</Button>
		</div>
	);
}
export default Filter;
