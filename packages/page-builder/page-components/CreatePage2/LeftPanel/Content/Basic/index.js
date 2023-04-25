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

	let leftPanelContent = contents;

	if (componentType === 'child') {
		leftPanelContent = (contents || []).filter((item) => item.type !== 'carousel');
	}

	const LeftPanelItems = useMemo(
		() => (leftPanelContent || []).map((item) => (
			<Item
				itemType={item.type}
				content={item}
				onClick={() => addNewItem(item, selectedRow?.index, true, parentComponentId, componentType)}
				onNewItemAdding={onNewItemAdding}
			/>
		)),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[addNewItem, onNewItemAdding, selectedRow, parentComponentId],
	);

	if (type === 'html' && componentType !== 'child') {
		return (
			<div className={styles.editor_container}>
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
