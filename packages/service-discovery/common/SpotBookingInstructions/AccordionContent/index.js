import NoteText from './NoteText';
import ShippingLines from './ShippingLines';
import styles from './styles.module.css';

function AccordionContent({ shippingLines = [], loading = false }) {
	return (
		<div className={styles.container}>
			<NoteText />

			<ShippingLines shippingLines={shippingLines} loading={loading} />
		</div>
	);
}

export default AccordionContent;
