import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useGetCourseModuleDetails from '../../../../hooks/useGetCourseModuleDetails';

const useHandleCourseCurriculum = ({ courseId }) => {
	const [finalData, setFinalData] = useState([]);
	const [draggedNode, setDraggedNode] = useState(null);

	const {
		getCourseModuleDetails,
		loading: getLoading,
		moduleData,
	} = useGetCourseModuleDetails({ id: courseId });

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

	useEffect(() => {
		if (!getLoading && !isEmpty(moduleData)) {
			setFinalData(moduleData);
		}
	}, [getLoading, moduleData]);

	return {
		handleDragStart,
		handleDrop,
		handleDragOver,
		finalData,
		addModule,
		getLoading,
		setFinalData,
		getCourseModuleDetails,
	};
};

export default useHandleCourseCurriculum;
