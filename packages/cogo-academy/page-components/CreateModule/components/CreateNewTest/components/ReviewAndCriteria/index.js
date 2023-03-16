import { Pill } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';

import QuestionsAndDistribution from './components/QuestionsAndDistribution';
import styles from './styles.module.css';

function ReviewAndCriteria() {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<IcMArrowBack width={20} height={20} />
				<div className={styles.title}> Review and Set Criteria </div>
			</div>
			<div className={styles.subcontainer}>
				<div className={styles.label}>Shipment and Enrichment Test</div>
				<div className={styles.topic}>
					<div className={styles.subtopic}>Topics </div>
					<div>
						<Pill size="md" color="blue" className={styles.names}>
							<span className={styles.names}>Enrichments</span>
						</Pill>
						<Pill size="md" color="blue">
							<span className={styles.names}>Shipment</span>
						</Pill>
					</div>
				</div>
				<div className={styles.entity}>
					<div className={styles.label_entity}>Cogo Entity </div>
					<div className={styles.entity_name}>Cogo India</div>
				</div>
				<div className={styles.topic}>
					<div className={styles.subtopic}> Users </div>
					<div>
						<Pill size="md" color="#FEF3E9" className={styles.names}>
							<span className={styles.names}>KAM 1</span>
						</Pill>
						<Pill size="md" color="#FEF3E9">
							<span className={styles.names}>KAM 2</span>
						</Pill>
					</div>
				</div>
			</div>
			<QuestionsAndDistribution />
		</div>
	);
}

export default ReviewAndCriteria;
