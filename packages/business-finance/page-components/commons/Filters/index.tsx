import React from 'react';
import { Button } from '@cogoport/components';
import Element from './Element/index';
import {ControlProps} from "../Interfaces";
import styles from './styles.module.css';

interface FilterProps {
	controls?: ControlProps[],
	filters: object,
	setFilters: (p:object) => void,
	showClearBtn?:boolean,
	clearFilters?:()=>void,
	types?:string,
}

function Filter({
	controls = [],
	filters,
	setFilters = () => {},
	showClearBtn = false,
	clearFilters,
}:FilterProps) {

	const getElement=(singlecontrol:ControlProps) => {
		const { span=0, name = '', type = '',groupby,showlabel=false,label, ...rest }  = singlecontrol || {};
		const customiseControl = {
			id       : `filter-${name}`,
			value    : filters![name as keyof typeof filters] || '',
			onChange : (val:string) => {
				let value:string;					
				if (type === 'input') value = val;
				else if (type === 'datepicker') value = val;
				else value = val;
				setFilters((prev:object) => ({
					...prev,
					[name]    : value,
					pageIndex : 1,
				}));
			},
			name,
			type,
			setFilters,
			filters,
			...rest,
		};
		return (
			<div className={styles.col} style={{
				'--width': `${(singlecontrol.span || 1)*(100/12)}%`,
			} as React.CSSProperties}>
				<div>
				{!showlabel&&<div className={styles.showlabel}>{label as string}</div>}
				<Element key={name} {...customiseControl} />
				</div>
			</div>
		);
	}

	return (
		<div className={styles.flex}>
			{(controls || []).map((control)=>{
				const {groupBy,span,name, showGroupName=true}=control;
				if(groupBy){
					return (
						<>
						{showGroupName&&<div className={styles.groupHead}>{name}</div>}
						<div className={styles.col} style={{width:`${(span || 12)*(100/12)}%`}}>
							{(groupBy).map((each)=>(getElement(each)))}
						</div>
						</>
						)
				}else{
					return(<>{getElement(control)}</>)
				}
			})}
			{showClearBtn && (
				<Button
					id="clear-filters-btn"
					className="primary sm btn-create-payrun"
					disabled={Object.keys(filters||{}).length < 2}
					onClick={clearFilters}
				>
					Clear Filters
				</Button>
			)}
		</div>
	);
}

export default Filter;
