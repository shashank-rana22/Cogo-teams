import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import useDeleteCourse from '../../hooks/useDeleteCourse';

import { studentColumns, courseColumns } from './TableColumns';

const MODAL_TEXT_MAPPING = {
	courses  : 'Course',
	students : 'User',
};

const columnsMapping = {
	courses  : courseColumns,
	students : studentColumns,
};

const useHandleListComponent = ({ activeTab, fetchList, setParams, params }) => {
	const router = useRouter();

	const [courseId, setCourseId] = useState('');
	const [studentId, setStudentId] = useState('');
	const [showModal, setShowModal] = useState(false);

	const {
		deleteCourse,
		loading:deleteLoading,
	} = useDeleteCourse({ fetchList, setShowModal });

	const propsMapping = {
		courses: {
			loading: false,
			router,
			setShowModal,
			setCourseId,
			fetchList,
			setParams,
			params,
		},
		students: {
			loading: false,
			router,
			setShowModal,
			setStudentId,
			setParams,
			params,
		},
	};

	const columns = columnsMapping[activeTab]({ ...propsMapping[activeTab] });

	const deleteFunctionMapping = {
		courses  : { function: deleteCourse, params: { id: courseId, status: 'inactive' } },
		students : { function: deleteCourse, params: { id: studentId, status: 'inactive' } },
	};

	const { function: deleteApi, params: deleteApiParams } = deleteFunctionMapping[activeTab];

	return {
		columns,
		showModal,
		setShowModal,
		MODAL_TEXT_MAPPING,
		deleteApiParams,
		deleteLoading,
		deleteApi,
	};
};

export default useHandleListComponent;
