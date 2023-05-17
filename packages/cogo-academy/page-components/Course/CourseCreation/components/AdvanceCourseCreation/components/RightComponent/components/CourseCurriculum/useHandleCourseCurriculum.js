import { Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useGetCourseModuleDetails from '../../../../hooks/useGetCourseModuleDetails';
import useUpdateSequenceOrder from '../../../../hooks/useUpdateSequenceOrder';

const useHandleCourseCurriculum = ({ courseId, activeTab }) => {
	const [finalData, setFinalData] = useState([]);
	const [draggedNode, setDraggedNode] = useState(null);
	const [getSubModuleRefetch, setGetSubModuleRefetch] = useState(false);

	const {
		getCourseModuleDetails,
		loading: getLoading,
		moduleData,
	} = useGetCourseModuleDetails({ id: courseId, activeTab });

	const { updateSequenceOrder } = useUpdateSequenceOrder({ getCourseModuleDetails, setGetSubModuleRefetch });

	const handleDragStart = (event, node, from) => {
		setDraggedNode({ ...node, from });
		event.dataTransfer.setData('text', JSON.stringify(node));
	};

	const handleDragOver = (event) => {
		event.preventDefault();
	};

	const handleDrop = (event, parentNode) => {
		event.preventDefault();

		if (parentNode.type !== draggedNode.from) {
			Toast.error('cannot swap two different types');
			return;
		}

		if (
			draggedNode.from === 'sub_module'
			&& parentNode.drop_course_module_id !== draggedNode.start_course_module_id
		) {
			Toast.error('cannot swap two sub modules from two different modules');
			return;
		}

		if (
			draggedNode.from === 'chapter'
			&& draggedNode.start_point_details.start_sub_module_id
				!== parentNode.end_point_details.end_sub_module_id
		) {
			Toast.error('cannot swap two chapters from two different sub modules');
			return;
		}

		if (draggedNode.from === 'chapter' && (draggedNode.isNew || parentNode.isNew)) {
			Toast.error('cannot swap new chapter');
			return;
		}

		if (draggedNode.from === 'module') {
			const fromIndex = draggedNode.sequence_order - 1;
			const toIndex = parentNode.sequence_order - 1;
			const moduleIDs = finalData.map((item) => item.id);

			const element = moduleIDs.splice(fromIndex, 1)[0];

			moduleIDs.splice(toIndex, 0, element);

			const finalPayload = moduleIDs.map((item, index) => ({
				id                 : item,
				new_sequence_order : index + 1,
			}));

			updateSequenceOrder({ values: { course_modules: finalPayload }, type: draggedNode.from });
		}

		if (draggedNode.from === 'sub_module') {
			const courseModuleObject = finalData.find((item) => item.id === parentNode.drop_course_module_id);

			const { course_sub_modules = [] } = courseModuleObject || {};

			const fromIndex = draggedNode.sequence_order - 1;
			const toIndex = parentNode.sequence_order - 1;

			const subModuleIDs = course_sub_modules.map((item) => item.id);

			const element = subModuleIDs.splice(fromIndex, 1)[0];

			subModuleIDs.splice(toIndex, 0, element);

			const finalPayload = subModuleIDs.map((item, index) => ({
				id                 : item,
				new_sequence_order : index + 1,
			}));

			updateSequenceOrder({ values: { course_sub_modules: finalPayload }, type: draggedNode.from });
		}

		if (draggedNode.from === 'chapter') {
			const { start_point_details:{ start_chapters } } = draggedNode || {};

			const fromIndex = draggedNode.sequence_order - 1;
			const toIndex = parentNode.sequence_order - 1;

			const chaptersIDs = start_chapters.filter((item) => !item.isNew).map((item) => item.id);

			const element = chaptersIDs.splice(fromIndex, 1)[0];

			chaptersIDs.splice(toIndex, 0, element);

			const finalPayload = chaptersIDs.map((item, index) => ({
				id                 : item,
				new_sequence_order : index + 1,
			}));

			updateSequenceOrder({ values: { chapters: finalPayload }, type: draggedNode.from });
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
		getSubModuleRefetch,
		setGetSubModuleRefetch,
	};
};

export default useHandleCourseCurriculum;
