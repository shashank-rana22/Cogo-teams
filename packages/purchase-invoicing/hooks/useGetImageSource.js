import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState, useEffect } from 'react';

import toastApiError from '../utils/toastApiError';

const useGetImageSource = () => {
	const [imageSrc, setImageSrc] = useState('');

	const fetchImageData = async ({ url = '', setterFunc }) => {
		try {
			const response = await fetch(url);
			const blobData = await response.blob();
			const reader = new FileReader();
			reader.readAsDataURL(blobData);
			reader.onloadend = () => {
				const base64data = reader.result;
				setterFunc(base64data);
			};
		} catch (err) {
			toastApiError(err);
		}
	};
	useEffect(() => {
		fetchImageData({ url: GLOBAL_CONSTANTS.image_url.cogo_logo, setterFunc: setImageSrc });
	}, []);

	return { fetchImageData, imageSrc };
};
export default useGetImageSource;
