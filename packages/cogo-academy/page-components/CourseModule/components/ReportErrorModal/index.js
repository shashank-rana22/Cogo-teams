import { Modal, Button } from '@cogoport/components';

import useReportError from '../../hooks/useReportError';

import ModalContent from './ModalContent';

function CoursesModal({
	showErrorModal,
	setShowErrorModal,
}) {
	const {
		control,
		handleSubmit,
		onSubmit,
		feedbackLoading,
	} = useReportError({ setShowErrorModal });

	return (
		<Modal
			show={showErrorModal}
			size="lg"
			placement="top"
			onClose={() => setShowErrorModal(false)}
		>
			<Modal.Header title="Report Your Issue" />
			<ModalContent
				control={control}
			/>
			<Modal.Footer>
				<Button
					size="md"
					themeType="primary"
					type="button"
					onClick={handleSubmit(onSubmit)}
					loading={feedbackLoading}
				>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default CoursesModal;
