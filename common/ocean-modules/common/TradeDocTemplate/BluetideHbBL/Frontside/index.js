import React from 'react';

import Read from './Read';
import Write from './Write';

const MODE_READ = 'read';

function Frontside({
	mode = MODE_READ,
	setaddAnnexure = () => {},
	addAnnexure = false,
	control,
	initialValues = {},
	watermark = null,
}) {
	const isReadonly = mode === MODE_READ;

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
