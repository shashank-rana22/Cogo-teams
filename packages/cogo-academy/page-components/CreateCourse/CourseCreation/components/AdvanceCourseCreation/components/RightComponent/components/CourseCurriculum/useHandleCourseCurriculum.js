import { Toast } from '@cogoport/components';
import { useState } from 'react';

import useGetCourseModuleDetails from '../../../../hooks/useGetCourseModuleDetails';
import useUpdateSequenceOrder from '../../../../hooks/useUpdateSequenceOrder';
import getSequenceOrderPayload from '../../../../utils/getSequenceOrderPayload';

const useHandleCourseCurriculum = ({ courseId, activeTab, mode }) => {
	const [finalData, setFinalData] = useState([]);
	const [draggedNode, setDraggedNode] = useState(null);
	const [getSubModuleRefetch, setGetSubModuleRefetch] = useState(false);
	const [openDetails, setOpenDetails] = useState({});

	const showButtons = mode !== 'view';

	const {
		getCourseModuleDetails,
		loading: getLoading,
	} = useGetCourseModuleDetails({ id: courseId, setFinalData, activeTab, showButtons });

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
			const finalPayload = getSequenceOrderPayload({ data: finalData, draggedNode, parentNode });

			updateSequenceOrder({ values: { course_modules: finalPayload }, type: draggedNode.from });
		}

		if (draggedNode.from === 'sub_module') {
			const courseModuleObject = finalData.find((item) => item.id === parentNode.drop_course_module_id);

			const { course_sub_modules = [] } = courseModuleObject || {};

			const finalPayload = getSequenceOrderPayload({ data: course_sub_modules, draggedNode, parentNode });

			updateSequenceOrder({ values: { course_sub_modules: finalPayload }, type: draggedNode.from });
		}

		if (draggedNode.from === 'chapter') {
			const { start_point_details:{ start_chapters } } = draggedNode || {};

			const finalPayload = getSequenceOrderPayload({ data: start_chapters, draggedNode, parentNode });

			updateSequenceOrder({ values: { chapters: finalPayload }, type: draggedNode.from });
		}
	};

	const addModule = () => {
		setFinalData((prev) => [...prev, { id: new Date().getTime(), name: '', children: [], isNew: true }]);
	};

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
		showButtons,
		openDetails,
		setOpenDetails,
	};
};

export default useHandleCourseCurriculum;
