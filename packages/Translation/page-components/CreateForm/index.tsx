import { Modal, Button } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import React, { useState } from 'react';

import { SingleData } from '../../common/interfaces';
import useCreateRequest from '../../hooks/useCreateForm';

import CreateRole from './CreateRole';
import styles from './CreateRole/styles.module.css';
import Heading from './Header';

interface Props {
	status?: string;
	refetch?: Function;
	row?: SingleData;
	showEdit?: boolean;

}

function CreateRoleModal({ status, refetch, row, showEdit }: Props) {
	const [showCreateRoleModal, setShowCreateRoleModal] = useState(false);

	const {
		controls, formProps, onSubmit, createApi, onCancel, updating,
	} = useCreateRequest({ status, refetch, setShowCreateRoleModal, row, showEdit });
	const { handleSubmit } = formProps;
	const title = status === 'COMPLETED' ? 'Create Translation' : 'Request Translation';

	const { loading } = createApi;

	return (
		<>
			<Modal
				scroll={false}
				size="md"
				className={styles.modal_container}
				show={showCreateRoleModal}
				onClose={onCancel}
				placement="center"
			>
				<Modal.Header
					title={(
						<Heading
							title={showEdit ? 'Update Translation' : title}
						/>
					)}
				/>
				<form
					id="rnp_role_list_create_role_form"
					onSubmit={handleSubmit(onSubmit)}
				>
					<Modal.Body>
						<CreateRole
							formProps={formProps}
							controls={controls}
						/>
					</Modal.Body>
					<Modal.Footer>
						<Button
							size="md"
							style={{ marginRight: 10 }}
							themeType="secondary"
							onClick={onCancel}
						>
							Cancel
						</Button>
						{!showEdit ? (
							<Button
								size="md"
								loading={loading || updating}
								type="submit"
							>
								{status === 'COMPLETED' ? 'Create' : 'Request'}
							</Button>
						) : (
							<Button
								size="md"
								loading={loading || updating}
								type="submit"
							>
								Save
							</Button>
						)}
					</Modal.Footer>
				</form>
			</Modal>
			{showEdit ? (
				<Button size="md" themeType="secondary" onClick={() => { setShowCreateRoleModal(true); }}>
					<IcMEdit style={{ marginRight: 5 }} />
					Edit
				</Button>
			) : (
				<Button onClick={() => { setShowCreateRoleModal(true); }}>
					{status === 'COMPLETED' ? 'Create' : 'Request'}
				</Button>
			)}
		</>
	);
}

export default CreateRoleModal;
