import { IcMArrowRight } from '@cogoport/icons-react';

import LoadingState from '../../../../../commons/LoadingState';

import CategoryCard from './CategoryCard';
import styles from './styles.module.css';

function RightComponent({ data = {}, listLoading }) {
	const { list = [] } = data || {};

	if (listLoading) {
		return <LoadingState rowsCount={3} />;
	}

	return (
		<div className={styles.container}>
			{list.map((item, index) => {
				if (index < 8) {
					return <CategoryCard item={item} key={item.id} />;
				} if (index === 8) {
					return (
						<div className={styles.see_all}>
							<div>
								See All
								{'  '}
							</div>

							<IcMArrowRight width={18} height={18} />
						</div>
					);
				}
				return null;
			})}
		</div>
	);
}

export default RightComponent;
