import { Button, Table } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMPlus } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
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
	const [showCreatePoc, setShowCreatePoc] = useState(false);

	const { control, handleSubmit } = useForm();

	const {
		loading = false,
		listLeadsData = {},
		defaultValues = {},
		refetchList = () => {},
	} = useListLeadOrganizations({ task });

	const {
		onVerify = () => {},
		setCheckList = () => {},
		checkList = [],
		createOrgLoading = false,
	} = useCreateLeadOrganizationToAccount({ listLeadsData, setStep, setConsigneeShipperId, task });

	const {
		onUpdateLeadUser = () => {},
		updateLoading = false,
	} = useUpdateLeadUser({ selectedUserId, setSelectedUserId, refetchList });

	const {
		onCreateLeadUser = () => {},
		createUserLoading = false,
	} = useCreateLeadUser({ listLeadsData, refetchList, setShowCreatePoc });

	const columns = getColumns({
		setSelectedUserId,
		selectedUserId,
		control,
		setCheckList,
		handleSubmit,
		onUpdateLeadUser,
	});

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

				{showCreatePoc ? (
					<CreatePoc
						setShowCreatePoc={setShowCreatePoc}
						onCreateLeadUser={onCreateLeadUser}
						control={control}
						handleSubmit={handleSubmit}
					/>
				) : null}

				<div className={styles.button_container}>
					<Button
						disabled={showCreatePoc || createUserLoading || createOrgLoading}
						onClick={() => { setShowCreatePoc(true); }}
						themeType="accent"
					>
						<IcMPlus />
						Add POC
					</Button>

					<div>
						<Button
							themeType="secondary"
							onClick={() => { onCancel(); }}
						>
							Cancel
						</Button>

						<Button
							disabled={isEmpty(checkList) || loading || createUserLoading || createOrgLoading}
							themeType="accent"
							onClick={() => { onVerify(); }}
						>
							Verify
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}

export default CustomerContacts;
