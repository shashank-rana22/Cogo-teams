import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

const sampleData = [
	{
		id       : 1,
		name     : 'Node 1',
		children : [
			{
				id       : 2,
				name     : 'Child 1 of Node 1',
				children : [
					{
						id   : 10,
						name : 'Child 1 of Node 1',
					},
					{
						id   : 11,
						name : 'Child 2 of Node 1',
					},
				],
			},
			{
				id   : 3,
				name : 'Child 2 of Node 1',
			},
		],
	},
	{
		id       : 4,
		name     : 'Node 2',
		children : [
			{
				id   : 5,
				name : 'Child of Node 2',
			},
		],
	},
	{
		id       : 6,
		name     : 'Node 3',
		children : [
			{
				id   : 7,
				name : 'Child 1 of Node 3',
			},
			{
				id   : 8,
				name : 'Child 2 of Node 3',
			},
			{
				id   : 9,
				name : 'Child 3 of Node 3',
			},
		],
	},
];

const data = [];

const useHandleCurriculum = () => {
	const [finalData, setFinalData] = useState(data);

	const [draggedNode, setDraggedNode] = useState(null);

	const handleDragStart = (event, node) => {
		setDraggedNode(node);
		event.dataTransfer.setData('text', JSON.stringify(node));
	};

	const handleDragOver = (event) => {
		event.preventDefault();
	};

	const handleDrop = (event, parentNode, isChild) => {
		event.preventDefault();

		if (!isChild) {
			const newItems = finalData.filter((i) => i.id !== draggedNode.id);
			const newIndex = finalData.findIndex((i) => i.id === parentNode.id);
			newItems.splice(newIndex, 0, draggedNode);
			setFinalData(newItems);
			setDraggedNode(null);
		} else {
			let newData = [];

			if (parentNode.id === draggedNode.id) {
				newData = finalData;
			} else {
				newData = finalData.map((item) => {
					if (
						item.children
							.map((childItem) => childItem.id)
							.includes(draggedNode.id)
						|| item.children
							.map((childItem) => childItem.id)
							.includes(parentNode.id)
					) {
						const itemIndex = item.children.findIndex(
							(i) => i.id === draggedNode.id,
						);

						const filteredChildren = item.children;

						if (itemIndex !== -1) {
							filteredChildren.splice(itemIndex, 1);
						}

						const addIndex = filteredChildren.findIndex(
							(i) => i.id === parentNode.id,
						);

						if (addIndex !== -1) {
							filteredChildren.splice(addIndex, 0, draggedNode);
						}

						return { ...item, children: filteredChildren };
					}

					return item;
				});
			}

			setFinalData(newData);
			setDraggedNode(null);
		}
	};

	const addModule = () => {
		setFinalData((prev) => [...prev, { id: new Date().getTime(), name: '', children: [], isNew: true }]);
	};

	const deleteModule = ({ id, isNew = false }) => {
		if (isNew) {
			setFinalData((prev) => prev.filter((item) => item.id !== id));
		}
	};

	const onSaveModule = ({ values, module, setShowModule }) => {
		setFinalData((prev) => prev.map((item) => {
			if (item.id === module.id) {
				return {
					...item, ...values, isNew: false, children: [],
				};
			}

			return item;
		}));

		setShowModule((prev) => prev.filter((item) => item !== module.id));
	};

	useEffect(() => {
		if (isEmpty(data)) {
			setFinalData([{ id: new Date().getTime(), name: '', children: [], isNew: true }]);
		}
	}, []);

	return {
		handleDragStart,
		handleDrop,
		handleDragOver,
		finalData,
		addModule,
		deleteModule,
		onSaveModule,
	};
};

export default useHandleCurriculum;
