import { Button, Modal } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import useBulkApproveRequest from '../../../hooks/useBulkApproveRequest';

function BulkUpdateConfirmation(props) {
	const { t } = useTranslation(['allocation']);

	const { checkedRowsId } = props;

	const { loading, onBulkApprove } = useBulkApproveRequest({ ...props, t });

	return (
		<>
			<Modal.Header title={t('allocation:bulk_approve_requests')} />

			<Modal.Body>
				{t('allocation:are_you_sure_you_want_to')}
				{' '}
				{t('allocation:approved_label')}
				{' '}
				{checkedRowsId.length || t('allocation:these_label')}
				{' '}
				{t('allocation:requests_check')}
			</Modal.Body>

			<Modal.Footer>
				<Button
					type="submit"
					size="md"
					themeType="primary"
					disabled={loading}
					onClick={onBulkApprove}
				>
					{t('allocation:yes_button_label')}
				</Button>
			</Modal.Footer>
		</>
	);
}

export default BulkUpdateConfirmation;
