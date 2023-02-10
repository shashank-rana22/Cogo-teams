import { Modal, Button, RadioGroup } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import AsyncSelect from '../../../../common/Form/components/AsyncSelect';
import { getFieldController } from '../../../../common/Form/Controlled';
import useCreateAllocationQuota from '../../../../hooks/useCreateAllocationQuota';
import controls from '../../../../utils/get-quotas-table-controls';

import styles from './styles.module.css';

const segmentation = [
	'',
	'Mid Size',
	'Long Tail',
	'Enterprise',
	'Unknown',
	'Total',
];

const lifecycle_stage = [
	'Enriched Leads',
	'Sales Qualified',
	'KYC Verified',
	'Transacting',
	'Total',
];

const ROLE_OPTIONS = [
	{
		label : 'Role',
		value : 'role',
	},
	{
		label : 'User',
		value : 'user',
	},
];

function QuotaModal(props) {
	const {
		showCreateQuotas,
		onCloseModal,
		refetch,
	} = props;

	const {
		profile: {
			partner: {
				id: partnerId = '',
			},
		},
	} = useSelector((rdxState) => rdxState);

	const [roleTypeId, setRoleTypeId] = useState('');
	const [radioValue, setRadioValue] = useState('role');

	const {
		onSave,
		loading: loadingOnSave,
		formProps,
	} = useCreateAllocationQuota({
		onCloseModal,
		refetch,
		radioValue,
		roleTypeId,
	});

	const { control, handleSubmit } = formProps;

	// console.log('formProps :: ', formProps);

	// Todo roleTypeId

	return (
		<Modal
			show={showCreateQuotas}
			position="basic"
			size="lg"
			onClose={onCloseModal}
			closeOnOuterClick={false}
		>
			<Modal.Header title="Create Allocation Quota" />

			<form onSubmit={handleSubmit(onSave)}>
				<Modal.Body>
					<section key={radioValue}>
						<div className={styles.role_container}>
							Role Type :
							<RadioGroup
								options={ROLE_OPTIONS}
								value={radioValue}
								onChange={(role) => setRadioValue(role)}
								className={styles.group_radio}
							/>

							{radioValue === 'user' && (
								<AsyncSelect
									name="user_id"
									asyncKey="partner_users"
									valueKey="user_id"
									initialCall={false}
									onChange={(userId) => setRoleTypeId(userId)}
									value={roleTypeId}
									placeholder="Select Partner User"
									params={{
										filters: {
											partner_entity_types: ['cogoport'],
										},
									}}
								/>
							)}

							{radioValue === 'role' && (
								<AsyncSelect
									name="role_id"
									asyncKey="partner_roles"
									initialCall={false}
									onChange={(roleId) => setRoleTypeId(roleId)}
									value={roleTypeId}
									placeholder="Select Role"
									// Todo check for vietnam
									params={{
										permissions_data_required : false,
										filters                   : {
											status           : 'active',
											stakeholder_id   : partnerId,
											stakeholder_type : 'partner',
										},
									}}
								/>
							)}

						</div>

						<section className={styles.form_container}>
							<div className={styles.form_columns}>
								{segmentation.map((columnName) => (
									<div key={columnName} style={{ flex: 1 }}>
										{columnName}
									</div>
								))}
							</div>

							<div style={{ display: 'flex' }}>
								<div>
									{lifecycle_stage.map((rowName) => (
										<div key={rowName} className={styles.row_item}>
											{rowName}
										</div>
									))}
								</div>

								<div className={styles.row_container}>
									{controls.map((controlItem) => {
										const el = { ...controlItem };

										const Element = getFieldController(el.type);

										if (!Element) return null;

										return (
											<div className={styles.control_container}>
												<Element
													{...el}
													key={el.name}
													control={control}
													id={`${el.name}_input`}
												/>
											</div>
										);
									})}
								</div>
							</div>
						</section>
					</section>
				</Modal.Body>

				<Modal.Footer>
					<Button
						size="md"
						type="submit"
						loading={loadingOnSave}
						id="save_quota_btn"
					>
						Save
					</Button>
				</Modal.Footer>
			</form>
		</Modal>

	);
}

export default QuotaModal;
