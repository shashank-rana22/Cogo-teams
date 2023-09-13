import { Modal, Button } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function PopupModal({ show = false, onClose = () => {}, name = '', url = '' }) {
	return (
		<div>
			<Modal size="lg" show={show} onClose={onClose} placement="top">
				<Modal.Header title={name} />
				<Modal.Body>
					<div className={styles.pdf_container}>
						<object
							data={url}
							type="application/pdf"
							width="100%"
							height="720px"
						>
							<p>
								It seems you don&apos;t have a PDF plugin for this browser. No biggie... you can
								{' '}
								<a href={url}>click here to download the PDF file.</a>
							</p>
						</object>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={onClose}>OK</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default PopupModal;
