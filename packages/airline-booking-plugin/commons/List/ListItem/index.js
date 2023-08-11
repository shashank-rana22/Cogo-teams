import { cl } from '@cogoport/components';
import React from 'react';

import CONSTANTS from '../../../constants/constants';

import getValue from './getValue';
import styles from './styles.module.css';

const { DEFAULT_SPAN } = CONSTANTS;

function CardItem({
	fields = [],
	singleitem = {},
	functions = {},
	isMobile = false,
}) {
	return (
		<section className={styles.list_container}>
			<div
				className={cl`${styles.row} ${
					isMobile ? styles.is_mobile : ''
				}`}
			>
				{(fields || []).map((field) => {
					const { className, span, key, render, label, styles:fieldStyles } = field || {};
					const itemStyle = fieldStyles || {};

					return (
						<div
							className={cl`${styles.col} ${className} ${
								isMobile ? styles.is_mobile : ''
							}`}
							style={{
								'--span': (span || DEFAULT_SPAN),
								...itemStyle,
							}}
							key={key}
						>
							{isMobile && (
								<div className={styles.table_label}>{label}</div>
							)}

							<div
								className={styles.flex}
							>
								{render ? field.render(singleitem) : getValue(
									singleitem,
									field,
									functions,
									'-',
								) }
							</div>

						</div>
					);
				})}
			</div>
		</section>
	);
}

export default CardItem;
