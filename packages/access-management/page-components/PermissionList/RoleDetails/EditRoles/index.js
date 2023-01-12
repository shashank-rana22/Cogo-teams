import { Button, Modal } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useEditRole from '../../../../hooks/useEditRole';

import Edit from './edit';

function EditRoleModal({ roleData, getRole }) {
	const [show, setShow] = useState(false);

	const {
		controls,
		formProps,
		handleSubmit,
		editRoleApi,
		editRole,
	} = useEditRole({ roleData, setShow, getRole });

	const onClick = () => {
		setShow(true);
	};

	const onOuterClick = () => {
		setShow(false);
	};

	return (
		<section>
			<Button size="md" onClick={() => onClick()}>
				<IcMEdit style={{ marginRight: 5 }} size={1.2} />
				Edit
			</Button>

			<Modal
				show={show}
				position="basic"
				onClose={() => setShow(false)}
				onOuterClick={onOuterClick}
			>
				<Modal.Header title={(<h2>Edit Role </h2>)} />
				<form onSubmit={handleSubmit(editRole)}>
					<Modal.Body>
						<Edit
							controls={controls}
							formProps={formProps}
							roleData={roleData}
						/>
					</Modal.Body>
					<Modal.Footer>
						<Button
							size="md"
							type="submit"
							disabled={editRoleApi.loading}
							id="edit_role_btn"
						>
							{editRoleApi.loading ? 'Updating Role ' : 'Update Role'}
						</Button>
					</Modal.Footer>
				</form>
			</Modal>
		</section>
	);
}

export default EditRoleModal;
