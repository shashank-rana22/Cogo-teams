import React from 'react';

import Read from './Read';
import Write from './Write';

function Frontside({
	mode = 'read',
	setaddAnnexure = () => {},
	addAnnexure = false,
	control,
	initialValues = {},
	watermark = null,
}) {
	const isReadonly = mode === 'read';

	return isReadonly ? (
		<Read defaultValues={initialValues} />
	) : (
		<Write
			isReadonly={isReadonly}
			control={control}
			setaddAnnexure={setaddAnnexure}
			addAnnexure={addAnnexure}
			watermark={watermark}
		/>
	);
}

export default Frontside;
