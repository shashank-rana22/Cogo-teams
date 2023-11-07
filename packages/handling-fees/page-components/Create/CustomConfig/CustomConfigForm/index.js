import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect } from 'react';

import handleFieldArrayAddCheck from '../../../../helpers/checkFeeConfiguration';
import useCreateHandlingFeeCustomConfig from '../../../../hooks/useCreateHandlingFeeCustomConfig';
import useUpdateHandlingFeeCustomConfig from '../../../../hooks/useUpdateHandlingFeeCustomConfig';
import getMandatoryControls from '../../getMandatoryControls';

import getOrganizationControl from './controls';
import Layout from './Layout';
import styles from './styles.module.css';

function CustomConfigForm({
	onClosingForm = () => {}, organizationDetails = {}, itemValue = {},
	defaultConfigFeeUnit = '', listType = '', refetchGetHandlingFeeData = () => { },
}) {
	const router = useRouter();

	const { service = '' } = router?.query || {};

	const { status = '', slab_details = [] } = itemValue || {};

	const isUpdatable = !isEmpty(status);

	const DEFAULT_VALUES = {};

	const organizationControls = getOrganizationControl({ itemValue, organizationDetails });

	organizationControls.forEach((ctrl) => { DEFAULT_VALUES[ctrl.name] = ctrl?.value || ''; });

	const mandatoryControls = getMandatoryControls({
		control_name         : 'custom_config_slab',
		service,
		data                 : itemValue,
		isAddFieldArrayCheck : true,
	});

	mandatoryControls.forEach((ctrl) => { DEFAULT_VALUES[ctrl.name] = ctrl?.value || ''; });

	const { control, formState: { errors = {} } = {}, watch, handleSubmit, setValue } = useForm({
		defaultValues: DEFAULT_VALUES,
	});

	const formValues = watch();

	const { onCreate = () => { } } = useCreateHandlingFeeCustomConfig({
		defaultConfigFeeUnit,
		onClosingForm,
		refetchGetHandlingFeeData,
	});

	const {
		onUpdate = () => { },
		onClickDeactivate = () => { },
	} = useUpdateHandlingFeeCustomConfig({
		itemValue  : itemValue || {},
		onClosingForm,
		defaultConfigFeeUnit,
		activeList : listType,
		refetchGetHandlingFeeData,
	});

	const customFieldArrayControls = { alternate_slab_details: {}, slab_details: {} };

	(slab_details || []).forEach((_o, index) => {
		customFieldArrayControls.slab_details[GLOBAL_CONSTANTS.zeroth_index] = {
			slab_lower_limit: { disabled: true },
		};

		if (index > 0) {
			customFieldArrayControls.slab_details[index] = {
				slab_unit        : { disabled: true },
				slab_lower_limit : { disabled: true },
				fee_unit         : { disabled: true },
				fee_currency     : { disabled: true },
			};
		}
	});

	useEffect(() => {
		setValue('custom_config_slab.0.slab_lower_limit', 1);
	}, [setValue, service]);

	useEffect(() => {
		if (!isEmpty(slab_details)) {
			setValue('custom_config_slab', slab_details);
		}
	}, [setValue, slab_details]);

	return (
		<div className={styles.container}>
			<div className={styles.layout_container}>
				{isUpdatable ? (
					<Button
						style={{
							textTransform : 'capitalize',
							height        : 32,
							fontWeight    : '700',
						}}
						size="md"
						onClick={onClickDeactivate}
					>
						{status === 'active' ? 'Deactivate' : 'Activate'}
					</Button>
				) : null}
			</div>
			<Layout
				controls={organizationControls}
				control={control}
				errors={errors}
			/>
			<Layout
				control={control}
				controls={mandatoryControls}
				errors={errors}
				handleFieldArrayAddCheck={handleFieldArrayAddCheck}
				customFieldArrayControls={customFieldArrayControls}
				formValues={formValues}
				setValue={setValue}
			/>
			<div className={styles.btn_container}>
				<Button
					themeType="secondary"
					onClick={onClosingForm}
					style={{ marginRight: '8px', fontWeight: '600' }}
				>
					Cancel
				</Button>
				{isUpdatable ? (
					<Button
						style={{ fontWeight: '600' }}
						onClick={handleSubmit(onUpdate)}
					>
						Update
					</Button>
				) : (
					<Button
						style={{ fontWeight: '600' }}
						onClick={handleSubmit(onCreate)}
					>
						Create
					</Button>
				)}
			</div>
		</div>
	);
}

export default CustomConfigForm;
