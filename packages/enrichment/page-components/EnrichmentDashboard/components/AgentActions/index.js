import { Button, Modal, Pill } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';

import useFeedbackResponseSubmission from '../../hooks/useFeedbackResponseSubmission';

import styles from './styles.module.css';

function AgentActions(props) {
	const {
		actionModal = {},
		setActionModal = () => {},
		refetch = () => {},
		loading = false,
		refetchStats = () => {},
	} = props;

	const {
		loadingAction = false,
		onEnrichmentClick = () => {},
	} = useFeedbackResponseSubmission({ actionModal, setActionModal, refetch, refetchStats });

	const { handleSubmit } = useForm();

	return (
		<>
			<Modal.Header title="Please Confirm Details" />

			<form onSubmit={handleSubmit(onEnrichmentClick)}>
				<Modal.Body>

					<div className={styles.container}>
						<div className={styles.flex_container}>
							<span className={styles.label}>Serial ID:</span>

							<span className={styles.value}>
								<Pill
									size="md"
									color="blue"
								>
									#
									{actionModal?.requestData?.serial_id || '__'}
								</Pill>
							</span>

						</div>

						<div className={styles.flex_container}>
							<span className={styles.label}>Organization:</span>
							<span className={styles.value}>{actionModal?.requestData?.business_name || '__'}</span>
						</div>

					</div>

				</Modal.Body>

				<Modal.Footer>
					<Button
						size="md"
						className={styles.cancel_cta}
						themeType="tertiary"
						type="button"
						disabled={loadingAction || loading}
						onClick={() => setActionModal(() => ({ show: false }))}
					>
						Cancel
					</Button>
					<Button
						size="md"
						themeType="primary"
						type="submit"
						disabled={loadingAction || loading}
					>
						Mark
						{' '}
						{startCase(actionModal?.requestData?.workflow)}
					</Button>
				</Modal.Footer>

			</form>

		</>

	);
}

export default AgentActions;
