import { Button, Modal, Select } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import { OPTIONS } from '../../configurations/bulk-create-feedback-options';
import useCreateBulkEnrichmentRequests from '../../hooks/useCreateBulkEnrichmentRequests';

import styles from './styles.module.css';

function GetLeadFeedbacks({ refetch = () => {} }) {
	const {
		onCreateFeedback,
		showModal,
		setShowModal,
		loading = false,
		selectedCount,
		onCloseModal,
		setSelectedCount,

	} = useCreateBulkEnrichmentRequests({ refetch });

	return (
		<>
			<Button
				size="lg"
				type="button"
				themeType="secondary"
				className={styles.button}
				onClick={() => setShowModal(true)}
			>
				Get Lead Accounts
			</Button>

			<Modal
				show={showModal}
				size="md"
				closeOnOuterClick={false}
				onClose={() => onCloseModal()}
				placement="top"
			>
				<Modal.Header title="Get Lead Accounts" />

				<Modal.Body className={styles.modal_body}>
					Kindly select the preferred number of accounts you would like to get.

					<Select
						size="sm"
						className={styles.modal_select}
						placeholder="Choose the number of accounts."
						value={selectedCount}
						onChange={(val) => setSelectedCount(val)}
						isClearable
						options={OPTIONS}
					/>

				</Modal.Body>

				<Modal.Footer>
					<Button
						type="button"
						size="md"
						themeType="secondary"
						onClick={() => onCloseModal()}
						disabled={loading}
					>
						Cancel
					</Button>

					<Button
						type="button"
						size="md"
						themeType="primary"
						className={styles.submit_button}
						disabled={isEmpty(selectedCount) || loading}
						onClick={onCreateFeedback}
						loading={loading}
					>
						Get Accounts
					</Button>
				</Modal.Footer>

			</Modal>

		</>
	);
}

export default GetLeadFeedbacks;
