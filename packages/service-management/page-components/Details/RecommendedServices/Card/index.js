import { Checkbox } from '@cogoport/components';
import { v1 as uuid } from 'uuid';

import ComponentMapping from '../../OptedRecommendedServices.js/ComponentMapping';

import styles from './styles.module.css';

const ONE = 1;
function Card({ service = '', newData = [], selected = [], handleSelect = () => {} }) {
	return (
		<div className={styles.section}>
			{newData?.map((item, index) => (
				<div className={styles.container} key={`${`${index}${uuid()}`}`}>
					<Checkbox
						checked={selected.findIndex((s) => s.id === item.id) !== -ONE}
						onChange={(e) => handleSelect(e, item)}
					/>
					<ComponentMapping item={item} service={service} />
				</div>
			))}
		</div>
	);
}

export default Card;
