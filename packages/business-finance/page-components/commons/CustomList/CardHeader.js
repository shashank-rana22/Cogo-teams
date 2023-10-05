import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function Header({
	fields, sort, setSort = () => [], headerStyles, renderHeaderCheckbox = () => '', showHeaderCheckbox = false,
}) {
	const handleOnChangeSort = (item, sortType) => {
		const fieldType = item.sorting.name;
		setSort(() => ({
			[fieldType]: sortType,
		}));
	};

	return (
		<header className={styles.header} style={headerStyles}>
			{showHeaderCheckbox && renderHeaderCheckbox()}
			{(fields || []).map((field) => {
				const { label, className, sorting } = field || {};
				return (
					<div
						key={String(label)}
						className={`${styles.col} ${className || ''}`}
						style={{ '--span': field.span || 1 }}
					>
						{label}
						{sorting && (
							<>
								<div className={`${styles.up_icon} ${sort[sorting?.name] === 'asc'
									? styles.is_active
									: null} `}
								>
									<IcMArrowRotateUp
										onClick={() => handleOnChangeSort(field, 'asc')}
									/>
								</div>
								<div className={`${styles.down_icon} ${sort[sorting?.name] === 'desc'
									? styles.is_active
									: null} `}
								>
									<IcMArrowRotateDown
										onClick={() => handleOnChangeSort(field, 'desc')}
									/>
								</div>
							</>
						)}
					</div>
				);
			})}
		</header>
	);
}

export default Header;
