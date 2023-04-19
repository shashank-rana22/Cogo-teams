/* eslint-disable react-hooks/exhaustive-deps */
import dynamic from 'next/dynamic';
import React, { useMemo } from 'react';

import contents from '../../../../../configurations/basic-contents';

import Item from './Item';
import styles from './styles.module.css';

const HTMLEditor = dynamic(() => import('./HtmlEditor'), { ssr: false });

function Basic(props) {
	const {
		addNewItem,
		onNewItemAdding,
		selectedRow,
		parentComponentId,
		componentType,
		component,
		setComponent,
		selectedItem,
	} = props;

	const { type } = selectedItem || {};

	const LeftPanelItems = useMemo(
		() => (contents || []).map((item) => (
			<Item
				itemType={item.type}
				content={item}
				onClick={() => addNewItem(item, selectedRow?.index, true, parentComponentId, componentType)}
				onNewItemAdding={onNewItemAdding}
			/>
		)),
		[addNewItem, onNewItemAdding, selectedRow, parentComponentId],
	);

	if (type === 'html' && componentType !== 'child') {
		return (
			<div className={styles.container}>
				<HTMLEditor
					component={component}
					setComponent={setComponent}
					selectedRow={selectedRow}
					selectedItem={selectedItem}
				/>
			</div>
		);
	}

	return 	(
		<div className={styles.container}>
			{LeftPanelItems}
		</div>
	);
}

export default Basic;
