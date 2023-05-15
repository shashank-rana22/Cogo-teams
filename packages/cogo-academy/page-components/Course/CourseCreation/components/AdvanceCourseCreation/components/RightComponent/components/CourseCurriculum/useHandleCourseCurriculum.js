import { useState, useEffect } from 'react';

import useCreateCourseModule from '../../../../hooks/useCreateCourseModule';
import useCreateCourseSubModule from '../../../../hooks/useCreateCourseSubModule';
import useGetCourseModuleDetails from '../../../../hooks/useGetCourseModuleDetails';
import useUpdateCourseModule from '../../../../hooks/useUpdateCourseModule';
import useUpdateCourseSubModule from '../../../../hooks/useUpdateCourseSubModule';

const useHandleCourseCurriculum = ({ courseId }) => {
	const [finalData, setFinalData] = useState([]);
	const [draggedNode, setDraggedNode] = useState(null);

	const {
		getCourseModuleDetails,
		loading,
		moduleData,
	} = useGetCourseModuleDetails({ id: courseId });

	const {
		createCourseModule,
		loading: createLoading,
	} = useCreateCourseModule({ getCourseModuleDetails });

	const {
		updateCourseModule,
		loading:updateLoading,
	} = useUpdateCourseModule({ getCourseModuleDetails });

	const {
		createCourseSubModule,
		loading: createSubModuleLoading,
	} = useCreateCourseSubModule({ getCourseModuleDetails });

	const {
		updateCourseSubModule,
		loading: updateSubModuleLoading,
	} = useUpdateCourseSubModule({ getCourseModuleDetails });

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
		if (module.isNew) {
			createCourseModule({ values });
		} else {
			updateCourseModule({ values });
		}
	};

	const onSaveSubModule = ({ values, subModule }) => {
		if (subModule.isNew) {
			createCourseSubModule({ values });
		} else {
			updateCourseSubModule({ values });
		}
	};

	useEffect(() => {
		setFinalData(moduleData);
	}, [moduleData]);

	return {
		handleDragStart,
		handleDrop,
		handleDragOver,
		finalData,
		addModule,
		deleteModule,
		onSaveModule,
		onSaveSubModule,
	};
};

export default useHandleCourseCurriculum;
