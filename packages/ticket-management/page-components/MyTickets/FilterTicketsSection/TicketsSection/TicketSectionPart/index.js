import TicketStructure from '../../../../../common/TicketStructure';

import styles from './styles.module.css';

function TicketsSectionPart({ label, data, handleScroll, loading }) {
	return (
		<div className={styles.tickets_section_part}>
			<div className={styles.status_heading}>{label}</div>
			<TicketStructure data={data} handleScroll={handleScroll} loading={loading} />
		</div>
	);
}

export default TicketsSectionPart;
