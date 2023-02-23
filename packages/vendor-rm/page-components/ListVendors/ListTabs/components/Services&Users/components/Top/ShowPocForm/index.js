// eslint-disable-next-line import/no-named-as-default
import { Button } from '@cogoport/components';

import FormLayout from '../../../../../../../../commons/components/FormLayout/FormLayout';

import useAddServicePoc from './hooks/useAddServicePoc';
import styles from './styles.module.css';

function ShowPocForm({ setShowForm = () => {}, getVendorData }) {
	const {
		updatedControls,
		errors,
		control,
		handleSubmit,
		onSubmit,
	} = useAddServicePoc({ setShowForm, getVendorData });

	return (
		<div>
			<FormLayout
				fields={updatedControls}
				errors={errors}
				control={control}
			/>
			<div className={styles.button_container}>
				<Button
					size="md"
					themeType="tertiary"
					onClick={() => setShowForm('')}
				>
					Cancel

				</Button>

				<Button
					size="md"
					themeType="accent"
					onClick={handleSubmit(onSubmit)}
				>
					Save
				</Button>

			</div>
		</div>

	);
}

export default ShowPocForm;
