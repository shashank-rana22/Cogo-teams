import { FormLayout } from '@cogo/app-common';
import { useForm } from '@cogo/deprecated_legacy/forms';
import { Button } from '@cogo/commons/components';
import controls from './controls';

const Form = ({ handleUploadHBL }) => {
	const { fields, getValues } = useForm(controls);
	const handleUploadSubmit = () => {
		const formValues = getValues();
		if (formValues) {
			handleUploadHBL(formValues);
		} else {
			// console.log('avsdjavsdjads', 2);
		}
	};

	return (
		<div marginBottom={10}>
			<FormLayout
				controls={controls}
				fields={fields}
				themeType="new new-isolated"
				id_prefix="bm_pt_draft_hbl_amend"
			/>
			<br />
			<Button
				style={{ marginLeft: 8 }}
				onClick={handleUploadSubmit}
				size="sm"
				id="bm_pt_draft_hbl_amend_save_form_btn"
			>
				Save
			</Button>
		</div>
	);
};

export default Form;
