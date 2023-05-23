import { Modal } from '@cogoport/components';

import useListCourseCategory from '../../hooks/useListCourseCategory';

import ModalContent from './ModalContent';

function CoursesModal({ showCoursesModal, setShowCoursesModal }) {
	const {
		finalCourseCategories = [],
		loading,
	} = useListCourseCategory();

	return (
		<Modal
			show={showCoursesModal}
			size="lg"
			placement="top"
			onClose={() => setShowCoursesModal(false)}
		>
			<Modal.Header title="Courses" />
			<ModalContent finalCourseCategories={finalCourseCategories} loading={loading} />
		</Modal>
	);
}

export default CoursesModal;
