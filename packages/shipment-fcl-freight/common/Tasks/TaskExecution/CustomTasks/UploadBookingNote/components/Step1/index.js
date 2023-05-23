import { Button } from '@cogoport/components';
import { Layout } from '@cogoport/ocean-modules';

import getStep1Controls from '../../helpers/getStep1Controls';

import styles from './styles.module.css';

function Step1({ data = {}, skipStep0, setStep }) {
	const { formProps } = data || {};
	const { control, formState:{ errors = {} } = {}, handleSubmit } = formProps || {};

	return (
		<div>
			<div>
				You can Upload Multiple Booking Notes
			</div>

			<Layout
				control={control}
				errors={errors}
				fields={getStep1Controls}
			/>

			<div>
				<div className={styles.button_container}>
					{!skipStep0 && <Button themeType="secondary" onClick={() => setStep(0)}>Back</Button>}

					<Button themeType="primary" onClick={handleSubmit(() => setStep(2))}>Next</Button>
				</div>
			</div>
		</div>
	);
}

export default Step1;
