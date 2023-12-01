import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useGetPermission } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import Layout from '../../../common/Layout';
import formattedData from '../../../helpers/getFormattedData';
import useGetCpAuthRoles from '../../../hooks/useGetCpAuthRoles';
import useGetOrganizations from '../../../hooks/useGetOrganization';
import CC from '../../../utils/condition-constants';

import getCreateFormControls from './controls/createControls';
import styles from './styles.module.css';

function CreatePartner({
	setClickedItem = () => {}, setView = () => {}, entityType = 'channel_partner',
	createUpdatePartner = async () => {}, refetch = () => {}, apiData = {},
}) {
	const { cpData } = useGetCpAuthRoles();
	const { controls } = getCreateFormControls(entityType);
	const [showVerify, setShowVerify] = useState(null);
	const { control, handleSubmit, formState:{ errors = {} } } = useForm({
		defaultValues: {
			users: [
				{
					name: undefined,
				},
			],
		},
	});
	const { isConditionMatches } = useGetPermission();
	const { data:organizationData, apiTrigger } = useGetOrganizations();
	const onSubmit = async (val) => {
		const TYPE = 'create';
		const values = { ...val, entityType, type: TYPE, cpAuthRolesAPI: cpData };
		const data = formattedData({ values });
		let status = 'active';
		if (
			isConditionMatches(CC.SEE_AS_ENTITY_MANAGER)
			&& !isConditionMatches(CC.SEE_ALL_USERS)
		) {
			status = 'inactive';
		}

		const { entityType:_, agreement, logo, utility_bill_document_url, role_ids:__, type:___, ...rest } = data;
		const modifiedData = {
			...rest,
			agreement                 : agreement?.finalUrl || '',
			logo                      : logo?.finalUrl || '',
			utility_bill_document_url : utility_bill_document_url?.finalUrl || '',
			status,
		};
		modifiedData.preferred_languages = ['english'];
		await createUpdatePartner(modifiedData);
		if (!isEmpty(apiData)) {
			setView('empty');
			refetch();
		}
	};
	const verifyAndSubmit = async (values) => {
		if (entityType === 'channel_partner') {
			await apiTrigger(values);
			if (!isEmpty(organizationData.list)) {
				return setShowVerify(values);
			}
		}
		return onSubmit(values);
	};

	return (
		<>
			<Layout
				control={control}
				errors={errors}
				controls={controls}
			/>

			<div className={styles.btn_container}>
				<Button
					onClick={() => { setView('empty'); setClickedItem(''); }}
					className={styles.left_btn}
				>
					Cancel

				</Button>
				<Button onClick={handleSubmit(verifyAndSubmit)}>Save</Button>
			</div>
			<Modal onClose={() => setShowVerify(null)} show={!!showVerify}>
				<Modal.Header title="Are You sure" />
				<Modal.Body>
					<div>
						This account already exists. Please confirm with the business head and
						fill in the details post confirmation.
					</div>
					<div className={styles.modal_btn}>
						<Button
							onClick={() => setShowVerify(null)}
							className={styles.left_btn}
						>
							Cancel
						</Button>
						<Button
							onClick={() => {
								onSubmit({ ...showVerify });
								setShowVerify(null);
							}}
						>
							Proceed Anyways
						</Button>
					</div>
				</Modal.Body>

			</Modal>
		</>

	);
}
export default CreatePartner;
