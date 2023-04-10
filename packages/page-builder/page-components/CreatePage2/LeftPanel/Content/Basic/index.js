/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react';

import contents from '../../../../../configurations/basic-contents';

import Item from './Item';
import styles from './styles.module.css';

function Basic(props) {
	const { addNewItem, onNewItemAdding, selectedItem, parentComponentId } = props;

	const LeftPanelItems = useMemo(
		() => (contents || []).map((content) => (
			<Item
				itemType={content.type}
				content={content}
				onClick={() => addNewItem(content, selectedItem?.index, true, parentComponentId, content.type)}
				onNewItemAdding={onNewItemAdding}
			/>
		)),
		[addNewItem, onNewItemAdding, selectedItem],
	);
	return 	<div className={styles.container}>{LeftPanelItems}</div>;
}

export default Basic;
