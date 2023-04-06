import React from 'react';

import styles from './styles.module.css';

interface ItemProps {
	urgencyTag:Array<string>
}
interface Props {
	item: number | object;
}
function RenderRibbon({ item }:Props) {
	return (

		<div className={styles.ribbon}><span>POPULAR</span></div>

	);
}

export default RenderRibbon;
