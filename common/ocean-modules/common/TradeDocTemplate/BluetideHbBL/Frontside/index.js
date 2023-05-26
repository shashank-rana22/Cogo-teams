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
	setValue = () => {},
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
			initialValues={initialValues}
			watermark={watermark}
			setValue={setValue}
		/>
	);
}

export default Frontside;
