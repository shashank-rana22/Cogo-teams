import { Modal, Button } from '@cogoport/components';
import { IcCError } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

const getContentMapping = ({ t = () => {} }) => ({
	submit_lms_data : t('amsSubmission:modal_content_submit_lms_data'),
	amend           : t('amsSubmission:modal_content_amend'),
	send_email      : t('amsSubmission:modal_content_send_email'),
});

function ActionModal({
	modalData = {},
	setModalData = () => {},
}) {
	const { t } = useTranslation(['amsSubmission']);

	const contentMapping = getContentMapping({ t });

	return (
		<div className={styles.container}>
			<Modal
				className={styles.modal_container}
				show={!isEmpty(modalData)}
			>
				<IcCError width={40} height={50} />
				<div className={styles.content}>
					{contentMapping[modalData?.type]}
				</div>
				<div className={styles.button_container}>
					<Button
						themeType="secondary"
						onClick={() => setModalData({})}
					>
						{t('amsSubmission:button_cancel')}

					</Button>
					<Button
						onClick={() => setModalData({})}
					>
						{t('amsSubmission:button_confirm')}

					</Button>
				</div>
			</Modal>
		</div>
	);
}

export default ActionModal;
