import { forwardRef, useRef, useImperativeHandle } from 'react';

import DetailsForm from './DetailsForm';

function CargoArrivalNotice(
	{ initialValues, service_type },
	ref,
) {
	const refFront = useRef({});

	useImperativeHandle(ref, () => ({
		handleSubmit: refFront?.current?.submit?.handleSubmit,
	}));

	return (
		<div>
			<DetailsForm
				ref={(r) => {
					refFront.current.submit = r;
				}}
				initialValues={initialValues}
				service_type={service_type}
			/>
		</div>
	);
}

export default forwardRef(CargoArrivalNotice);
