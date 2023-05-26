import { Modal } from '@cogoport/components';

import ModalContent from './ModalContent';

function CoursesModal({
	loading, courseCategories, showCoursesModal,
	setShowCoursesModal, currentCategory, setCurrentCategory,
}) {
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
			/>
		</Modal>
	);
}

export default CoursesModal;
