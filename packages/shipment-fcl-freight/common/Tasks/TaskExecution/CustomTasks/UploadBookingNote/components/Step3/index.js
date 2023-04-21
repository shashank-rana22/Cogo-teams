import { Button } from '@cogoport/components';

import Layout from '../../../../helpers/Layout';

import styles from './styles.module.css';

function Step3({ data, setStep }) {
	const { finalControls, formProps, customValues = {}, onSubmit = () => {} } = data || {};
	const { control, handleSubmit, formState:{ errors = {} } = {} } = formProps || {};

	return (
		<div>
			<div>
				<Layout
					control={control}
					fields={finalControls}
					errors={errors}
					customValues={customValues}
				/>
			</div>

			<div className={styles.button_container}>
				<Button themeType="secondary" onClick={() => setStep(2)}>Back</Button>
				<Button themeType="primary" onClick={handleSubmit(onSubmit)}>Submit</Button>
			</div>
		</div>
	);
}
export default Step3;
