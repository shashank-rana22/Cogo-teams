import { Input } from "@cogoport/components";

import styles from './styles.module.css';

export default function ScopeAndFilter({filters,setFilters}){
    return <div className={styles.container} >
        <Input
            placeholder='Search Shipments'
            type='search'
            value={filters.q} 
            onChange={(val) => setFilters({...filters, q: val})} 
        />
    </div>
}