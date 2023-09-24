import { Modal, Button } from '@cogoport/components';
import AsyncSelect from '@cogoport/forms/page-components/Business/AsyncSelect';

import useUpdateCommunicatonRoles from '../../hooks/useUpdateCommunicatonRoles';

function AssignRoleModal({
	show = '', setShow = () => {}, values = [], setVal = () => {},
	getChannelConfig = () => {}, channel = '', itemId = '',
}) {
	const { updateRoles = () => {}, loading = '' } = useUpdateCommunicatonRoles({
		getChannelConfig,
		setShow,
	});
	const PAYLOAD = {
		channel,
		credential_id : itemId,
		role_ids      : values,
	};
	const submitHandler = () => {
		updateRoles(PAYLOAD);
	};
	return (
		<Modal
			show={show}
			onClose={() => setShow(false)}
			onOuterClick={() => { setShow(false); }}
			size="md"
			placement="top"
		>
			<Modal.Header title="Assign Roles:" />
			<Modal.Body style={{ minHeight: 350 }}>
				<AsyncSelect
					type="async_select"
					asyncKey="partner_roles"
					params={{ page_limit: 10 }}
					placeholder="Select Role Name"
					size="sm"
					isClearable
					multiple
					initialCall
					value={values}
					onChange={setVal}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button
					onClick={submitHandler}
					disabled={loading}
				>
					SUBMIT
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
export default AssignRoleModal;
