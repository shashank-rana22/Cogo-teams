import { Modal } from '@cogoport/components';

function QuotationModal({
	modalSize,
	selectedModes,
	setShowShareQuotationModal = () => {},
	showShareQuotationModal = false,
}) {
	return (
		<Modal
			show={showShareQuotationModal}
			onClose={() => setShowShareQuotationModal(false)}
			placement="top"
			size={modalSize}
		>
			hii
		</Modal>
	);
}

export default QuotationModal;
