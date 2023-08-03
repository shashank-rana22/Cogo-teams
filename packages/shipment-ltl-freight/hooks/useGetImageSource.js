import { useState, useEffect } from 'react';

const useGetImageSource = ({ imageURL }) => {
	const [imageSource, setImageSource] = useState('');

	// to get image source as base 64

	function toDataURL(url, callback) {
		const xhr = new XMLHttpRequest();
		xhr.onload = () => {
			const reader = new FileReader();

			reader.onloadend = () => {
				callback(reader.result);
			};

			reader.readAsDataURL(xhr.response);
		};
		xhr.open('GET', url);
		xhr.responseType = 'blob';
		xhr.send();
	}

	useEffect(() => {
		toDataURL(imageURL, (dataUrl) => {
			setImageSource(dataUrl);
		});
	}, [imageURL]);

	return { imageSource };
};

export default useGetImageSource;
