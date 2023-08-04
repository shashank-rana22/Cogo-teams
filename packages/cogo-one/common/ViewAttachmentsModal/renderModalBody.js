import React from 'react';

import styles from './styles.module.css';

export function ImageBody({
	media_url = '',
	contentType = '',
}) {
	// fixed height and width cant be given here.
	// can be handled only by max-width and max-height.
	// so using img tag instead of Image from @cogoport/next
	return (
		<img
			src={media_url}
			alt={contentType}
			className={styles.image_styles}
		/>
	);
}

export function AudioBody({
	media_url = '',
	contentType = '',
}) {
	return (
		<audio
			controls
			className={styles.video_styles}
		>
			<source src={media_url} type={contentType} />
		</audio>
	);
}

export function VideoBody({
	contentType = '',
	media_url = '',
}) {
	return (
		<video
			controls
			className={styles.video_styles}
		>
			<source src={media_url} type={contentType} />
		</video>
	);
}

export function ObjectBody({ media_url = '' }) {
	return (
		<object
			className={styles.media_styles}
			aria-label="Doc Preview"
			data={media_url}
		/>
	);
}
