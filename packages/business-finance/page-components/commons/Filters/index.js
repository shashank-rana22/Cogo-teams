import { Button, cl } from '@cogoport/components';
import React from 'react';

import Element from './Element/index';
import styles from './styles.module.css';

function Filter({
	controls = [],
	filters = {},
	setFilters = () => {},
	showClearBtn = false,
	clearFilters = () => {},
	pageKey = 'pageIndex',
}) {
	function GetElement({ singleControl = {} }) {
		const {
			span = 0, name = '', type = '', groupby, showlabel = false, label, show = true, ...rest
		} = singleControl || {};

		const customiseControl = {
			id       : `filter-${name}`,
			value    : filters?.[name] || '',
			onChange : (val) => {
				let value;
				if (type === 'input') value = val;
				else if (type === 'datepicker' || type === 'singleDateRange') value = val;
				else value = val;
				setFilters((prev) => ({
					...prev,
					[name]                   : value,
					[pageKey || 'pageIndex'] : 1,
					page                     : 1,
				}));
			},
			name,
			type,
			setFilters,
			filters,
			...rest,
		};

		if (!show) {
			return null;
		}

		return (
			<div
				className={styles.col}
				style={{
					'--width': `${(span || 1) * (100 / 12)}%`,
				}}
				key={name}
			>
				<div>
					{!showlabel && <div className={styles.showlabel}>{label}</div>}
					<Element key={name} {...customiseControl} />
				</div>
			</div>
		);
	}

	return (
		<div className={cl`${styles.flex} filter`}>
			{(controls || []).map((control) => {
				const { groupBy, span, name, showGroupName = true, showStyledHeading = true } = control;
				if (groupBy) {
					return (
						<>
							{showGroupName && (
								<div className={showStyledHeading ? styles.group_head
									: styles.simple_head}
								>
									{name}
								</div>
							)}
							<div className={styles.col} style={{ width: `${(span || 12) * (100 / 12)}%` }}>
								{(groupBy).map((each) => GetElement({ singleControl: each }))}
							</div>
						</>
					);
				}
				return (<>{GetElement({ singleControl: control })}</>);
			})}
			{showClearBtn && (
				<Button
					id="clear-filters-btn"
					className="primary sm btn-create-payrun"
					disabled={Object.keys(filters || {}).length < 2}
					onClick={clearFilters}
				>
					Clear Filters
				</Button>
			)}
		</div>
	);
}

export default Filter;
