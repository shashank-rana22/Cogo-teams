import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import Filter from './Filter';
import styles from './styles.module.css';

function Header({ filters = {}, setFilters = () => {}, setPage = () => {} }) {
	const router = useRouter();

	const handleClick = () => {
		router.push(
			'/centralised-customer-service/create-config',
			'/centralised-customer-service/create-config',
		);
	};

	return (
		<div className={styles.container}>

			<div className={styles.inner_container}>
				<Filter filters={filters} setFilters={setFilters} setPage={setPage} />
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
