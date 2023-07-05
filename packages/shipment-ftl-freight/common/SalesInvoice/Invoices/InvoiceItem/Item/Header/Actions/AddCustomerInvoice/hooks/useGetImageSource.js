/* eslint-disable max-len */
import { Toast } from '@cogoport/components';
import { useEffect, useState } from 'react';

const LOGO_URL = 'https://cogoport-testing.sgp1.digitaloceanspaces.com/782ace87c99f4b4192741a3df89d4efb/Screenshot%202023-05-10%20at%2010.03.20%20AM.png';

const STAMP_URL = 'https://cogoport-testing.sgp1.digitaloceanspaces.com/b8726742e426c9ef54cbd08dcc30d362/Screenshot%202023-05-10%20at%2010.23.17%20AM.png';

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
		Toast.error('Something went wrong');
	}
};

const useGetImageSource = () => {
	const [logoData, setLogoData] = useState();
	const [stampData, setStampData] = useState();

	useEffect(() => {
		fetchImageData({ url: LOGO_URL, setterFunc: setLogoData });
		fetchImageData({ url: STAMP_URL, setterFunc: setStampData });
	}, []);

	return {
		logoData,
		stampData,
	};
};

export default useGetImageSource;
