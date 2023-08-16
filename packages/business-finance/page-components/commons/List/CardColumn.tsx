import { Placeholder } from '@cogoport/components';
import React, { ReactNode } from 'react';

import RenderRibbon from '../../COEFinance/All_Invoices/PurchaseInvoiceView/RenderData/RenderRibbon';
import { FieldType, FunctionObjects, ConfigType } from '../Interfaces/index';

import getValue from './getValue';
import styles from './styles.module.css';

interface ItemTypes {
	objectId?: string;
}
export interface Props {
	fields: FieldType[];
	itemStyles?: React.CSSProperties;
	singleitem?: ItemTypes;
	functions?: FunctionObjects;
	config: ConfigType;
	isMobile?: boolean;
	loading?: boolean;
	subActiveTab?: string;
	width?: string;
	rowStyle?:string;
	viewId?:null
}

function CardColumn({
	fields,
	itemStyles,
	singleitem,
	functions = {},
	config,
	isMobile,
	loading,
	subActiveTab,
	width,
	rowStyle,
	viewId,
}: Props) {
	const { clickable } = config;
	const tableWidth = { minWidth: width } || {};
	let className = styles.row;
	if (rowStyle === 'border') {
		className = styles.row_style;
	} else if (viewId === singleitem?.objectId) {
		className = styles.accordian_style;
	}
	return (
		<section style={{ ...itemStyles, position: 'relative', ...tableWidth }}>
			<div
				className={`${className} 
				${clickable ? styles.clickable : ''} ${
					isMobile ? styles.is_mobile : ''
				}`}
			>
				{fields.map((field) => {
					const itemStyle = field.styles || {};
					return (
						<div
							key={field.key}
							className={`${styles.col} ${field.className || ''} ${
								isMobile ? styles.is_mobile : ''
							}`}
							style={{
								'--span' : field.span || 1,
								width    : `${((field.span || 1) * (100 / 12))}px`,
								...itemStyle,
							} as React.CSSProperties}
						>
							{isMobile && (
								<div className={styles.tablelabel}>{field.label}</div>
							)}
							{loading ? (
								<Placeholder />
							) : (
								<div className={styles.flex}>
									{getValue(singleitem, field, functions, '-') as ReactNode}
								</div>
							)}
						</div>
					);
				})}
			</div>
			{subActiveTab === 'purchase-view' && <RenderRibbon item={singleitem} />}
		</section>
	);
}

export default CardColumn;
