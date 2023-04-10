/* eslint-disable no-mixed-spaces-and-tabs */
import { Button } from '@cogoport/components';
import React, { useCallback, useState } from 'react';

import DropBox from '../DropBox';
import LeftPanel from '../LeftPanel';

import styles from './styles.module.css';

function DNDComponent() {
	const [activeTab, setActiveTab] = useState('content');
	const [components, setComponents] = useState([]);

	const [isNewItemAdding, setNewItemAdding] = useState(false);

	const [selectedItem, setSelectedItem] = useState({});

	const handleAddNewItem = useCallback(
		(content, hoveredIndex = components.length, shouldAddBelow = true) => {
		  const startIndex = shouldAddBelow ? hoveredIndex + 1 : hoveredIndex;

		  setComponents(() => ([
				...components.slice(0, startIndex),

				{ id: components.length + 1, ...content },
				...components.slice(startIndex),
		  ]));

		  setSelectedItem({
				id    : components.length + 1,
				index : startIndex,
		  });
		},
		[components],
	  );

	  const MemoLeftPanel = useCallback(
		() => (
			<LeftPanel
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				components={components}
				setComponents={setComponents}
				addNewItem={handleAddNewItem}
				onNewItemAdding={setNewItemAdding}
				selectedItem={selectedItem}
			/>
		),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[handleAddNewItem, selectedItem],

	  );
	  const MemoRightPanel = useCallback(
		() => (
			<DropBox
				components={components}
				setComponents={setComponents}
				addNewItem={handleAddNewItem}
				onNewItemAdding={setNewItemAdding}
				selectedItem={selectedItem}
				setSelectedItem={setSelectedItem}
				isNewItemAdding={isNewItemAdding}
			/>
		),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[handleAddNewItem, selectedItem, isNewItemAdding],

	  );

	return (
		<div>
			<section className={styles.heading_container}>
				Customise Landing Pages V1
			</section>

			<section className={styles.body}>
				<div className={styles.left_panel}>
					<MemoLeftPanel />
				</div>

				<div className={styles.right_panel}>

					<section className={styles.header}>
						<div>
							<Button type="button" size="md" themeType="secondary">Preview</Button>
						</div>

						<div className={styles.button_container}>
							<Button
								style={{ marginRight: '8px' }}
								type="button"
								size="md"
								themeType="secondary"
							>
								Save

							</Button>
							<Button type="button" size="md">Save & Close</Button>
						</div>
					</section>

					<div>
						<MemoRightPanel />

					</div>

				</div>

			</section>
		</div>
	);
}

export default DNDComponent;

// className={styles.reactGridItem}
// key={widget.i}
// data-grid={{
// 	i           : widget?.i,
// 	x           : widget?.x,
// 	y           : widget?.y,
// 	w           : widget?.w,
// 	h           : widget?.h,
// 	minW        : 2,
// 	maxW        : Infinity,
// 	minH        : 2,
// 	maxH        : Infinity,
// 	isDraggable : true,
// 	isResizable : true,
// }}
