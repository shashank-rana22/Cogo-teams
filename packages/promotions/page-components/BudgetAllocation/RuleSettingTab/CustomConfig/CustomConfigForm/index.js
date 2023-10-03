import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { useEffect } from 'react';

import Layout from '../../../../../common/Layout';
import useCreatePromotionAgentRule from '../../../../../hooks/useCreatePromotionAgentRule';
import useUpdatePromotionAgentRule from '../../../../../hooks/useUpdatePromotionAgentRule';
import discountConfigControls from '../../GlobalConfig/controls/discountConfigControls';
import shipmentConfigControls from '../../GlobalConfig/controls/shipmentConfigControls';

import getControls from './controls';
import getOrganizationCreateAgentRuleData from './helpers/getOrganizationCreateAgentRuleData';
import getOrganizationUpdateAgentRuleData from './helpers/getOrganizationUpdateAgentRuleData';
import getShipmentAgentRuleData from './helpers/getShipmentAgentRuleData';
import styles from './styles.module.css';

const INCREMENT = 0.01;
const ZERO = 0;
const ONE = 1;

function CustomConfigForm({
	data = {},
	refetchList = () => {},
	setShowCustomConfigForm = () => {},
	viewAndEditConfigData = {},
	setViewAndEditConfigData = () => {},
}) {
	const DEFAULT_VALUES = {
		...(viewAndEditConfigData || {}),
		discount_limit_unit: 'flat',
	};
	const controls = getControls({ cogo_entity_id: data?.cogo_entity_id });
	const discountControls = discountConfigControls({ disabledFrequency: true });
	const shipmentControls = shipmentConfigControls();

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

	if (!viewAndEditConfigData) {
		DEFAULT_VALUES.frequency = data?.discount_config[GLOBAL_CONSTANTS.zeroth_index]?.frequency;
	} else {
		const { slab_configs = [], discount_config = [] } = viewAndEditConfigData || {};
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

	const { shipment_price_slab_config = [] } = formValues;
	useEffect(() => {
		shipment_price_slab_config?.forEach((_o, index) => {
			if (index === ZERO) {
				setValue(`shipment_price_slab_config.${index}.slab_lower_limit`, ONE);
			} else {
				setValue(
					`shipment_price_slab_config.${index}.slab_lower_limit`,
					Number(shipment_price_slab_config[index - ONE].slab_upper_limit) + INCREMENT,
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
					formValues={formValues}
				/>

				<div className={styles.head} />

				{data?.scope === 'organization' ? (
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
