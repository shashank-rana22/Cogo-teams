import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import Filter from './Filter';
import SortComponent from './Sort';
import styles from './styles.module.css';

function Header({ filters = {}, setFilters = () => {} }) {
	const router = useRouter();

	const handleClick = () => {
		router.push(
			'/customer-service-desk-management/create-config',
			'/customer-service-desk-management/create-config',
		);
	};

	return (
		<div className={styles.container}>
			<h3>Existing Configurations</h3>

			<div className={styles.inner_container}>
				<Filter filters={filters} setFilters={setFilters} />
				<SortComponent />
				<Button
					size="md"
					themeType="primary"
					className={styles.btn}
					onClick={handleClick}
				>
					+ Create New Config.

				</Button>
			</div>

		</div>
	);
}

export default Header;
