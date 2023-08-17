import { cl } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

const DEFAULT_SPAN = 1;

const HUNDERED_PERCENT = 100;

const TOTAL_SPAN = 12;

function Header({ config = {}, setSort = () => {}, sort = {}, setTableFilters = () => {} }) {
	const { sortType, sortBy } = sort;
	const { fields, headerClass } = config;

	const handleClick = ({ field, type }) => {
		setSort({
			sortBy   : field.sortingKey,
			sortType : type,
		});
		setTableFilters((prev) => ({ ...prev, pageIndex: 1 }));
	};

	return (
		<section className={cl`${styles.header} ${headerClass === 'border' ? styles.border : ''}`}>
			{fields.map((field) => (
				<div
					className={cl`${styles.col} ${field.className || ''}`}
					key={field.key}
					style={{
						'--span' : field.span || DEFAULT_SPAN,
						width    : `${((field.span || DEFAULT_SPAN) * (HUNDERED_PERCENT / TOTAL_SPAN))}px`,
					}}
				>
					{field.label}
					{field.sortingKey && (
						<div className={styles.sort}>
							{
								(sortBy === field.sortingKey && sortType === 'Asc') ? (
									<IcMArrowRotateUp
										onClick={() => handleClick({ field, type: 'Desc' })}
										color={(sortBy === field.sortingKey) ? '#f68b21' : '#000'}
									/>
								) : (
									<IcMArrowRotateDown
										onClick={() => handleClick({ field, type: 'Asc' })}
										color={(sortBy === field.sortingKey) ? '#f68b21' : '#000'}
									/>
								)
							}
						</div>
					)}
				</div>
			))}
		</section>
	);
}

export default Header;
