import { Button, Table } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useCreateLeadOrganizationToAccount from '../../../../../../hooks/useCreateLeadOrganizationToAccount';
import useListLeadOrganizations from '../../../../../../hooks/useListLeadOrganizations';
import useUpdateLeadUser from '../../../../../../hooks/useUpdateLeadUser';
import UserOnboard from '../UserOnboard';

import getColumns from './getColumns';
import styles from './styles.module.css';

function CustomerContacts({ setStep = () => {}, task = {}, setOrgId = () => {} }) {
	const [isEditMode, setIsEditMode] = useState(null);

	const { control, handleSubmit } = useForm();

	const { loading = false, listLeads = [] } = useListLeadOrganizations({ task });
	const listLeadsData = listLeads?.[GLOBAL_CONSTANTS.zeroth_index];

	const { onUpdateLeadUser = () => {}, updateLoading = false } = useUpdateLeadUser();

	const {
		onVerify = () => {},
		setCheckList = () => {},
		defaultValues = {},
		checkList = [],
		createLoading = false,
	} = useCreateLeadOrganizationToAccount({ listLeadsData, setStep, setOrgId, task });

	const columns = getColumns({ setIsEditMode, isEditMode, control, setCheckList, handleSubmit, onUpdateLeadUser });

	// !Todo just take the first obj of list for POC data
	return (
		<>
			<UserOnboard listLeadsData={listLeadsData} defaultValues={defaultValues} />

			<div className={styles.main_container}>
				<h4>Customer contacts</h4>
				<Table
					data={listLeadsData?.users || []}
					className={styles.table}
					columns={columns}
					loading={loading || updateLoading}
				/>

				<div className={styles.button_container}>
					<Button
						disabled={isEmpty(checkList) || loading || createLoading}
						onClick={() => { onVerify(); }}
					>
						Verify
					</Button>
				</div>
			</div>
		</>
	);
}

export default CustomerContacts;
