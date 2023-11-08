import { Accordion } from '@cogoport/components';

import AccordionContent from './AccordionContent';
import styles from './styles.module.css';

function AccordionTitle() {
	return (
		<div className={styles.container}>
			<div className={styles.important_div}>IMP</div>
			Spotline Booking Note and Current Rates
		</div>
	);
}

function SpotBookingInstructions({ shippingLines = [], loading = false, setValue = () => {} }) {
	return (
		<div className={styles.content}>
			<Accordion isOpen title={<AccordionTitle />}>
				<AccordionContent shippingLines={shippingLines} loading={loading} setValue={setValue} />
			</Accordion>
		</div>
	);
}

export default SpotBookingInstructions;
