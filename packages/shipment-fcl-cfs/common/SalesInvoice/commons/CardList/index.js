import { cl, Loader } from '@cogoport/components';

import Header from './CardHeader';
import CardItem from './Carditem';
import styles from './styles.module.css';

function List({
	fields = [],
	data = [],
	loading = false,
	showCode = false,
	detail = {},
	creditNote = false,
}) {
	return (
		<main className={cl`${styles.main} ${creditNote ? styles.creditNote : ''}`}>
			<Header fields={fields} showCode={showCode} detail={detail} />

			{loading
				? (
					<div className={styles.loading_wrapper}>
						<Loader />
					</div>
				)

				: (data || []).map((item) => (
					<CardItem
						key={item?.code}
						item={item}
						loading={loading}
						fields={fields}
					/>
				))}
		</main>
	);
}

export default List;
