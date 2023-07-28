import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import useOffboardAgent from '../../../hooks/useOffboardAgent';
import styles from '../styles.module.css';

function OffboardAgent(props) {
	const {
		actionModal = {},
		setActionModal = () => {},
		refetch = () => {},
		loading = false,
	} = props;

	const {
		loadingOffboard = false,
		offboardAgent = () => {},

	} = useOffboardAgent({ actionModal, setActionModal, refetch });

	const { handleSubmit } = useForm();

	return (
		<>
			<Modal.Header title="Offboard Agent" />

			<form onSubmit={handleSubmit(offboardAgent)}>
				<Modal.Body>
					Are you sure about your decision to offboard
					{' '}
					<span className={styles.name}>{actionModal?.agentData?.name}</span>
					{' '}
					with email
					{' '}
					<span className={styles.email}>{actionModal?.agentData?.email}</span>
					{' '}
					?
				</Modal.Body>

				<Modal.Footer>
					<Button
						size="md"
						className={styles.cancel_cta}
						themeType="tertiary"
						type="button"
						disabled={loadingOffboard || loading}
						onClick={() => setActionModal((prev) => ({
							...prev,
							type      : 'onboard',
							show      : false,
							agentData : {},
						}))}
					>
						No
					</Button>
					<Button
						size="md"
						themeType="primary"
						type="submit"
						disabled={loadingOffboard || loading}
					>
						Yes, Offboard
					</Button>
				</Modal.Footer>

			</form>

		</>

	);
}

export default OffboardAgent;
