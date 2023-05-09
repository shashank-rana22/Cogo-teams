import React from 'react';

import Read from './Read';
import Write from './Write';

function Frontside({
	mode = 'read',
	setaddAnnexure = () => {},
	addAnnexure = false,
	control,
	initialValues = {},
}) {
	const isReadonly = mode === 'read';

	const osName = 'mac';
	const getReadOnlyData = () => {
		if (osName === 'windows') {
			return (
				<Read defaultValues={initialValues} />
			);
		}
		return (
			<Read defaultValues={initialValues} />
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
