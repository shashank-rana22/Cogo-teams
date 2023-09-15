import { Button, Table } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMPlus } from '@cogoport/icons-react';
import { useState } from 'react';

import useCreateLeadOrganizationToAccount from '../../../../../../hooks/useCreateLeadOrganizationToAccount';
import useCreateLeadUser from '../../../../../../hooks/useCreateLeadUser';
import useListLeadOrganizations from '../../../../../../hooks/useListLeadOrganizations';
import useUpdateLeadUser from '../../../../../../hooks/useUpdateLeadUser';
import UserOnboard from '../UserOnboard';

import CreatePoc from './CreatePoc';
import getColumns from './getColumns';
import styles from './styles.module.css';

function CustomerContacts({ setStep = () => {}, task = {}, setConsigneeShipperId = () => {}, onCancel = () => {} }) {
	const [selectedUserId, setSelectedUserId] = useState(null);
	const [submitUserId, setSubmitUserId] = useState(null);
	const [showCreatePoc, setShowCreatePoc] = useState(false);

	const { control, handleSubmit, reset, formState:{ errors } } = useForm();

	const {
		loading = false,
		leadsData = {},
		defaultValues = {},
		refetchList = () => {},
	} = useListLeadOrganizations({ task });

	const {
		createLeadOrgAccount = () => {},
		createLoading = false,
	} = useCreateLeadOrganizationToAccount({ leadsData, setStep, setConsigneeShipperId, task });

	const {
		onUpdateLeadUser = () => {},
		updateLoading = false,
	} = useUpdateLeadUser({ selectedUserId, setSelectedUserId, refetchList, setShowCreatePoc });

	const {
		onCreateLeadUser = () => {},
		createUserLoading = false,
	} = useCreateLeadUser({ leadsData, refetchList, setShowCreatePoc, setSelectedUserId, reset });

	const columns = getColumns({
		setSelectedUserId,
		selectedUserId,
		control,
		createLoading,
		updateLoading,
		handleSubmit,
		onUpdateLeadUser,
		createLeadOrgAccount,
		submitUserId,
		setSubmitUserId,
	});

	return (
		<>
			<UserOnboard leadsData={leadsData} defaultValues={defaultValues} refetchList={refetchList} />

			<div className={styles.main_container}>
				<h4>Customer Contacts</h4>
				<Table
					data={leadsData?.users || []}
					className={styles.table}
					columns={columns}
					loading={loading}
				/>

				{showCreatePoc ? (
					<CreatePoc
						setShowCreatePoc={setShowCreatePoc}
						onCreateLeadUser={onCreateLeadUser}
						createUserLoading={createUserLoading}
						control={control}
						errors={errors}
						handleSubmit={handleSubmit}
					/>
				) : null}

				<div className={styles.button_container}>
					<Button
						disabled={showCreatePoc || createUserLoading || createLoading}
						onClick={() => { setShowCreatePoc(true); }}
						themeType="accent"
					>
						<IcMPlus />
						Add POC
					</Button>

					<Button
						themeType="secondary"
						disabled={loading || createUserLoading || createLoading || updateLoading}
						onClick={onCancel}
					>
						Cancel
					</Button>
				</div>
			</div>
		</>
	);
}

export default CustomerContacts;
