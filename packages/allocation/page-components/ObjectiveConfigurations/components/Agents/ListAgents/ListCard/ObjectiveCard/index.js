import { Accordion } from '@cogoport/components';

import styles from './styles.module.css';

function ObjectiveCard() {
	return <Accordion className={styles.accordian} type="text" title="Text Accordion" />;
}

export default ObjectiveCard;
