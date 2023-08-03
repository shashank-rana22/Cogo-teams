import { Modal } from '@cogoport/components';

import useListCourseCategory from '../../hooks/useListCourseCategory';

import ModalContent from './ModalContent';

function CoursesModal({
	loading,
	showCoursesModal,
	setShowCoursesModal,
	currentCategory,
	setCurrentCategory,
}) {
	const {
		finalCourseCategories: courseCategories = [],
		loading: categoryLoading,
	} = useListCourseCategory();

	return (
		<Modal
			show={showCoursesModal}
			size="lg"
			placement="top"
			onClose={() => setShowCoursesModal(false)}
		>
			<Modal.Header title="Courses" />

			<ModalContent
				finalCourseCategories={courseCategories}
				loading={loading}
				currentCategory={currentCategory}
				setCurrentCategory={setCurrentCategory}
				setShowCoursesModal={setShowCoursesModal}
				categoryLoading={categoryLoading}
			/>
		</Modal>
	);
}

export default CoursesModal;
