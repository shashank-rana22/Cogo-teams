import React from 'react';

import styles from './styles.module.css';

function RenderLink({ text, url }) {
	return <a className={styles.link} href={url} target="_blank" rel="noreferrer">{text}</a>;
}

export default RenderLink;
