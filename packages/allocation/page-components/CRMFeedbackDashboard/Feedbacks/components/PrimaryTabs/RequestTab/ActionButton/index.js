import { Button, Modal } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import useDeactivateRequest from '../../../../../hooks/useDeactivateRequest';

import styles from './styles.module.css';

function ActionButton({ label = '', status = '', organization = '', feedback_request_id = '' }) {
	const {
		onDeactivateRequest,
		loading = false,
		isOpenModal = false,
		setisOpenModal = () => {},
		onCloseModal = () => {},
	} = useDeactivateRequest({ feedback_request_id });

	const router = useRouter();

	if (status === 'responded') {
		return (
			<Button
				size="sm"
				themeType="secondary"
				onClick={() => {
					router.push(`/allocation/responses/${feedback_request_id}?organization=${organization}`);
				}}
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

			{isOpenModal ? (
				<Modal
					show={isOpenModal}
					size="sm"
					closeOnOuterClick={false}
					onClose={onCloseModal}
					className={styles.modal_container}
					placement="top"
				>
					<Modal.Header title="Deactivate Enrichment Request" />

					<Modal.Body className={styles.modal_body}>
						You are about to Deactivate a Request sent to
						{' '}
						<i>
							{organization || '--'}
						</i>
						, are you sure?
					</Modal.Body>

					<Modal.Footer>
						<Button
							type="submit"
							size="md"
							themeType="secondary"
							onClick={onCloseModal}
						>
							Cancel
						</Button>
						<Button
							type="submit"
							size="md"
							themeType="primary"
							className={styles.submit_button}
							disabled={loading}
							onClick={onDeactivateRequest}
						>
							Delete
						</Button>
					</Modal.Footer>

				</Modal>
			) : (
				null
			)}

		</>

	);
}
export default ActionButton;
