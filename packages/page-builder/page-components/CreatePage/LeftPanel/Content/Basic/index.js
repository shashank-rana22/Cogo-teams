/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react';

import contents from '../../../../../configurations/basic-contents';

import Item from './Item';
import styles from './styles.module.css';

function Basic(props) {
	const { components, setComponents, addNewItem, onNewItemAdding, selectedItem } = props;

	const LeftPanelItems = useMemo(
		() => (contents || []).map((content) => (
			<Item
				itemType={content.type}
				content={content}
				components={components}
				setComponents={setComponents}
				onClick={() => addNewItem(content, selectedItem?.index, true)}
				onNewItemAdding={onNewItemAdding}
			/>
		)),
		[addNewItem, onNewItemAdding, selectedItem],
	);
	return 	<div className={styles.container}>{LeftPanelItems}</div>;
}

export default Basic;
