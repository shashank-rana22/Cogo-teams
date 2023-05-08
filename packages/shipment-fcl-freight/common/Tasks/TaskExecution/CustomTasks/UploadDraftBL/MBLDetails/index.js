import { useRef, forwardRef, useImperativeHandle } from 'react';

import Form from '../form';

import getControls from './controls';

function MBLDetails({ primaryService = {}, selectedMail = {} }, ref) {
	let newSummary = primaryService;
	if (selectedMail?.formatted?.length) {
		newSummary = selectedMail?.formatted[0];
	}
	const formRefs = useRef([]);
	const controls = getControls({ data: newSummary });

	let bls_count = primaryService?.bls_count;
	if (primaryService?.bl_category === 'hbl') {
		bls_count = 1;
	}

	const handleSubmit = async () => {
		const payload = [];
		const validationFlags = await Promise.all(formRefs.current.map(({ formTrigger }) => formTrigger()));
		const isFormValid = validationFlags.every((valid) => valid);

		if (isFormValid) {
			formRefs.current.forEach(({ getFormValues }) => {
				const val = getFormValues();
				payload.push(val);
			});
			return payload;
		}
		return null;
	};

	useImperativeHandle(ref, () => ({ submit: handleSubmit }));

	return (
		<>
			{Array(bls_count)
				.fill(null)
				.map((n, i) => (
					<Form
						ref={(r) => {
							formRefs.current[i] = r;
						}}
						id={i}
						bl_type="MBL"
						controls={controls}
					/>
				))}
		</>
	);
}

export default forwardRef(MBLDetails);
