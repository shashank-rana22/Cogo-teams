import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import FormLayout from '../../../../../../common/FormLayout';
import { MODE_CONTROLS_MAPPING } from '../../../../../../configurations/addNotesConfig';
import useCreateModewiseSop from '../../../../../../hooks/useCreateModewiseSop';

import styles from './styles.module.css';

const MODE_WISE_DEFAULTS = {
	get_api: {
		additional: [
			{
				category : '',
				remarks  : '',
				document : '',
			},
		],
	},
	list_api: {},
};
function AddNotes({
	controlType = '',
	shipmentData = {},
	setShowForm = () => {},
	procedureId = '',
	getModeSopData = () => {},
}) {
	const {
		control, formState:{ errors = {} },
		handleSubmit,
	} = useForm(
		{ defaultValues: MODE_WISE_DEFAULTS[controlType] || {} },
	);

	const {
		createModewiseSop = () => {},
		loading = false,
	} = useCreateModewiseSop({ shipmentData, controlType, procedureId, getModeSopData, setShowForm });

	const modeControls = MODE_CONTROLS_MAPPING[controlType];

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
					disabled={loading}
					onClick={() => setShowForm(false)}
				>
					Cancel
				</Button>
				<Button
					size="md"
					themeType="primary"
					className={styles.button_styles}
					onClick={handleSubmit(createModewiseSop)}
					loading={loading}
				>
					Submit
				</Button>
			</div>
		</div>
	);
}

export default AddNotes;
