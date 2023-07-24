import Filters from './Filters';
import Header from './Header';
import styles from './styles.module.css';
import Tab from './Tab';

function PageView() {
	return (
		<div>
			<Header />
			<div className={styles.secondary_header}>
				<Tab />
				<Filters />
			</div>
		</div>
	);
}
export default PageView;
