import { Modal, Button, Checkbox } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import styles from './styles.module.css';

function DeleteComfirmationModal({
	deleteInvoice = () => {},
	outWardId = '',
	showDeleteModal = false,
	setShowDeleteModal = () => {},
	setIsModalOnetime = () => {},
	isModalOnetime = false,
}) {
	const { t } = useTranslation(['compliance']);
	return (
		<Modal size="md" show={showDeleteModal} onClose={() => setShowDeleteModal(false)} placement="top">

			<Modal.Body>
				<div className={styles.cross_icon}>
					<IcMCross width={20} height={20} onClick={() => setShowDeleteModal(false)} />
				</div>
				<div className={styles.boddy_text_style}>
					<div className={styles.text}>{t('compliance:sure_to_delete')}</div>
					<div className={styles.text_style}>
						{t('compliance:delete_undo_warning')}
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Checkbox
					label={t('compliance:dont_show_again')}
					checked={isModalOnetime}
					onChange={() => {
						setIsModalOnetime(!isModalOnetime);
					}}
					style={{ marginRight: '285px' }}
				/>
				<Button
					onClick={() => deleteInvoice(outWardId)}
					style={{ marginTop: '6px' }}
				>
					{t('compliance:confirm')}

				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default DeleteComfirmationModal;
