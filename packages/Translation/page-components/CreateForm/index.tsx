import { Modal, Button } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import React, { useState } from 'react';

import { SingleData } from '../../common/interfaces';
import useCreateRequest from '../../hooks/useCreateForm';

import CreateRequest from './CreateRequest';
import Heading from './Header';
import styles from './styles.module.css';

interface Props {
	status?: string;
	refetch?: Function;
	row?: SingleData;
	showEdit?: boolean;

}

function CreateRequestModal({ status, refetch, row, showEdit }: Props) {
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
					id="create_form"
					onSubmit={handleSubmit(onSubmit)}
				>
					<Modal.Body>
						<CreateRequest
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

export default CreateRequestModal;
