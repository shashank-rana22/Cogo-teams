import { Modal, Button, RadioGroup } from '@cogoport/components';
import AsyncSelect from '@cogoport/forms/page-components/Business/AsyncSelect';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import { getFieldController } from '../../../../common/Form/getFieldController';
import useCreateEditAllocationQuota from '../../../../hooks/useCreateEditAllocationQuota';
import useDeleteAllocationQuota from '../../../../hooks/useDeleteAllocationQuota';
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
		quotaItem,
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

	const [radioValue, setRadioValue] = useState('role');
	const [roleTypeId, setRoleTypeId] = useState('');

	const { quota_attributes, action = '' } = quotaItem;

	const isUpdatable = !isEmpty(quota_attributes);

	const {
		onSave,
		loading: loadingOnSave,
		formProps,
	} = useCreateEditAllocationQuota({
		onCloseModal,
		refetch,
		radioValue,
		roleTypeId,
		isUpdatable,
		quotaItem,
		setRoleTypeId,
	});

	const { control, handleSubmit } = formProps;

	const { onDelete, loadingDelete } = useDeleteAllocationQuota({
		id: quotaItem.id,
		onCloseModal,
		refetch,
	});

	// Todo roleTypeId
	// Todo  3 mappings 2 same for create and edit and 1 for delete

	if (action === 'delete') {
		return (
			<>
				<Modal.Header title="Delete Quota" />

				<Modal.Body>Do you want to delete this quota?</Modal.Body>

				<Modal.Footer>
					<Button
						type="submit"
						size="md"
						themeType="primary"
						loading={loadingDelete}
						onClick={onDelete}
					>
						Delete
					</Button>
				</Modal.Footer>
			</>
		);
	}

	return (
		<>
			<Modal.Header title={`${isUpdatable ? 'Update' : 'Create'} Allocation Quota`} />

			<form onSubmit={handleSubmit(onSave)}>
				<Modal.Body>
					<section key={radioValue}>
						{!isUpdatable ? (
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
						) : null}

						<section className={styles.form_container}>
							<div className={styles.form_columns}>
								{segmentation.map((columnName) => (
									<div key={columnName} className={styles.col_item}>
										{columnName}
									</div>
								))}
							</div>

							<div style={{ display: 'flex' }}>
								<div className={styles.row_labels}>
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
													size="sm"
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
						disabled={isUpdatable ? false : !roleTypeId}
						loading={loadingOnSave}
						id="save_quota_btn"
					>
						Save
					</Button>
				</Modal.Footer>
			</form>
		</>

	);
}

export default QuotaModal;
