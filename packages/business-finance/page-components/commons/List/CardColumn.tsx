import React from 'react';

import getValue from './getValue';
import { FieldType, NestedObj, ConfigType } from './Interfaces/index';
import styles from './styles.module.css';

export interface Props {
	fields: FieldType[];
	itemStyles?: React.CSSProperties;
	singleitem?: any;
	functions?: NestedObj;
	config: ConfigType;
	isMobile?: boolean;
}

function CardColumn({
	fields,
	itemStyles,
	singleitem,
	functions,
	config,
	isMobile,
}:Props) {
	const { clickable } = config;
	return (
		<section style={itemStyles}>
			<div
				className={`${styles.row} ${clickable ? styles.clickable : ''} ${
					isMobile ? styles.isMobile : ''
				}`}
			>
				{fields.map((field) => {
					const itemStyle = field.styles || {};
					return (
						<div
							className={`${styles.col} ${field.className || ''} ${
								isMobile ? styles.isMobile : ''
							}`}
							style={{
								'--span': (field.span || 1),
								...itemStyle,
							} as React.CSSProperties}
						>
							{isMobile && (
								<div className={styles.tablelabel}>{field.label}</div>
							)}
							<div className={styles.flex}>
								{getValue(
									singleitem,
									field,
									functions,
									'sample styling for the table',
								)}
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}

export default CardColumn;
