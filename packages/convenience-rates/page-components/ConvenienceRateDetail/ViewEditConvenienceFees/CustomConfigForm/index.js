import { Button } from '@cogoport/components';

import Layout from '../../../../common/Layout';
import useSaveConvenienceRateCustomConfig from '../../../../hooks/useSaveConvenienceRateCustomConfig';

import styles from './styles.module.css';

function CustomConfigForm(props) {
	const {
		controls,
		control,
		errors,
		onClosingForm,
	} = useSaveConvenienceRateCustomConfig(props);

	// const mandatoryControls = getMandatoryControls({});

	// mandatoryControls.forEach((ctrl) => { DEFAULT_VALUES[ctrl.name] = ctrl?.value || ''; });
	return (
		<div className={styles.container}>
			<Layout
				controls={controls}
				control={control}
				errors={errors}
			/>
			{/* <Layout
				controls={mandatoryControls}
				control={control}
				errors={errors}
			/> */}
			<div className={styles.layoutContainer}>
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
			<div className={styles.btnContainer}>
				<Button
					themeType="secondary"
					onClick={onClosingForm}
					style={{ marginRight: '8px', fontWeight: '600' }}
				>
					Cancel
				</Button>
				<Button
					style={{ textTransform: 'capitalize', fontWeight: '600' }}
				>
					Save
				</Button>
			</div>
		</div>
	);
}
export default CustomConfigForm;
