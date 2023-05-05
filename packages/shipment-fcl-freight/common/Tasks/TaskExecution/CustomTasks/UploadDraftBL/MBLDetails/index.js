import Toast from '@cogoport/components';
import { useRef, forwardRef, useImperativeHandle } from 'react';

import Form from '../form';

import getControls from './controls';

function MBLDetails({ primaryService = {}, selectedMail = {} },ref) {
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

	useImperativeHandle(ref, () => ({ submit: handleSubmit }));

	const handleSubmit = () => {
		let isAllFormsValid = true;
		const invoice_details = [];

		(formRefs?.current || []).forEach((item) => {
			if (!item?.submitForm()) {
				isAllFormsValid = false;
			} else if (item?.submitForm()?.e) {
				Toast.error(item?.submitForm()?.e);
			} else {
				invoice_details.push(item?.submitForm());
			}
		});
		if (isAllFormsValid) {
			return invoice_details;
		}
		Toast.error('Fill all forms');
		return null;
	};

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
