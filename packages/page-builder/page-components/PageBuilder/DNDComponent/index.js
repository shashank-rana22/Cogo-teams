/* eslint-disable max-len */
import React, { useCallback, useState } from 'react';

import getContentMapping from '../../../configurations/default-content-mapping';

import DNDBody from './DNDBody';
import SelectComponentModal from './SelectComponentModal';
import styles from './styles.module.css';

function DNDComponent() {
	const [pageConfiguration, setPageConfiguration] = useState({
		id      : 0,
		layouts : [],
		style   : {
			backgroundSize: 'cover',
		},
	});

	const [showContentModal, setShowContentModal] = useState(false);

	const [parentComponentId, setParentComponentId] = useState(null);

	const [mode, setMode] = useState({
		modeType: 'edit',
	});

	const { modeType } = mode || {};

	const [isNewItemAdding, setNewItemAdding] = useState(false);

	const [selectedRow, setSelectedRow] = useState({});

	const [selectedColumn, setSelectedColumn] = useState({});

	const [selectedItem, setSelectedItem] = useState({});

	const [selectedNestedColumn, setSelectedNestedColumn] = useState({});

	const handleAddNewItem = useCallback(
		(content, hoveredIndex = pageConfiguration.layouts.length, shouldAddBelow = true, parentDetails = {}, dropSource = '') => {
			const startIndex = shouldAddBelow ? hoveredIndex + 1 : hoveredIndex;

			const { type } = content || {};

			const CONTENT_MAPPING = getContentMapping();

			if (dropSource === 'selectBox') {
				const { childId, parentId } = parentDetails || {};

				const data = pageConfiguration;

				const objIndex = data.layouts.findIndex((item) => item.parentId === parentId);

				data.layouts[objIndex].component.children[childId] = {
					...CONTENT_MAPPING[type],
					...data.layouts[objIndex].component.children[childId],
					component: { ...CONTENT_MAPPING[type].component, style: data.layouts[objIndex].component.children[childId].component.style },
				};

				setPageConfiguration({ ...data });

				setSelectedRow({ ...data.layouts[objIndex] });

				setSelectedItem({ ...data.layouts[objIndex].component.children[childId] });
			} else {
				setPageConfiguration((prev) => ({
					...prev,
					layouts: [
						...pageConfiguration.layouts.slice(0, startIndex),
						{
							...CONTENT_MAPPING[type],
							...content,
							id: pageConfiguration.layouts.length + 1,
						},
						...pageConfiguration.layouts.slice(startIndex),
					],
				}));

				setSelectedRow({
					...CONTENT_MAPPING[type],
					...content,
					id: pageConfiguration.layouts.length + 1,
				});

				setSelectedItem({
					...CONTENT_MAPPING[type],
					...content,
					id: pageConfiguration.layouts.length + 1,
				});
			}

			setShowContentModal(false);
			setParentComponentId(null);
		},

		[pageConfiguration],
	);

	return (
		<div>
			<section className={styles.heading_container}>
				Cogo Page Builder
			</section>

			<DNDBody
				pageConfiguration={pageConfiguration}
				setPageConfiguration={setPageConfiguration}
				addNewItem={handleAddNewItem}
				onNewItemAdding={setNewItemAdding}
				selectedRow={selectedRow}
				setSelectedRow={setSelectedRow}
				showContentModal={showContentModal}
				setShowContentModal={setShowContentModal}
				parentComponentId={parentComponentId}
				setParentComponentId={setParentComponentId}
				selectedItem={selectedItem}
				setSelectedItem={setSelectedItem}
				selectedColumn={selectedColumn}
				selectedNestedColumn={selectedNestedColumn}
				isNewItemAdding={isNewItemAdding}
				setSelectedColumn={setSelectedColumn}
				setSelectedNestedColumn={setSelectedNestedColumn}
				modeType={modeType}
				setMode={setMode}
			/>

			<SelectComponentModal
				parentComponentId={parentComponentId}
				addNewItem={handleAddNewItem}
				onNewItemAdding={setNewItemAdding}
				selectedRow={selectedRow}
				selectedItem={selectedItem}
				setParentComponentId={setParentComponentId}
				setShowContentModal={setShowContentModal}
				pageConfiguration={pageConfiguration}
				setPageConfiguration={setPageConfiguration}
				selectedColumn={selectedColumn}
				selectedNestedColumn={selectedNestedColumn}
				showContentModal={showContentModal}
			/>
		</div>
	);
}

export default DNDComponent;
