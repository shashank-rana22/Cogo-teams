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
	clearFilters?:Function,
	types?:string,
}

function Filter({
	controls = [],
	filters,
	setFilters = () => {},
	showClearBtn = false,
	clearFilters,
}:FilterProps) {
	return (
		<div className={styles.flex}>
			{(controls || []).map((control) => {
				const { span=0, name = '', type = '', ...rest }  = control || {};
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
						'--width': `${(control.span || 1)*(100/12)}%`,
					} as React.CSSProperties}>
						<Element key={name} {...customiseControl} />
					</div>
				);
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
