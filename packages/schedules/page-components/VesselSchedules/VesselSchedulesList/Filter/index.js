import { Datepicker, Input, Select } from '@cogoport/components';
import styles from './styles.module.css'
import {useState}  from 'react'
import { sortByOptions } from './utils';

const shippingLineOptions = [
    {label:"dev",value:"abc"}
]

const Filter = ({filter,setFilter})=>
{
    const [date,setDate] = useState(null)
    return <>
        <div className = {styles.filter}>
        <div className={styles.filter_left}>
        <Input
            className={styles.input}
            placeholder="Vessel Name / Code"
            onChange = {(value)=>setFilter({...filter,vessel_name:value})}
        />            
        
        <Datepicker
            className={styles.input}
            placeholder="Departure Date"
            showTimeSelect
            dateFormat="MM/dd/yyyy HH:mm"
            name="date"
            onChange={(value)=>setFilter({...filter,date:value})}
            value={filter?.date}
            size="md"
        />
        <Select 
            className={styles.input}
            placeholder ="Shipping Line"
            onChange={(value)=>setFilter({...filter,shipping_line:value})}
            options={shippingLineOptions}/>
        
        </div>        
        <div className={styles.filter_right}>
            <Select
            className={styles.input}
            options={sortByOptions}
            placeholder="Sort By"
            onChange={(value)=>setFilter({...filter,sort_by:value})}
            />
        </div>            

        </div>
    </>
}
export default Filter;