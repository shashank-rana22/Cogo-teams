import { useForm, UploadController } from '@cogoport/forms';
import { forwardRef, useImperativeHandle } from 'react';

function UploadProof(props, ref) {
	const { control, handleSubmit } = useForm();

	useImperativeHandle(ref, () => ({ handleSubmit }));

	return (
		<UploadController
			name="upload_proof"
			control={control}
			accept="image/*,.pdf,.csv,.xlsx,.doc,.docx,application/
				msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
		/>
	);
}

export default forwardRef(UploadProof);
