import React, { useMemo } from 'react';

import PREMADE_MAPPING from '../../../../../../../configurations/premade-mapping';

import PremadeItem from './PremadeItem';
import styles from './styles.module.css';

function Premade(props) {
	const {
		addNewItem,
		onNewItemAdding,
		selectedRow,
		parentComponentId,
		dropSource,
	} = props;

	let leftPanelPremadeMapping = PREMADE_MAPPING;

	if (dropSource === 'selectBox') {
		leftPanelPremadeMapping = (PREMADE_MAPPING || []).filter((item) => item.type !== 'carouselSample');
	}

	const PremadePanel = useMemo(
		() => (leftPanelPremadeMapping || []).map((item) => (
			<PremadeItem
				itemType={item.type}
				content={item}
				onClick={() => addNewItem(item, selectedRow?.index, true, parentComponentId, dropSource)}
				onNewItemAdding={onNewItemAdding}
			/>
		)),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[addNewItem, onNewItemAdding, selectedRow, parentComponentId],
	);

	return 	(
		<div className={styles.container}>
			{PremadePanel}
		</div>
	);
}

export default Premade;
