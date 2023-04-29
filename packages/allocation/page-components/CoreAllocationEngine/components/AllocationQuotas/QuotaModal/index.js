import { Modal, Button, RadioGroup } from '@cogoport/components';
import AsyncSelect from '@cogoport/forms/page-components/Business/AsyncSelect';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import { getFieldController } from '../../../../../common/Form/getFieldController';
import controls from '../../../configurations/get-quotas-table-controls';
import useCreateEditAllocationQuota from '../../../hooks/useCreateEditAllocationQuota';
import useDeleteAllocationQuota from '../../../hooks/useDeleteAllocationQuota';

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
		toggleRoleType,
	} = props;

	const [radioValue, setRadioValue] = useState(toggleRoleType);
	const [roleTypeId, setRoleTypeId] = useState('');

	const { quota_attributes, type = '' } = quotaItem;

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

	if (type === 'delete') {
		return (
			<>
				<Modal.Header title="Delete Quota" />

				<Modal.Body>Are you sure you want to delete this quota?</Modal.Body>

				<Modal.Footer>
					<Button
						type="submit"
						size="md"
						themeType="primary"
						loading={loadingDelete}
						onClick={onDelete}
					>
						Yes
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
												status               : 'active',
												partner_entity_types : ['cogoport'],
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
						type="button"
						themeType="tertiary"
						disabled={isUpdatable ? false : !roleTypeId || loadingOnSave}
						id="cancel_quota_btn"
						onClick={onCloseModal}
						style={{ marginRight: '10px' }}
					>
						Cancel
					</Button>

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
