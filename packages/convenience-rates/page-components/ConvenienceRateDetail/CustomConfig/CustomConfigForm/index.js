import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';

import getMandatoryControls from '../../../../common/GlobalConfigForm/controls/getMandatoryControls';
import Layout from '../../../../common/Layout';
import useCreateConvenienceRateCustomConfigs from '../../../../hooks/useCreateConvenienceRateCustomConfigs';
import useUpdateConvenienceRateCustomConfigs from '../../../../hooks/useUpdateConvenienceRateCustomConfigs';

import getOrganizationControl from './controls';
import styles from './styles.module.css';

function CustomConfigForm(
	{
		onClosingForm = () => {}, organizationDetails = {}, data = {}, itemValue = {}, loading = '',
		defaultConfigFeeUnit = '',
	},
) {
	const router = useRouter();
	const { service = '' } = router?.query || {};
	const { status = '' } = itemValue || {};
	const isUpdatable = !isEmpty(status);

	const DEFAULT_VALUES = {};
	const organizationControls = getOrganizationControl(itemValue, organizationDetails);
	organizationControls.forEach((ctrl) => { DEFAULT_VALUES[ctrl.name] = ctrl?.value || ''; });
	const mandatoryControls = getMandatoryControls({ control_name: 'custom_config_slab', service, data: itemValue });
	mandatoryControls.forEach((ctrl) => { DEFAULT_VALUES[ctrl.name] = ctrl?.value || ''; });

	const { control, formState:{ errors = {} } = {}, watch, handleSubmit } = useForm({
		defaultValues: DEFAULT_VALUES,
	});
	const { onClickDeactivate = () => {}, onUpdate = () => {} } = useUpdateConvenienceRateCustomConfigs(
		{ itemValue, onClosingForm, data, defaultConfigFeeUnit, watch },
	);
	const { onCreate = () => {} } = useCreateConvenienceRateCustomConfigs(
		{ itemValue, onClosingForm, data, defaultConfigFeeUnit, watch },
	);
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
						disabled={loading}
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
				controls={mandatoryControls}
				control={control}
				errors={errors}
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
						onClick={onUpdate}
					>
						SAVE
					</Button>
				) : (
					<Button
						style={{ fontWeight: '600' }}
						onClick={handleSubmit(onCreate)}
					>
						SAVE
					</Button>
				)}
			</div>
		</div>
	);
}
export default CustomConfigForm;
