import { Button, Modal } from '@cogoport/components';

import FormLayout from '../../../../../common/FormLayout/FormLayout';
import useOnboardAgent from '../../../hooks/useOnboardAgent';
import styles from '../styles.module.css';

function OnboardAgent(props) {
	const {
		actionModal = {},
		setActionModal = () => {},
		refetch = () => {},
		loading = false,
	} = props;

	const {
		onboardAgent,
		loadingOnboard,
		controls,
		control,
		errors,
		handleSubmit,
	} = useOnboardAgent({
		actionModal,
		setActionModal,
		refetch,
	});

	return (
		<>
			<Modal.Header title="Onboard New Agent" />

			<form onSubmit={handleSubmit(onboardAgent)}>

				<Modal.Body>
					<FormLayout
						fields={controls}
						errors={errors}
						control={control}
					/>
				</Modal.Body>

				<Modal.Footer>
					<Button
						size="md"
						className={styles.cancel_cta}
						themeType="tertiary"
						type="button"
						disabled={loadingOnboard || loading}
						onClick={() => setActionModal((prev) => ({
							...prev,
							type      : 'onboard',
							show      : false,
							agentData : {},
						}))}
					>
						Cancel
					</Button>
					<Button
						size="md"
						themeType="primary"
						type="submit"
						disabled={loadingOnboard || loading}
					>
						Onboard
					</Button>
				</Modal.Footer>
			</form>
		</>
	);
}

export default OnboardAgent;
