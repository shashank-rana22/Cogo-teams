import { useRef, forwardRef, useImperativeHandle } from 'react';
import { toast } from '@cogoport/front/components/admin';
import Form from '../UploadHbl/form';
import getControls from './controls';

const MBLDetails = (props, ref) => {
	const { selectedMail, summary } = props || {};
	let newSummary = summary;
	if (selectedMail?.formatted?.length) {
		newSummary = selectedMail?.formatted[0];
	}
	const formRefs = useRef([]);
	const controls = getControls({ data: newSummary });

	let bls_count = summary?.bls_count;
	if (summary?.bl_category === 'hbl') {
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
				toast.error(item?.submitForm()?.e);
			} else {
				invoice_details.push(item?.submitForm());
			}
		});
		if (isAllFormsValid) {
			return invoice_details;
		}
		toast.error('Fill all forms');
		return null;
	};

	return (
		<div>
			{Array(bls_count)
				.fill(null)
				.map((n, i) => {
					return (
						<Form
							ref={(r) => {
								formRefs.current[i] = r;
							}}
							id={i}
							bl_type="MBL"
							controls={controls}
						/>
					);
				})}
		</div>
	);
};

export default forwardRef(MBLDetails);
