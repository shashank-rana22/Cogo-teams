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
		selectedChildId,
	} = props;

	const { type } = selectedRow || {};

	const LeftPanelItems = useMemo(
		() => (contents || []).map((content) => (
			<Item
				itemType={content.type}
				content={content}
				onClick={() => addNewItem(content, selectedRow?.index, true, parentComponentId, componentType)}
				onNewItemAdding={onNewItemAdding}
			/>
		)),
		[addNewItem, onNewItemAdding, selectedRow],
	);

	if (type === 'html') {
		return (
			<div className={styles.container}>
				<HTMLEditor
					component={component}
					setComponent={setComponent}
					selectedRow={selectedRow}
					selectedChildId={selectedChildId}
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
