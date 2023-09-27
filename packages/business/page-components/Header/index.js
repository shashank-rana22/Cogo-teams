import ScopeSelect from '@cogoport/scope-select';

import CreateBusiness from '../CreateBusiness';

import Filters from './Filters';
import styles from './styles.module.css';

function Header({ filters = () => {}, setFilters = () => {}, refetch = () => {}, apiTrigger = () => {} }) {
	return (

		<div className={styles.header}>
			<h1 className={styles.title}>Business</h1>

			<div className={styles.btn_align}>
				<Filters filters={filters} setFilters={setFilters} />
				<ScopeSelect size="md" showChooseAgent={false} />
				<CreateBusiness refetch={refetch} apiTrigger={apiTrigger} />
			</div>
		</div>

	);
}

export default Header;
