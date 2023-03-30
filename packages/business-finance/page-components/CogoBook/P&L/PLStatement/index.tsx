import Card from './Card';
import ListProfit from './ListProfit';
import styles from './styles.module.css';
import {useState} from "react"
import { set } from '@cogoport/forms';

function PLStatement() {
	const [filters, setFilters] = useState({
		entity   : '',
		category : '',
		date     : '',
		rowCheck : '',
		colCheck : '',
		chip     : 'Segment',
		radio    : '',
		mode     : '',
		ratio    : 'VOLUME',
	});
	const [selectFilter, setSelectFilter] = useState(false);
	const [select, setSelect] = useState(false);
	return (
		<div>
			<Card 
				filters = {filters} 
				setFilters = {setFilters} 
				selectFilter={selectFilter} 
				setSelectFilter={setSelectFilter}
				select= {select}
				setSelect = {setSelect}
			/>
			<ListProfit 
				filters = {filters} 
				setFilters = {setFilters} 
				selectFilter={selectFilter} 
				setSelectFilter={setSelectFilter}
				select= {select}
				setSelect = {setSelect}
			/>
			<div className={styles.amount}>All amounts are in INR*</div>
		</div>
	);
}
export default PLStatement;
