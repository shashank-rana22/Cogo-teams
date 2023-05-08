import { useForm } from '@cogoport/forms';
import React from 'react';

import Read from './read';
import Write from './write';

function Frontside({
	mode = 'read',
	setaddAnnexure = () => {},
	addAnnexure = false,
	control,
	initialValues = {},
}) {
	const isReadonly = mode === 'read';
	// const { control } = useForm();

	const osName = 'mac';
	const getReadOnlyData = () => {
		if (osName === 'windows') {
			return (
				<Read />
			);
		}
		return (
			<Read />
		);
	};

	return isReadonly ? (
		getReadOnlyData()
	) : (
		<Write
			isReadonly={isReadonly}
			control={control}
			setaddAnnexure={setaddAnnexure}
			addAnnexure={addAnnexure}
			initialValues={initialValues}
		/>
	);
}

export default Frontside;
