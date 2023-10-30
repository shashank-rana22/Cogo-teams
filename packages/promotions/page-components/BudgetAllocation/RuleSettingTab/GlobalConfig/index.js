import { Button, ButtonIcon } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMCross } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useMemo } from 'react';

import DiscountForm from '../../../../common/ConfigForm/DiscountForm';
import ShipmentForm from '../../../../common/ConfigForm/ShipmentForm';
import Layout from '../../../../common/Layout';
import UpdateModal from '../../../../common/UpdateModal';

import getControls from './controls';
import styles from './styles.module.css';

function GlobalConfig({
	loading = {},
	activeList = '',
	activeService = '',
	setShowAddRuleForm = () => {},
	data = {},
	setViewAndEditRuleId = () => {},
	handleSubmitForm = () => {},
	handleActivateRule = () => {},
	showActivateModal = false,
	setShowActivateModal = () => {},
}) {
	const DEFAULT_VALUES = {
		scope                      : 'shipment',
		...(data || {}),
		category                   : data?.category?.[GLOBAL_CONSTANTS.zeroth_index],
		for_service                : activeService,
		discount_limit_unit        : 'flat',
		shipment_price_slab_config : (data || {})?.slab_configs,
		discount_limit_currency    : (data || {})?.discount_config?.[GLOBAL_CONSTANTS.zeroth_index]
			?.discount_limit_currency,
		discount_limit_value : (data || {})?.discount_config?.[GLOBAL_CONSTANTS.zeroth_index]?.discount_limit_value,
		frequency            : (data || {})?.discount_config?.[GLOBAL_CONSTANTS.zeroth_index]?.frequency,
	};
	const controls = getControls({ disabledCategory: !isEmpty(data?.category) });

	const {
		control, formState: { errors = {} } = {}, handleSubmit, watch, setValue,
	} = useForm({ defaultValues: DEFAULT_VALUES });
	const formValues = watch();
	const { organization_id = '', scope = '' } = formValues;

	const showElements = useMemo(() => ({
		organisation_type     : !organization_id,
		organisation_sub_type : !organization_id,
	}), [organization_id]);

	return (
		<div>
			<div className={styles.container}>
				<div className={styles.close_btn}>
					<ButtonIcon
						size="lg"
						icon={<IcMCross />}
						onClick={() => {
							setShowAddRuleForm(false);
							setViewAndEditRuleId(null);
						}}
					/>
				</div>
				<Layout
					controls={controls}
					control={control}
					errors={errors}
					formValues={formValues}
					showElements={showElements}
				/>
				<div className={styles.head}>
					<div className={styles.heading}>Global Configuration</div>
				</div>
				{scope === 'organization' ? (
					<DiscountForm
						control={control}
						errors={errors}
						disabledFrequency={false}
					/>
				) : (
					<ShipmentForm
						control={control}
						errors={errors}
						formValues={formValues}
						setValue={setValue}
					/>
				)}

				<div className={styles.btn_container}>
					<Button
						className={styles.btn}
						size="md"
						onClick={handleSubmit(handleSubmitForm)}
						disabled={loading}
					>
						{activeList === 'active' ? 'SAVE' : 'Activate'}
					</Button>
				</div>
			</div>

			{showActivateModal
				? (
					<UpdateModal
						title="Are you sure you want to ACTIVATE this rule?"
						onClose={() => { setShowActivateModal(false); }}
						onClickYes={handleSubmit(handleActivateRule)}
						show={showActivateModal}
					/>
				) : null}
		</div>
	);
}

export default GlobalConfig;
