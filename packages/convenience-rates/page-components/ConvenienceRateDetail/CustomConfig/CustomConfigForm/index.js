import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';

import getMandatoryControls from '../../../../common/GlobalConfigForm/controls/getMandatoryControls';
import Layout from '../../../../common/Layout';

import getOrganizationControl from './controls';
import styles from './styles.module.css';

function CustomConfigForm({ onClosingForm = () => {}, organizationDetails = '', itemValue = '' }) {
	const router = useRouter();
	const { service = '' } = router?.query || {};
	const DEFAULT_VALUES = {};

	const organizationControls = getOrganizationControl(itemValue, organizationDetails);
	organizationControls.forEach((ctrl) => { DEFAULT_VALUES[ctrl.name] = ctrl?.value || ''; });
	const mandatoryControls = getMandatoryControls({ control_name: 'custom_config_slab', service });
	mandatoryControls.forEach((ctrl) => { DEFAULT_VALUES[ctrl.name] = ctrl?.value || ''; });

	const { control, formState:{ errors = {} } = {} } = useForm({
		defaultValues: DEFAULT_VALUES,
	});
	return (
		<div className={styles.container}>
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
			<div className={styles.layout_container}>
				{/* {isUpdatable ? (
					<Button
						className="secondary md"
						onClick={onClickDeactivate}
						style={{
							textTransform : 'capitalize',
							height        : 32,
						}}
						disabled={loading}
					>
						{configStatus === 'active' ? 'Deactivate' : 'Activate'}
					</Button>
				) : null} */}
			</div>
			<div className={styles.btn_container}>
				<Button
					themeType="secondary"
					onClick={onClosingForm}
					style={{ marginRight: '8px', fontWeight: '600' }}
				>
					Cancel
				</Button>
				<Button
					style={{ fontWeight: '600' }}
				>
					SAVE
				</Button>
			</div>
		</div>
	);
}
export default CustomConfigForm;
