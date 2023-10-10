import { Button, ButtonIcon } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMCross } from '@cogoport/icons-react';
import { useEffect, useMemo } from 'react';

import Layout from '../../../../common/Layout';
import UpdateModal from '../../../../common/UpdateModal';

import getControls from './controls/controls';
import discountConfigControls from './controls/discountConfigControls';
import getShipmentConfigControls from './controls/shipmentConfigControls';
import styles from './styles.module.css';

const INCREMENT = 0.01;
const ZERO = 0;
const ONE = 1;

function GlobalConfig({
	loading = {},
	activeList = '',
	setShowAddRuleForm = () => {},
	data = {},
	setViewAndEditRuleId = () => {},
	handleSubmitForm = () => {},
	handleActivateRule = () => {},
	showActivateModal = false,
	setShowActivateModal = () => {},
}) {
	const DEFAULT_VALUES = {
		...(data || {}),
		category            : 'business',
		for_service         : 'fcl_customs',
		discount_limit_unit : 'flat',
	};
	const controls = getControls();
	const discountControls = discountConfigControls({ disabledFrequency: false });
	const shipmentControls = getShipmentConfigControls();

	if (!data) {
		DEFAULT_VALUES.scope = 'shipment';
	} else {
		const { slab_configs = [], discount_config = [] } = data || {};
		DEFAULT_VALUES.shipment_price_slab_config = slab_configs;
		DEFAULT_VALUES.discount_limit_currency = discount_config[GLOBAL_CONSTANTS.zeroth_index]
			?.discount_limit_currency;
		DEFAULT_VALUES.discount_limit_value = discount_config[GLOBAL_CONSTANTS.zeroth_index]?.discount_limit_value;
		DEFAULT_VALUES.frequency = discount_config[GLOBAL_CONSTANTS.zeroth_index]?.frequency;
	}

	const {
		control, formState: { errors = {} } = {}, handleSubmit, watch, setValue,
	} = useForm({ defaultValues: DEFAULT_VALUES });
	const formValues = watch();
	const { organization_id = '', shipment_price_slab_config = [], scope } = formValues;

	const showElements = useMemo(() => ({
		organisation_type     : !organization_id,
		organisation_sub_type : !organization_id,
	}), [organization_id]);

	useEffect(() => {
		shipment_price_slab_config?.forEach((_o, index) => {
			if (index === ZERO) {
				setValue(`shipment_price_slab_config.${index}.slab_lower_limit`, ONE);
			} else {
				setValue(
					`shipment_price_slab_config.${index}.slab_lower_limit`,
					Number(shipment_price_slab_config[index - ONE]?.slab_upper_limit) + INCREMENT,
				);
			}
			setValue(`shipment_price_slab_config.${index}.slab_unit`, 'shipment_value');
		});
	}, [shipment_price_slab_config, setValue]);

	const SHOW_ELEM = {};
	shipment_price_slab_config?.forEach((slab, index) => {
		SHOW_ELEM[`shipment_price_slab_config.${index}.max_allowed_discount_value`] = slab?.discount_limit_unit
		=== 'percentage';
	});

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
					<Layout
						controls={discountControls}
						control={control}
						errors={errors}
					/>
				) : (
					<Layout
						controls={shipmentControls}
						control={control}
						errors={errors}
						formValues={formValues}
						showElements={SHOW_ELEM}
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
