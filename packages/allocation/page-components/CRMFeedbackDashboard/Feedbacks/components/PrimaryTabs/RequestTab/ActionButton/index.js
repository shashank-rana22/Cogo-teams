import { Button, Modal } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

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
	const {
		loading = false,
		isOpenModal = false,
		setisOpenModal = () => {},
		onDeactivateRequest = () => {},
		onCloseModal = () => {},
	} = useDeactivateRequest({ feedback_request_id, refetch });

	const router = useRouter();

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
					<Modal.Header title="Deactivate Enrichment Request" />

					<Modal.Body className={styles.modal_body}>
						You are about to Deactivate a Request sent to
						{' '}
						<i>
							{third_party || '--'}
						</i>
						, are you sure?
					</Modal.Body>

					<Modal.Footer>
						<Button
							type="button"
							size="md"
							themeType="secondary"
							disabled={loading}
							onClick={onCloseModal}
						>
							Cancel
						</Button>

						<Button
							type="button"
							size="md"
							themeType="primary"
							className={styles.submit_button}
							onClick={onDeactivateRequest}
							loading={loading}
						>
							Delete
						</Button>
					</Modal.Footer>
				</Modal>
			)}
		</>
	);
}
export default ActionButton;
