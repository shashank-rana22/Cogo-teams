/* eslint-disable max-len */
import { IcMCrossInCircle, IcMDuplicate } from '@cogoport/icons-react';
import React, { useState } from 'react';
import { v1 as uuid } from 'uuid';

// import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

import ComponentBuilder from './ComponentBuilder';
import RenderComponents from './RenderComponent';
import styles from './styles.module.css';

function RightPanel(props) {
	const {
		widget,
		components,
		setComponents,
		index,
		id,
		// moveItem,
		isNewItemAdding,
		// onNewAddingItemProps,
		onClick,
		setSelectedRow,
		isSelected,
		selectedRow,
		setShowContentModal,
		setParentComponentId,
		setSelectedItem,
	} = props;
	const [childId, setChildId] = useState('');

	const { type, id: elementId } = widget || {};

	// const [state, setState] = useState({
	// 	width  : 800,
	// 	height : 170,
	// });

	// const { width, height } = state || {};

	const handleDelete = (e, itemList) => {
		e.stopPropagation();

		const { id: sId } = itemList || {};
		const data = components;
		const selectedComponentIndex = (data.layouts || []).findIndex((stageItem) => (stageItem.id === sId));
		data.layouts.splice(selectedComponentIndex, 1);

		setComponents(() => ({ ...data }));

		setSelectedRow({});
	};

	const handleSubmitClick = ({ childrenId, parentId }) => {
		setParentComponentId({ childId: childrenId, parentId });

		setShowContentModal(true);
	};

	const handleCopy = (e, itemList) => {
		e.stopPropagation();

		const { id: sId, parentId, children } = itemList || {};
		const newId = uuid();
		const data = components;
		const selectedComponentIndex = (data.layouts || []).findIndex((component) => (component.id === sId));

		const duplicateChildren = (children || []).map((item) => {
			const { properties } = item || {};
			const { content, attributes } = properties || {};
			const { type: childType } = content || {};

			const newAttributes = !childType ? { onClick: () => handleSubmitClick({ childrenId: item.id, parentId: newId }) } : attributes;

			return ({ ...item, parentId: newId, properties: { ...properties, attributes: newAttributes } });
		});

		const duplicateData = parentId ? {
			...itemList,
			children : duplicateChildren,
			id       : data.layouts.length + 1,
			parentId : newId,
		} : {
			...itemList,
			id: data.layouts.length + 1,
		};

		setComponents((prev) => ({
			...prev,
			layouts: [...data.layouts.slice(0, selectedComponentIndex + 1),
				{
					...duplicateData,
				},
				...data.layouts.slice(selectedComponentIndex + 1)],
		}));
	};

	const opacity = isNewItemAdding && !id ? '0.3' : '1';

	const border = isSelected && '1px solid #88cad1';

	return (

	// <ResizableBox
	// 	className="box"
	// 	axis={type === 'container' ? 'none' : 'both'}
	// 	minConstraints={[200, 200]}
	// 	maxConstraints={[800, 400]}
	// 	height={height}
	// 	width={width}
	// 	onResize={onResize}
	// >
		<div
			role="presentation"
			onClick={onClick}
			key={elementId}
			style={{
				opacity,
				border,
			}}
			className={styles.element_Container}
		>

			<div>
				{type === 'container'
					? <ComponentBuilder widget={widget} components={components} setComponents={setComponents} selectedRow={selectedRow} childId={childId} setChildId={setChildId} setSelectedItem={setSelectedItem} />
					: <RenderComponents componentType={type} widget={widget} components={components} setComponents={setComponents} elementId={elementId} childId={childId} selectedRow={selectedRow} setSelectedItem={setSelectedItem} index={index} />}
			</div>

			<div role="presentation" className={styles.change}>
				<IcMCrossInCircle height="24px" width="24px" cursor="pointer" onClick={(e) => handleDelete(e, widget)} />
				<IcMDuplicate height="24px" width="24px" cursor="pointer" onClick={(e) => handleCopy(e, widget)} />
			</div>
		</div>
	// </ResizableBox>
	);
}

export default RightPanel;
