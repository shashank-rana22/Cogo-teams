import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import useOffboardAgent from '../../../hooks/useOffboardAgent';

import styles from './styles.module.css';

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
			<Modal.Header title="Deactivate Agent" />

			<form onSubmit={handleSubmit(offboardAgent)}>
				<Modal.Body>
					<div className={styles.container}>

						<div className={styles.flex_container}>
							<span className={styles.label}>Name:</span>
							<span className={styles.value}>{actionModal?.agentData?.name || '__'}</span>
						</div>
						<div className={styles.flex_container}>
							<span className={styles.label}>Email:</span>
							<span className={styles.value}>{actionModal?.agentData?.email || '__'}</span>
						</div>
					</div>
				</Modal.Body>

				<Modal.Footer>
					<Button
						size="md"
						className={styles.cancel_cta}
						themeType="tertiary"
						type="button"
						disabled={loadingOffboard || loading}
						onClick={() => setActionModal({})}
					>
						No
					</Button>
					<Button
						size="md"
						themeType="primary"
						type="submit"
						disabled={loadingOffboard || loading}
					>
						Yes, Deactivate
					</Button>
				</Modal.Footer>

			</form>

		</>

	);
}

export default OffboardAgent;
