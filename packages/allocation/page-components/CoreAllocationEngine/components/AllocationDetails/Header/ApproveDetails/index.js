import { Button, Modal } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import useApproveAllocationDetails from '../../../../hooks/useApproveAllocationDetails';

import styles from './styles.module.css';

function ApproveDetails({ showApprove, setShowApprove, listRefetch }) {
	const { t } = useTranslation(['allocation']);

	const {
		onApproveDetails,
		loadingApproveDetails,
	} = useApproveAllocationDetails({ setShowApprove, listRefetch, t });

	return (
		<Modal
			size="sm"
			placement="top"
			show={showApprove}
			closeOnOuterClick
			showCloseIcon
			onClose={() => setShowApprove(false)}
		>
			<Modal.Header title={t('allocation:approve_details')} />

			<Modal.Body>
				<p className={styles.main_warning}>
					{t('allocation:approve_details_phrase')}
				</p>

				<p className={styles.secondary_warning}>
					{t('allocation:approve_details_description')}
				</p>
			</Modal.Body>

			<Modal.Footer>
				<Button
					size="md"
					themeType="primary"
					onClick={onApproveDetails}
					disabled={loadingApproveDetails}
				>
					{t('allocation:yes_approve_button')}
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ApproveDetails;
