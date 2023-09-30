import { Checkbox } from '@cogoport/components';

import ComponentMapping from '../../OptedRecommendedServices/ComponentMapping';

import styles from './styles.module.css';

const NOT_FIND_INDEX = -1;

function Card({ service = '', newData = [], selected = [], handleSelect = () => {} }) {
	return (
		<div className={styles.section}>
			{newData?.map((item) => (
				<div className={styles.container} key={item}>
					<Checkbox
						checked={selected?.findIndex((s) => s?.id === item?.id) !== NOT_FIND_INDEX}
						onChange={(e) => handleSelect(e, item)}
					/>
					<ComponentMapping item={item} service={service} />
				</div>
			))}
		</div>
	);
}

export default Card;
