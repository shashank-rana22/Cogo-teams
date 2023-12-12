import dynamic from 'next/dynamic';
import React, { forwardRef } from 'react';

import useImageUploader from '../../hooks/useImageUploader';
// eslint-disable-next-line custom-eslint/import-from-react, import/no-unresolved
import 'suneditor/dist/css/suneditor.min.css';

// eslint-disable-next-line import/no-unresolved
const SunEditor = dynamic(() => import('suneditor-react'), {
	ssr: false,
});

function CustomSunEditor(props, ref) {
	const { messageLoading = false, ...rest } = props;

	const { onImageUploadBefore, disableRTE } = useImageUploader();

	return (
		<SunEditor
			{...rest}
			ref={ref}
			onImageUploadBefore={onImageUploadBefore}
			disable={disableRTE || messageLoading}
		/>
	);
}

export default forwardRef(CustomSunEditor);
