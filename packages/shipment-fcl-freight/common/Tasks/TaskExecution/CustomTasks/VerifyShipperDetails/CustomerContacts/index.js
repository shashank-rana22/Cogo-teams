import { Button, Table } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useListLeadOrganizations from '../../../../../../hooks/useListLeadOrganizations';
import useUpdateLeadUser from '../../../../../../hooks/useUpdateLeadUser';
import UserOnboard from '../UserOnboard';

import getColumns from './getColumns';
import styles from './styles.module.css';

function CustomerContacts({ setStep = () => {}, task = {} }) {
	const [isEditMode, setIsEditMode] = useState(null);
	const [checkList, setCheckList] = useState([]);

	const { control, handleSubmit } = useForm();

	const { loading = false, listLeads = [] } = useListLeadOrganizations({ task });

	const { updateLeadUser, updateLoading = false } = useUpdateLeadUser();

	const onUpdateLeadUser = (values) => {
		console.log({ values });

		const { name, email, mobile_number } = values;

		const PAYLOAD = {
			name,
			email,
			mobile_number       : mobile_number?.number,
			mobile_country_code : mobile_number?.country_code,
		};

		updateLeadUser({ payload: PAYLOAD });
	};

	const columns = getColumns({ setIsEditMode, isEditMode, control, setCheckList, handleSubmit, onUpdateLeadUser });

	const listLeadsData = listLeads?.[GLOBAL_CONSTANTS.zeroth_index];

	// !Todo just take the first obj of list for POC data
	return (
		<>
			<UserOnboard listLeadsData={listLeadsData} />

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
						disabled={isEmpty(checkList) || loading}
						onClick={() => { setStep('1'); }}
					>
						Verify
					</Button>
				</div>
			</div>
		</>
	);
}

export default CustomerContacts;
