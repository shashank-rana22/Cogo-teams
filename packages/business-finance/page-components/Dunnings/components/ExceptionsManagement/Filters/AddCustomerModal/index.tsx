import { Modal, Button, FileSelect } from '@cogoport/components';
import { AsyncSelectController, AsyncSelect } from '@cogoport/forms';
import React, { useState } from 'react';

function AddCustomerModal({ show, setShow }) {
	const [fileValue, setFileValue] = useState();
	const [loading, setLoading] = useState(false);
	const onClose = () => {
		setShow((pv) => !pv);
	};
	return (
		<Modal size="md" show={show} onClose={onClose} placement="bottom">
			<Modal.Header title="Add To List - Upload List" />
			<Modal.Body>
				<div>
					<FileSelect value={fileValue} onChange={setFileValue} loading={loading} />
				</div>
				Or Add Customer
				<AsyncSelect
					name="orgId"
					asyncKey="list_trade_parties"
					valueKey="id"
					isClearable
					initialCall
					// onChange={(userId) => setRoleTypeId(userId)}
					// value={roleTypeId}
					placeholder="Search Customer Name"
					params={{
						sage_organization_id_required : true,
						filters                       : {
							status: 'active',
						},
					}}
				/>
			</Modal.Body>
			<Modal.Footer>
				<div style={{ margin: '6px 20px' }}>Current Data is subjected to change upon submission.</div>
				<Button onClick={onClose}>Submit</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default AddCustomerModal;
