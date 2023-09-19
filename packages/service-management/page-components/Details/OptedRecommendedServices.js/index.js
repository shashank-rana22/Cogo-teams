import { v1 as uuid } from 'uuid';

import ComponentMapping from './ComponentMapping';
import styles from './styles.module.css';

function OptedRecommendedServices({ selected = [], service = '' }) {
	return (
		<div className={styles.container}>
			<h5>Added Recommended Services</h5>
			<div>
				{selected?.map((item, index) => (
					<div className={styles.card} key={`${`${index}${uuid()}`}`}>
						<ComponentMapping service={service} item={item} />
					</div>
				))}
			</div>
		</div>
	);
}
export default OptedRecommendedServices;
