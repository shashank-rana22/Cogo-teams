import { forwardRef, useRef, useImperativeHandle } from 'react';

import Frontside from './Frontside';

function CargoArrivalNotice(
	{ noFormat, initialValues, mode, service_type },
	ref,
) {
	const refFront = useRef({});

	useImperativeHandle(ref, () => ({
		handleSubmit: refFront?.current?.submit?.handleSubmit,
	}));

	return (
		<div>
			<Frontside
				noFormat={noFormat}
				ref={(r) => {
					refFront.current.submit = r;
				}}
				initialValues={initialValues}
				mode={mode}
				service_type={service_type}
			/>
		</div>
	);
}

export default forwardRef(CargoArrivalNotice);
