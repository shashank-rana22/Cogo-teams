import { Button } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';
import React from 'react';

import { lineItemConfig } from '../../../../configurations/finalLineItemConfig';
import { EMPTY_LINE_ITEMS } from '../../../../Constants';

import { renderLineItemFunctions } from './RenderFunctions';
import styles from './styles.module.css';

function LineItemDetails({
	control,
	watch = () => {},
	entity,
	errors,
	getGlCode,
	setValue,
}) {
	const { fields, append, remove, insert } = useFieldArray({
		control,
		name: 'line_items',
	});

	return (
		<div className={styles.border}>
			<div className={styles.tableheader}>
				{(lineItemConfig).map((field) => (
					<div
						style={{
							flex  : (field.span || 1),
							width : `${((field.span || 1) * (100 / 12))}px`,
						}}
						className={styles.fieldstyle}
						key={field.key || field.label}
					>
						{field.label}
					</div>
				))}
			</div>
			<div>
				{fields.map((lineitem, index) => (
					<div className={styles.tablecolumn} key={lineitem.id}>
						{lineItemConfig.map((field) => (
							<div
								style={{
									flex  : (field.span || 1),
									width : `${((field.span || 1) * (100 / 12))}px`,
								}}
								className={styles.value}
								key={field.key || field.label}
							>
								{renderLineItemFunctions[field?.key]
									? renderLineItemFunctions[field?.key]({
										control,
										getGlCode,
										index,
										remove,
										insert,
										showDelete: fields?.length > 1,
										setValue,
										entity,
										watch,
										errors,
									}) : '-'}
							</div>
						))}
					</div>
				))}
				<div className={styles.addbuttonborder}>
					<Button
						className={styles.addbutton}
						onClick={() => { append(EMPTY_LINE_ITEMS); }}
					>
						+ Add Line Item
					</Button>
				</div>
			</div>
		</div>
	);
}

export default LineItemDetails;
