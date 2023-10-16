import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import Layout from '../../../../common/Layout';
import getControls from '../../../../configurations/create-agent-controls';
import useCreateServetalAgent from '../../../../hooks/useCreateServetalAgent';

function CreateAgentModal({
	showCreateModal = '',
	setShowCreateModal = () => {},
	listServetalAgent = () => {},
}) {
	const [itemVal, setItemval] = useState({});
	const { control, formState:{ errors }, setValue, watch, handleSubmit } = useForm();
	const formValues = watch();

	const { email_id = '' } = formValues || {};

	const SHOW_ELEMENTS = {
		agent_name    : !isEmpty(email_id),
		mobile_number : !isEmpty(email_id),
	};
	useEffect(() => {
		setValue('agent_name', itemVal?.name);
		setValue('mobile_number', itemVal?.mobile_number);
	}, [itemVal, setValue]);

	const controls = getControls({ itemVal, setItemval });

	const PAYLOAD = {
		agent_id        : itemVal?.user_id,
		email           : itemVal?.email,
		mobile_number   : itemVal?.mobile_number,
		name            : itemVal?.name,
		provider_number : formValues?.provider_number,
	};

	const { servetalAgent = () => {}, createServetalAgentloading = '' } = useCreateServetalAgent({ listServetalAgent });

	const onSubmit = async () => {
		await servetalAgent({ payload: PAYLOAD });
		setShowCreateModal(false);
	};
	return (
		<div>
			{showCreateModal ? (
				<Modal
					show={showCreateModal}
					placement="top"
					onClose={() => setShowCreateModal(false)}
				>
					<Modal.Header title="Create an Agent" />
					<Modal.Body
						style={{ minHeight: 400 }}
					>
						<Layout
							control={control}
							controls={controls}
							errors={errors}
							showElements={SHOW_ELEMENTS}
						/>
					</Modal.Body>
					<Modal.Footer>
						<Button
							themeType="secondary"
							style={{ marginRight: 5 }}
							onClick={() => setShowCreateModal(false)}
						>
							CANCEL
						</Button>
						<Button
							onClick={handleSubmit(onSubmit)}
							disabled={createServetalAgentloading}
						>
							SUBMIT
						</Button>
					</Modal.Footer>
				</Modal>
			) : null}
		</div>
	);
}
export default CreateAgentModal;
