import { Modal } from '@cogoport/components';
import { useRouter } from 'next/router';
import React from 'react';

import StyledTable from '../../../commons/StyledTable';

import getColumns from './getColumns';
import styles from './styles.module.css';

const APPROVAL_TABLE_DATA = [
	{
		name            : 'air',
		type            : 'course',
		created_by      : 'karthik',
		created_by_mail : 'Vakani.karthik@cogoport.com',
		created_at      : '21-08-2023',
		course_data     : ['air', 'custom', 'js'],
	},
	{
		name            : 'Customs',
		type            : 'test',
		created_by      : 'karthik',
		created_by_mail : 'shivam.singh@cogoport.com',
		created_at      : '21-08-2023',
		course_data     : ['air', 'custom', 'js', 'css', 'html'],
	},
	{
		name            : 'air',
		type            : 'course',
		created_by      : 'karthik',
		created_by_mail : 'sanjay@cogoport.com',
		created_at      : '21-08-2023',
		course_data     : ['air', 'custom', 'js'],
	},
	{
		name            : 'air',
		type            : 'course',
		created_by      : 'karthik',
		created_by_mail : 'karthik@cogoport.com',
		created_at      : '21-08-2023',
		course_data     : ['air', 'custom', 'js'],
	},
	{
		name            : 'air',
		type            : 'test',
		created_by      : 'karthik',
		created_by_mail : 'karthik@cogoport.com',
		created_at      : '21-08-2023',
		course_data     : ['air', 'custom', 'js'],
	},
	{
		name            : 'air',
		type            : 'test',
		created_by      : 'karthik',
		created_by_mail : 'karthik@cogoport.com',
		created_at      : '21-08-2023',
		course_data     : ['air', 'custom', 'js'],
	},
	{
		name            : 'air',
		type            : 'course',
		created_by      : 'karthik',
		created_by_mail : 'karthik@cogoport.com',
		created_at      : '21-08-2023',
		course_data     : ['air', 'custom', 'js'],
	},
	{
		name            : 'air',
		type            : 'course',
		created_by      : 'karthik',
		created_by_mail : 'karthik@cogoport.com',
		created_at      : '21-08-2023',
		course_data     : ['air', 'custom', 'js'],
	},
];

function ApprovalsModal({ showApprovalsModal = false, setShowApprovalsModal = () => {} }) {
	const router = useRouter();
	const approvalColumns = getColumns({ router });
	return (
		<div>
			<Modal
				show={showApprovalsModal}
				onClose={() => setShowApprovalsModal(false)}
				className={styles.modal_container}
			>
				<Modal.Header title="Approve the Tests and Courses" />
				<Modal.Body>
					<div>
						<StyledTable columns={approvalColumns} data={APPROVAL_TABLE_DATA} />
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
}

export default ApprovalsModal;
