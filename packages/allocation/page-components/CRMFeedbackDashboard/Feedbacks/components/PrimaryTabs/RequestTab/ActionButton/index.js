import { Button, Modal } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useTranslation } from 'next-i18next';

import useDeactivateRequest from '../../../../../hooks/useDeactivateRequest';

import styles from './styles.module.css';

function ActionButton({
	label = '',
	status = '',
	organization = '',
	third_party = '',
	feedback_request_id = '',
	refetch = () => {},
}) {
	const router = useRouter();

	const { t } = useTranslation(['allocation']);

	const {
		loading = false,
		isOpenModal = false,
		setisOpenModal = () => {},
		onDeactivateRequest = () => {},
		onCloseModal = () => {},
	} = useDeactivateRequest({ feedback_request_id, refetch, t });

	const url = `/allocation/responses/${feedback_request_id}?third_party=${third_party}&organization=${organization}`;

	if (status === 'responded') {
		return (
			<Button
				size="sm"
				themeType="secondary"
				onClick={() => router.push(url)}
			>
				{label}
			</Button>
		);
	}
	return (
		<>
			<Button
				size="sm"
				themeType="secondary"
				onClick={() => setisOpenModal(true)}
			>
				{label}
			</Button>

			{isOpenModal
			&& (
				<Modal
					show={isOpenModal}
					size="sm"
					closeOnOuterClick={false}
					onClose={onCloseModal}
					placement="top"
				>
					<Modal.Header title={t('allocation:deactivate_enrichment_request')} />

					<Modal.Body className={styles.modal_body}>
						{t('allocation:deactivate_enrichment_request_phrase')}
						{' '}
						<i>
							{third_party || '--'}
						</i>
						{t('allocation:are_you_sure')}
					</Modal.Body>

					<Modal.Footer>
						<Button
							type="button"
							size="md"
							themeType="secondary"
							disabled={loading}
							onClick={onCloseModal}
						>
							{t('allocation:cancel_button')}
						</Button>

						<Button
							type="button"
							size="md"
							themeType="primary"
							className={styles.submit_button}
							onClick={onDeactivateRequest}
							loading={loading}
						>
							{t('allocation:delete_button')}
						</Button>
					</Modal.Footer>
				</Modal>
			)}
		</>
	);
}
export default ActionButton;
