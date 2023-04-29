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
		dropSource,
		pageConfiguration,
		setPageConfiguration,
		selectedItem,
		selectedColumn,
		selectedNestedColumn,
	} = props;

	const { component } = selectedItem || {};

	const { type } = component || {};

	let leftPanelContent = contents;

	if (dropSource === 'selectBox') {
		leftPanelContent = (contents || []).filter((item) => item.type !== 'carousel');
	}

	const LeftPanelItems = useMemo(
		() => (leftPanelContent || []).map((item) => (
			<Item
				itemType={item.type}
				content={item}
				onClick={() => addNewItem(item, selectedRow?.index, true, parentComponentId, dropSource)}
				onNewItemAdding={onNewItemAdding}
			/>
		)),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[addNewItem, onNewItemAdding, selectedRow, parentComponentId],
	);

	if (type === 'html' && dropSource !== 'selectBox') {
		return (
			<div className={styles.editor_container}>
				<HTMLEditor
					pageConfiguration={pageConfiguration}
					setPageConfiguration={setPageConfiguration}
					selectedRow={selectedRow}
					selectedItem={selectedItem}
					selectedColumn={selectedColumn}
					selectedNestedColumn={selectedNestedColumn}
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
