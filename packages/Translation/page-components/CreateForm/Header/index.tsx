import React from 'react';

import styles from './styles.module.css';

interface Props {
	title: string;
}

function Heading({ title = '' }: Props) {
	return (
		<div className="heading_container">
			<h1 className={styles.title}>{title}</h1>
		</div>
	);
}

export default Heading;
