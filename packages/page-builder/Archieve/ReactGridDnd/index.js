/* eslint-disable max-len */
import { Button, Modal } from '@cogoport/components';
import React, { useCallback, useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';

import CONTENT_MAPPING from '../../configurations/default-content-mapping';

import LeftPanel from './LeftPanel';
import Content from './LeftPanel/Content';
import RightPanel from './RightPanel';
import styles from './styles.module.css';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

function DNDComponent() {
	const [activeTab, setActiveTab] = useState('content');
	const [component, setComponent] = useState({
		id      : 0,
		layouts : [],
		style   : {
			backgroundSize: 'cover',
		},
	});

	console.log('sdkjisodk', component);

	const [showContentModal, setShowContentModal] = useState(false);
	const [parentComponentId, setParentComponentId] = useState(null);
	const [mode, setMode] = useState({
		modeType: 'edit',
	});

	const { modeType } = mode || {};

	const [isNewItemAdding, setNewItemAdding] = useState(false);

	const [selectedRow, setSelectedRow] = useState({});

	const [selectedItem, setSelectedItem] = useState({});

	const [layouts, setLayouts] = useState({ lg: [] });

	const handleModify = (layout) => {
		// const tempArray = component;

		// const newLayout = layout?.map((position) => {
		// 	const { i, x, y, w, h } = position;

		// 	const index = Number(i);

		// 	tempArray[index].x = x;
		// 	tempArray[index].y = y;
		// 	tempArray[index].width = w;
		// 	tempArray[index].height = h;
		// 	return tempArray[index];
		// });

		// setLayouts(newLayout);

		// setComponent(tempArray);
	};

	const onLayoutChange = (layout) => {
		console.log('fidfiji', layout);
		// setlatestLayout(layout);
	};

	const onResize = (layout, oldLayoutItem, layoutItem, placeholder) => {
		const layoutItems = layoutItem;
		const placeHolder = placeholder;

		// const { i } = layoutItem;

		// const { widget_type } = items.find((val) => val.i === i);

		// if (widget_type === 'title') {
		// 	if (layoutItem.w < 4) {
		// 		layoutItems.w = 4;
		// 		placeHolder.w = 4;
		// 	}

		// 	if (layoutItems.h < 3) {
		// 		layoutItems.h = 3;
		// 		placeHolder.h = 3;
		// 	}
		// } else if (widget_type === 'table') {
		// 	if (layoutItem.w < 4) {
		// 		layoutItems.w = 4;
		// 		placeHolder.w = 4;
		// 	}

		// 	if (layoutItems.h < 10) {
		// 		layoutItems.h = 10;
		// 		placeHolder.h = 10;
		// 	}
		// } else {
		// 	if (layoutItem.w < 4) {
		// 		layoutItems.w = 4;
		// 		placeHolder.w = 4;
		// 	}

		// 	if (layoutItems.h < 8) {
		// 		layoutItems.h = 8;
		// 		placeHolder.h = 8;
		// 	}
		// }
	};

	const LAYOUT_PROPS = {
		rowHeight : 24,
		cols      : {
			lg  : 12,
			md  : 12,
			sm  : 12,
			xs  : 12,
			xxs : 12,
		},
		margin             : [16, 16],
		useCSSTransforms   : true,
		horizontalCompact  : true,
		measureBeforeMount : false,
		compactType        : 'vertical',
		onLayoutChange,
		onResize,
		isBounded          : true,
	};

	// const handleAdd = () => {
	// 	setComponents([
	// 		...components,
	// 		{ x: 0, y: 0, w: 1, h: 1, id: uuid() },
	// 	]);
	// };

	const handleDelete = (key) => {
		// const tempArray = component.slice();

		// const widgetIndex = tempArray.indexOf(tempArray.find((data) => data.i === key));
		// tempArray.splice(widgetIndex, 1);

		// const modifiedArray = tempArray.map((temp, index) => ({
		// 	...temp,
		// 	i: index,

		// }));

		// setComponent(modifiedArray);
	};

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

				setLayouts({ lg: data.layouts });
			} else {
				setComponent((prev) => ({
					...prev,
					layouts: [
						...component.layouts.slice(0, startIndex),
						{
							...CONTENT_MAPPING[content.type],
							...content,
							id : component.layouts.length + 1,
							// parentId,
							i  : component.layouts.length + 1,
						},
						...component.layouts.slice(startIndex),
					],
				}));

				setLayouts({
					lg: [
						...component.layouts.slice(0, startIndex),
						{
							...CONTENT_MAPPING[content.type],
							...content,
							id : component.layouts.length + 1,
							i  : component.layouts.length + 1,
						// parentId,
						},
						...component.layouts.slice(startIndex),
					],
				});

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

						<ResponsiveGridLayout
							className="layout"
							layouts={layouts}
							isDraggable
							isResizable
							{...LAYOUT_PROPS}
						>
							{(component.layouts || [])?.map((widget, index) => {
    	const { id, type } = widget;
    	return (
	<div
		className={styles.reactGridItem}
		key={widget.i}
		data-grid={{
			i           : widget?.i,
			x           : widget?.x,
			y           : widget?.y,
			w           : widget?.w,
			h           : widget?.h,
			minW        : 0,
			maxW        : Infinity,
			minH        : 0,
			maxH        : Infinity,
			isDraggable : true,
			isResizable : true,
		}}
	>

		<button
			className={styles.deleteButton}
			onClick={() => handleDelete(widget.i)}
		>
			x
		</button>

		<RightPanel
			widget={widget}
			components={component}
			setComponents={setComponent}
			index={index}
			id={id}
			key={id}
			type={type}
                    // moveItem={moveItem}
                    // isNewItemAdding={isNewItemAdding}
                    // onNewAddingItemProps={handleNewAddingItemPropsChange}
			onClick={() => setSelectedRow({ ...widget, id, index })}
			isSelected={!!id && id === selectedRow?.id}
			selectedRow={selectedRow}
			setSelectedRow={setSelectedRow}
			setShowContentModal={setShowContentModal}
			setParentComponentId={setParentComponentId}
			setSelectedItem={setSelectedItem}
		/>

	</div>

    	);
							})}
						</ResponsiveGridLayout>

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
