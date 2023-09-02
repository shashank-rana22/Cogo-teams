import { Modal, Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function ActionConfirmation({
	id = '', show = false, actionType = '', onSubmit = () => {},
	setConfirmationConfig = () => {},
}) {
	const { t } = useTranslation(['myTickets']);

	const onClose = () => setConfirmationConfig({ show: false, actionType: '' });

	return (
		<Modal size="sm" show={show} onClose={onClose} placement="center">
			<Modal.Body>
				<div className={styles.modal_body}>
					{t('myTickets:are_you_sure_want_to')}
					{` ${actionType} ${t('myTickets:ticket')} #${id}?`}
				</div>
			</Modal.Body>

			<Modal.Footer>
				<Button className={styles.cancel_button} themeType="secondary" onClick={onClose}>
					{t('myTickets:cancel')}
				</Button>
				<Button onClick={onSubmit}>{t('myTickets:submit')}</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ActionConfirmation;
