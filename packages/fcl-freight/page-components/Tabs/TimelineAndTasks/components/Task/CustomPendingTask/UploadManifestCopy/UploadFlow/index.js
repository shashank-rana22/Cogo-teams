import { FormLayout } from '@cogo/app-common';
import { useForm } from '@cogo/deprecated_legacy/forms';
import { forwardRef, useImperativeHandle } from 'react';
import controls from './controls';

const UploadFlow = (props, ref) => {
	const { fields, getValues } = useForm(controls);

	useImperativeHandle(ref, () => ({ submit: getValues }), [getValues]);

	return (
		<div>
			<FormLayout
				controls={controls}
				fields={fields}
				themeType="new new-isolated"
				id_prefix="bm_pt_upload_manifest_copy"
			/>
		</div>
	);
};

export default forwardRef(UploadFlow);
