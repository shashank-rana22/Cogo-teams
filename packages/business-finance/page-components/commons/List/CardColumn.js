import { Placeholder } from '@cogoport/components';
import React from 'react';

import RenderRibbon from '../../COEFinance/All_Invoices/PurchaseInvoiceView/RenderData/RenderRibbon';

import getValue from './getValue';
import styles from './styles.module.css';

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
}) {
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
				{(fields || []).filter((itm) => !itm?.hideColumn).map((field) => {
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
							}}
						>
							{isMobile && (
								<div className={styles.tablelabel}>{field.label}</div>
							)}
							{loading ? (
								<Placeholder />
							) : (
								<div className={styles.flex}>
									{getValue(singleitem, field, functions, '-')}
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
