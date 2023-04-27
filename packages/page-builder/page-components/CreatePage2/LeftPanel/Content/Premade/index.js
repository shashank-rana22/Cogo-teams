import React, { useMemo } from 'react';

import PREMADE_MAPPING from '../../../../../configurations/premade-mapping';

import Item from './Item';
import styles from './styles.module.css';

function Premade(props) {
	const {
		addNewItem,
		onNewItemAdding,
		selectedRow,
		parentComponentId,
		componentType,
		// component,
		// setComponent,
		// selectedItem,
	} = props;

	const LeftPanelItems = useMemo(
		() => (PREMADE_MAPPING || []).map((item) => (
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

	return 	(
		<div className={styles.container}>
			{LeftPanelItems}
		</div>
	);
}

export default Premade;
