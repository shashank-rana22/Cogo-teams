import { Modal, Button, RadioGroup } from '@cogoport/components';
import AsyncSelect from '@cogoport/forms/page-components/Business/AsyncSelect';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import { getFieldController } from '../../../../../common/Form/getFieldController';
import controls from '../../../configurations/get-quotas-table-controls';
import useCreateEditAllocationQuota from '../../../hooks/useCreateEditAllocationQuota';
import useDeleteAllocationQuota from '../../../hooks/useDeleteAllocationQuota';

import styles from './styles.module.css';

const getSegmentLabels = ({ t = () => {} }) => [
	'',
	t('allocation:mid_size'),
	t('allocation:long_tail'),
	t('allocation:enterprise'),
	t('allocation:unknown_label'),
	t('allocation:total_label'),
];

const getLifecycleStage = ({ t = () => {} }) => [
	t('allocation:enriched_leads_label'),
	t('allocation:sales_qualified_label'),
	t('allocation:kyc_verified_label'),
	t('allocation:transacting_label'),
	t('allocation:total_label'),
];

const getRoleOptions = ({ t = () => {} }) => [
	{
		label : t('allocation:role_label'),
		value : 'role',
	},
	{
		label : t('allocation:user_label'),
		value : 'user',
	},
];

function QuotaModal(props) {
	const { t } = useTranslation(['allocation']);

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

	const roleOptions = getRoleOptions({ t });

	const lifeCycleStage = getLifecycleStage({ t });

	const segmentation = getSegmentLabels({ t });

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
		t,
	});

	const { control, handleSubmit } = formProps;

	const { onDelete, loadingDelete } = useDeleteAllocationQuota({
		id: quotaItem.id,
		onCloseModal,
		refetch,
		t,
	});

	if (type === 'delete') {
		return (
			<>
				<Modal.Header title={t('allocation:delete_quota')} />

				<Modal.Body>{t('allocation:delete_this_quota_warning')}</Modal.Body>

				<Modal.Footer>
					<Button
						type="submit"
						size="md"
						themeType="primary"
						loading={loadingDelete}
						onClick={onDelete}
					>
						{t('allocation:yes_label')}
					</Button>
				</Modal.Footer>
			</>
		);
	}

	return (
		<>
			<Modal.Header title={`${isUpdatable ? t('allocation:update_button')
				: t('allocation:create_button_label')} ${t('allocation:allocation_type')}`}
			/>

			<form onSubmit={handleSubmit(onSave)}>
				<Modal.Body>
					<section key={radioValue}>
						{!isUpdatable ? (
							<div className={styles.role_container}>
								{t('allocation:role_type_label')}
								<RadioGroup
									options={roleOptions}
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
										placeholder={t('allocation:partner_user_placeholder')}
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
										placeholder={t('allocation:role_id_placeholder')}
										params={{
											permissions_data_required : false,
											filters                   : {
												status               : true,
												partner_entity_types : ['cogoport'],
											},
										}}
									/>
								)}
							</div>
						) : null}

						<section className={styles.form_container}>
							<div className={styles.form_columns}>
								{(segmentation || []).map((columnName) => (
									<div key={columnName} className={styles.col_item}>
										{columnName}
									</div>
								))}
							</div>

							<div style={{ display: 'flex' }}>
								<div className={styles.row_labels}>
									{(lifeCycleStage || []).map((rowName) => (
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
											<div key={el.name} className={styles.control_container}>
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
						{t('allocation:cancel_button')}
					</Button>

					<Button
						size="md"
						type="submit"
						disabled={isUpdatable ? false : !roleTypeId}
						loading={loadingOnSave}
						id="save_quota_btn"
					>
						{t('allocation:save_button')}
					</Button>
				</Modal.Footer>
			</form>
		</>

	);
}

export default QuotaModal;
