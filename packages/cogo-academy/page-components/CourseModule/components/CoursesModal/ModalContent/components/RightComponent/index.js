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
			{list.map((item) => <CategoryCard item={item} />)}
		</div>
	);
}

export default RightComponent;
