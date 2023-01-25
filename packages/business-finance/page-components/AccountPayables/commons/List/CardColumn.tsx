import React, { ReactNode } from 'react';
import getValue from './getValue';
import { FieldType, FunctionObjects, ConfigType } from '../Interfaces/index';
import styles from './styles.module.css';
import { Placeholder } from '@cogoport/components';

export interface Props {
	fields: FieldType[];
	itemStyles?: React.CSSProperties;
	singleitem?: number | object;
	functions?: FunctionObjects;
	config: ConfigType;
	isMobile?: boolean;
	loading?: boolean;
	subActiveTab:string
}

function CardColumn({
	fields,
	itemStyles,
	singleitem,
	functions={},
	config,
	isMobile,
	loading,
}:Props) {
	const { clickable } = config;
	return (
		<section style={{...itemStyles, position:'relative'}}>
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
							{loading?<Placeholder/>:
							<div className={styles.flex}>
								{getValue(
									singleitem,
									field,
									functions,
									'-',
								) as ReactNode}
							</div>
							}
						</div>
					);
				})}
			</div>
		</section>
	);
}

export default CardColumn;