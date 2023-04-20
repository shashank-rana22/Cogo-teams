import React, { useState, useCallback } from 'react';
import { v1 as uuid } from 'uuid';

import CONTENT_MAPPING from '../../../configurations/new-default-content-mapping';
import { SIDEBAR_ITEM, COMPONENT, COLUMN } from '../constants';
import DropZone from '../DropZone';
import {
	handleMoveWithinParent,
	handleMoveToDifferentParent,
	handleMoveSidebarComponentIntoParent,
	handleRemoveItemFromLayout,
} from '../helpers';
import initialData from '../initial-data';
import LeftPanel from '../LeftPanel';
import Row from '../Row';
// import SideBarItem from '../SideBarItem';
// import TrashDropZone from '../TrashDropZone';

import styles from './styles.module.css';

function DNDComponent() {
	const initialLayout = initialData.layout;
	// const initialComponents = initialData.components;
	const [layout, setLayout] = useState(initialLayout);
	// const [components, setComponents] = useState(initialComponents);

	const [showContentModal, setShowContentModal] = useState(false);
	const [parentComponentId, setParentComponentId] = useState(null);
	const [isNewItemAdding, setNewItemAdding] = useState(false);
	const [activeTab, setActiveTab] = useState('content');
	const [selectedRow, setSelectedRow] = useState({});
	const [selectedItem, setSelectedItem] = useState({});

	console.log('sdjsdkjd', layout);

	// const handleDropToTrashBin = useCallback(
	// 	(dropZone, item) => {
	// 		const splitItemPath = item.path.split('-');
	// 		setLayout(handleRemoveItemFromLayout(layout, splitItemPath));
	// 	},
	// 	[layout],
	// );

	const handleDrop = useCallback(
		(dropZone, item) => {
			const splitDropZonePath = dropZone.path.split('-');
			const pathToDropZone = splitDropZonePath.slice(0, -1).join('-');

			const { id, type, component } = item || {};

			const { type: componentType } = component || {};

			const newItem = { id, type };

			if (item.type === COLUMN) {
				newItem.children = item.children;
			}

			// sidebar into
			if (item.type === SIDEBAR_ITEM) {
			// 1. Move sidebar item into page
				const newComponent = {
					id: uuid(),
					...CONTENT_MAPPING[componentType],
				};

				const childItem = {
					...CONTENT_MAPPING[componentType],
					id   : newComponent.id,
					type : COMPONENT,
				};
				// setComponents({
				// 	...components,
				// 	[newComponent.id]: newComponent,
				// });
				setLayout(
					handleMoveSidebarComponentIntoParent(
						layout,
						splitDropZonePath,
						childItem,
					),
				);
				return;
			}

			// move down here since sidebar items dont have path
			const splitItemPath = item.path.split('-');
			const pathToItem = splitItemPath.slice(0, -1).join('-');

			// 2. Pure move (no create)
			if (splitItemPath.length === splitDropZonePath.length) {
			// 2.a. move within parent
				if (pathToItem === pathToDropZone) {
					setLayout(
						handleMoveWithinParent(layout, splitDropZonePath, splitItemPath),
					);
					return;
				}

				// 2.b. OR move different parent
				// TODO FIX columns. item includes children
				setLayout(
					handleMoveToDifferentParent(
						layout,
						splitDropZonePath,
						splitItemPath,
						newItem,
					),
				);
				return;
			}

			// 3. Move + Create
			setLayout(
				handleMoveToDifferentParent(
					layout,
					splitDropZonePath,
					splitItemPath,
					newItem,
				),
			);
		},
		[layout],
	);

	const renderRow = (row, currentPath) => (
		<Row
			key={row.id}
			data={row}
			handleDrop={handleDrop}
			// components={components}
			path={currentPath}
		/>
	);

	// const handleAddNewItem = useCallback(
	// 	() => {
	// 		console.log('sdjiii');
	// 	},
	// 	[components],
	// );

	// dont use index for key when mapping over items
	// causes this issue - https://github.com/react-dnd/react-dnd/issues/342
	return (
		<div className={styles.body}>
			<div className={styles.sideBar}>
				<LeftPanel
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					// component={components}
					// setComponent={setComponents}
					// addNewItem={handleAddNewItem}
					onNewItemAdding={setNewItemAdding}
					selectedRow={selectedRow}
					setSelectedRow={setSelectedRow}
					showContentModal={showContentModal}
					setShowContentModal={setShowContentModal}
					parentComponentId={parentComponentId}
					setParentComponentId={setParentComponentId}
					selectedItem={selectedItem}
				/>
			</div>
			<div className={styles.pageContainer}>
				<div className={styles.page}>
					{layout.map((row, index) => {
          	const currentPath = `${index}`;

          	return (
	<div key={row.id}>
		<DropZone
			data={{
				path          : currentPath,
				childrenCount : layout.length,
			}}
			onDrop={handleDrop}
			path={currentPath}
		/>
		{renderRow(row, currentPath)}
	</div>
          	);
					})}
					<DropZone
						data={{
							path          : `${layout.length}`,
							childrenCount : layout.length,
						}}
						onDrop={handleDrop}
						isLast
					/>
				</div>

				{/* <TrashDropZone
					data={{
          	layout,
					}}
					onDrop={handleDropToTrashBin}
				/> */}
			</div>
		</div>
	);
}
export default DNDComponent;
