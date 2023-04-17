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
		selectedItem,
		parentComponentId,
		componentType,
		component,
		setComponent,
		selectedChildId,
	} = props;

	const { type } = selectedItem || {};

	const LeftPanelItems = useMemo(
		() => (contents || []).map((content) => (
			<Item
				itemType={content.type}
				content={content}
				onClick={() => addNewItem(content, selectedItem?.index, true, parentComponentId, componentType)}
				onNewItemAdding={onNewItemAdding}
			/>
		)),
		[addNewItem, onNewItemAdding, selectedItem],
	);

	if (type === 'html') {
		return (
			<div className={styles.container}>
				<HTMLEditor
					component={component}
					setComponent={setComponent}
					selectedItem={selectedItem}
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
