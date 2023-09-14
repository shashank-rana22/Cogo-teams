import { Button, Modal } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function PublishVersionModal({
	setShowPublishModal = () => {},
	showPublishModal,
	onCreate,
	publishLoading,
}) {
	const { t } = useTranslation(['allocation']);

	return (
		<Modal
			size="md"
			placement="center"
			show={showPublishModal}
			closeOnOuterClick
			onClose={() => {
				setShowPublishModal(false);
			}}
		>

			<Modal.Header title={t('allocation:publish_draft')} />

			<Modal.Body>
				<div className={styles.text}>
					{t('allocation:are_you_sure_you_wish_to_publish')}
					{' '}
					<b>{t('allocation:current_draft')}</b>
					{' '}
					?
				</div>
			</Modal.Body>

			<Modal.Footer>
				<Button
					type="button"
					size="md"
					themeType="tertiary"
					style={{ marginRight: '10px' }}
					disabled={publishLoading}
					onClick={() => setShowPublishModal(false)}
				>
					{t('allocation:cancel_button')}
				</Button>

				<Button
					type="submit"
					size="md"
					themeType="primary"
					onClick={() => {
						onCreate();
					}}
					loading={publishLoading}
				>
					{t('allocation:back_button')}
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default PublishVersionModal;
