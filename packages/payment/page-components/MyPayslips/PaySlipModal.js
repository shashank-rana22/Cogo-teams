import { Modal } from '@cogoport/components';

import styles from './styles.module.css';

function PaySlipModal({ showModal = false, documentType = '', setShowModal = () => {}, modalUrl = '', openUrl = '' }) {
	return (
		<Modal size="lg" show={showModal} onClose={() => setShowModal(false)} placement="top">
			<Modal.Header title={documentType} />
			<Modal.Body>
				<div className={styles.pdf_container}>
					<iframe
						src={openUrl}
						type="application/pdf"
						width="100%"
						height="100%"
						title="Document"
						style={{ border: 'none' }}
					>
						<p>
							It seems you don&apos;t have a PDF plugin for this browser. No biggie... you can
							{' '}
							<a href={modalUrl}>click here to download the PDF file.</a>
						</p>
					</iframe>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default PaySlipModal;
