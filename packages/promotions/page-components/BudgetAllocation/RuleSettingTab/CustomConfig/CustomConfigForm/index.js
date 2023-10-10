import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import DiscountForm from '../../../../../common/ConfigForm/DiscountForm';
import ShipmentForm from '../../../../../common/ConfigForm/ShipmentForm';
import Layout from '../../../../../common/Layout';
import useCreatePromotionAgentRule from '../../../../../hooks/useCreatePromotionAgentRule';
import useUpdatePromotionAgentRule from '../../../../../hooks/useUpdatePromotionAgentRule';

import getControls from './controls';
import getOrganizationCreateAgentRuleData from './helpers/getOrganizationCreateAgentRuleData';
import getOrganizationUpdateAgentRuleData from './helpers/getOrganizationUpdateAgentRuleData';
import getShipmentAgentRuleData from './helpers/getShipmentAgentRuleData';
import styles from './styles.module.css';

function CustomConfigForm({
	data = {},
	refetchList = () => {},
	setShowCustomConfigForm = () => {},
	viewAndEditConfigData = {},
	setViewAndEditConfigData = () => {},
}) {
	const DEFAULT_VALUES = {
		frequency: !viewAndEditConfigData
			? data?.discount_config?.[GLOBAL_CONSTANTS.zeroth_index]?.frequency
			: (viewAndEditConfigData || {})?.discount_config?.[GLOBAL_CONSTANTS.zeroth_index]?.frequency,
		...(viewAndEditConfigData || {}),
		discount_limit_unit        : 'flat',
		shipment_price_slab_config : (viewAndEditConfigData || {})?.slab_configs,
		discount_limit_currency    : (viewAndEditConfigData || {})?.discount_config?.[GLOBAL_CONSTANTS.zeroth_index]
			?.discount_limit_currency,
		discount_limit_value: (viewAndEditConfigData || {})?.discount_config
			?.[GLOBAL_CONSTANTS.zeroth_index]?.discount_limit_value,
	};
	const controls = getControls({ cogo_entity_id: data?.cogo_entity_id });

	const refetch = () => {
		refetchList();
		setShowCustomConfigForm(false);
		setViewAndEditConfigData(null);
	};

	const { loading = {}, onSubmit = () => {} } = useCreatePromotionAgentRule({ refetch });
	const { loading: updateAgentRuleLoading = {}, onUpdateAgentRule = () => {} } = useUpdatePromotionAgentRule({
		refetch,
	});

	const submitForm = (values) => {
		if (viewAndEditConfigData === null) {
			if (data?.scope === 'organization') {
				const dataMap = getOrganizationCreateAgentRuleData(values);
				onSubmit({
					data: {
						...dataMap,
						promotion_rule_id : data?.id,
						scope             : data?.scope,
					},
				});
			} else {
				const dataMap = getShipmentAgentRuleData(values);
				onSubmit({
					data: {
						...dataMap,
						promotion_rule_id : data?.id,
						scope             : data?.scope,
					},
				});
			}
		} else if (data?.scope === 'organization') {
			const dataMap = getOrganizationUpdateAgentRuleData(values);
			onUpdateAgentRule({ data: dataMap });
		} else {
			const dataMap = getShipmentAgentRuleData(values);
			onUpdateAgentRule({ data: dataMap });
		}
	};

	const deactiveRule = (values) => {
		const { id = '' } = values || {};
		onUpdateAgentRule({
			data: {
				id,
				status: 'inactive',
			},
		});
	};

	const {
		control, formState: { errors = {} } = {}, handleSubmit, watch, setValue,
	} = useForm({ defaultValues: DEFAULT_VALUES });

	return (
		<div>
			<div className={styles.container}>
				{viewAndEditConfigData ? (
					<div className={styles.close_btn}>
						<Button
							className={styles.btn}
							size="md"
							themeType="secondary"
							onClick={handleSubmit(deactiveRule)}
						>
							DEACTIVATE
						</Button>
					</div>
				) : null}
				<Layout
					controls={controls}
					control={control}
					errors={errors}
				/>

				<div className={styles.head} />

				{data?.scope === 'organization' ? (
					<DiscountForm
						control={control}
						errors={errors}
						disabledFrequency
					/>
				) : (
					<ShipmentForm
						control={control}
						errors={errors}
						formValues={watch()}
						setValue={setValue}
					/>
				)}

				<div className={styles.btn_container}>
					<Button
						className={styles.btn}
						size="md"
						themeType="secondary"
						disabled={loading || updateAgentRuleLoading}
						onClick={() => {
							setViewAndEditConfigData(null);
							setShowCustomConfigForm(false);
						}}
					>
						CANCEL
					</Button>
					<Button
						className={styles.btn}
						size="md"
						onClick={handleSubmit(submitForm)}
						disabled={loading || updateAgentRuleLoading}
					>
						SAVE
					</Button>
				</div>
			</div>
		</div>
	);
}

export default CustomConfigForm;
