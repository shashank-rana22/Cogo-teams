import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import Layout from '../../../../common/Layout';
import getControls from '../../../../configurations/update-agent-controls';

function UpdateAgentModal({
	item = {},
	payload = {},
	showUpdateModal = '',
	setShowUpdateModal = () => {},
	loading = '',
	updateAgent = () => {},
}) {
	const DEFAULT_VALUES = {};
	const controls = getControls({ item });
	controls.forEach((ctrl) => {
		if (ctrl?.value) {
			DEFAULT_VALUES[ctrl?.name] = ctrl.value;
		}
	});
	const { control, formState:{ errors }, handleSubmit } = useForm({ defaultValues: DEFAULT_VALUES });

	const onSubmit = async () => {
		await updateAgent({ payload, action: 'update_agent' });
	};
	return (
		<div>
			{showUpdateModal ? (
				<Modal
					show={showUpdateModal}
					placement="top"
					onClose={() => setShowUpdateModal(false)}
				>
					<Modal.Header title={`Update Agent (${item?.agent_data?.name})`} />
					<Modal.Body
						style={{ minHeight: 400 }}
					>
						<Layout
							control={control}
							controls={controls}
							errors={errors}
						/>
					</Modal.Body>
					<Modal.Footer>
						<Button
							themeType="secondary"
							style={{ marginRight: 5 }}
							onClick={() => setShowUpdateModal(false)}
						>
							CANCEL
						</Button>
						<Button
							disabled={loading}
							onClick={handleSubmit(onSubmit)}
						>
							SUBMIT
						</Button>
					</Modal.Footer>
				</Modal>
			) : null}
		</div>
	);
}
export default UpdateAgentModal;
