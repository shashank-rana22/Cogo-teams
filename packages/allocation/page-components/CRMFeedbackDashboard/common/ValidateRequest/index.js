import { Button, Modal, Chips } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import styles from './styles.module.css';
import usePostAllocationFeedback from './usePostAllocationRequest';

const POSSIBLE_FEEDBACK_STATUSES = ['validate', 'invalidate'];

const CHIP_OPTIONS = POSSIBLE_FEEDBACK_STATUSES.map((item) => ({
	key      : item,
	children : startCase(item),
	tooltip  : false,
	disabled : false,
	closable : true,
}));

function ValidateRequest({
	modalDetails = '',
	onCloseModal = () => { },
	checkedRowsId = [],
	refetchFeedbackTable = () => {},
}) {
	const { t } = useTranslation(['allocation']);
	const [status, setStatus] = useState('');

	const { bulkUpdateEnrichmentRequest, loading } = usePostAllocationFeedback({
		t,
		onCloseModal,
		checkedRowsId,
		status,
		refetchFeedbackTable,
	});

	return (
		<Modal
			show={!!modalDetails}
			size="md"
			closeOnOuterClick={false}
			placement="top"
			onClose={onCloseModal}
		>
			<Modal.Header title={t('allocation:validity_enrichment_request_title')} />

			<Modal.Body className={styles.modal_body}>
				{t('allocation:validity_enrichment_request_body')}

				<div className={styles.chips_container}>
					<Chips
						items={CHIP_OPTIONS}
						selectedItems={status}
						onItemChange={setStatus}
					/>
				</div>

			</Modal.Body>

			<Modal.Footer>
				<Button
					type="button"
					size="md"
					onClick={onCloseModal}
					themeType="secondary"
					className={styles.button}
					disabled={loading}
				>
					{t('allocation:validity_enrichment_request_cancel')}
				</Button>

				<Button
					type="button"
					size="md"
					themeType="primary"
					className={styles.submit_button}
					loading={loading}
					onClick={() => bulkUpdateEnrichmentRequest()}
				>
					{t('allocation:validity_enrichment_request_submit')}
				</Button>
			</Modal.Footer>
		</Modal>

	);
}

export default ValidateRequest;
