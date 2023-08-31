import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import FormLayout from '../../../../../../common/FormLayout';
import { MODE_CONTROLS_MAPPING } from '../../../../../../configurations/addNotesConfig';

import styles from './styles.module.css';

const MODE_WISE_DEFAULTS = {
	ocean: {
		additional: [
			{
				category : '',
				remarks  : '',
				document : '',
			},
		],
	},
};
function AddNotes({ mode = '', shipmentData = {} }) {
	console.log('shipmentData', shipmentData);
	const {
		control, formState:{ errors = {} },
		// handleSubmit,
	} = useForm(
		{ defaultValues: MODE_WISE_DEFAULTS[mode] || {} },
	);

	const modeControls = MODE_CONTROLS_MAPPING[mode];

	return (
		<div className={styles.container}>
			<div className={styles.form_container}>
				<FormLayout
					control={control}
					controls={modeControls}
					errors={errors}
				/>
			</div>
			<div className={styles.footer}>
				<Button
					size="md"
					themeType="secondary"
					// disabled={loading}
					// onClick={onCloseForm}
				>
					Cancel
				</Button>
				<Button
					size="md"
					themeType="accent"
					className={styles.button_styles}
					// onClick={handleSubmit(createLeadOrgUserLog)}
					// loading={loading}
				>
					Submit
				</Button>
			</div>
		</div>
	);
}

export default AddNotes;
