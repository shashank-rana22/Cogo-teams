/* eslint-disable max-len */
import { Button, Modal } from '@cogoport/components';
import React, { useCallback, useState } from 'react';

import CONTENT_MAPPING from '../../../configurations/default-content-mapping';
import DropBox from '../DropBox';
import LeftPanel from '../LeftPanel';
import Content from '../LeftPanel/Content';

import styles from './styles.module.css';

function DNDComponent() {
	const [activeTab, setActiveTab] = useState('content');
	const [component, setComponent] = useState({
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

	const [selectedItem, setSelectedItem] = useState({});

	const handleAddNewItem = useCallback(
		(content, hoveredIndex = component.layouts.length, shouldAddBelow = true, parentDetails = {}, componentType = '') => {
			const startIndex = shouldAddBelow ? hoveredIndex + 1 : hoveredIndex;

			if (componentType === 'child') {
				const { childId, parentId } = parentDetails || {};
				const data = component;

				const objIndex = data.layouts.findIndex((item) => item.parentId === parentId);

				data.layouts[objIndex].children[childId] = { ...CONTENT_MAPPING[content.type], ...data.layouts[objIndex].children[childId] };
				data.layouts[objIndex].children[childId].style = { ...data.layouts[objIndex].children[childId].style };

				setComponent(data);

				setSelectedRow({ ...data.layouts[objIndex] });

				setSelectedItem({ ...data.layouts[objIndex].children[childId] });
			} else {
				setComponent((prev) => ({
					...prev,
					layouts: [
						...component.layouts.slice(0, startIndex),
						{
							...CONTENT_MAPPING[content.type],
							...content,
							id: component.layouts.length + 1,
							// parentId,
						},
						...component.layouts.slice(startIndex),
					],
				}));

				setSelectedRow({
					...CONTENT_MAPPING[content.type],
					...content,
					id: component.layouts.length + 1,
				});

				setSelectedItem({
					...CONTENT_MAPPING[content.type],
					...content,
					id: component.layouts.length + 1,
				});
			}

			setShowContentModal(false);
			setParentComponentId(null);
		},
		[component],
	);

	const onClose = () => {
		setShowContentModal(false);
	};

	return (
		<div>
			<section className={styles.heading_container}>
				Customise Landing Pages V1
			</section>

			<section className={styles.body}>

				{modeType === 'edit' && (
					<div className={styles.left_panel}>
						<LeftPanel
							activeTab={activeTab}
							setActiveTab={setActiveTab}
							component={component}
							setComponent={setComponent}
							addNewItem={handleAddNewItem}
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
				)}

				<div className={styles.right_panel} style={{ width: modeType === 'edit' ? '70%' : '100%' }}>

					<section className={styles.header}>
						<div>
							<Button
								onClick={() => {
									setMode({ modeType: modeType === 'edit' ? 'preview' : 'edit' });
									setSelectedRow({});
								}}
								type="button"
								size="md"
								themeType="secondary"
							>
								{modeType === 'edit' ? 'Preview' : 'Back to editor'}

							</Button>
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
						<DropBox
							component={component}
							setComponent={setComponent}
							addNewItem={handleAddNewItem}
							onNewItemAdding={setNewItemAdding}
							selectedRow={selectedRow}
							setSelectedRow={setSelectedRow}
							isNewItemAdding={isNewItemAdding}
							parentComponentId={parentComponentId}
							setShowContentModal={setShowContentModal}
							setParentComponentId={setParentComponentId}
							setSelectedItem={setSelectedItem}

						/>
					</div>

				</div>

			</section>
			<section>

				<Modal
					size="md"
					show={showContentModal}
					onClose={onClose}
					placement="top"
					scroll={false}
				>
					<Modal.Header title="choose content" />
					<Content
						parentComponentId={parentComponentId}
						addNewItem={handleAddNewItem}
						onNewItemAdding={setNewItemAdding}
						selectedRow={selectedRow}
						componentType="child"
						selectedItem={selectedItem}
					/>

				</Modal>
			</section>
		</div>
	);
}

export default DNDComponent;
