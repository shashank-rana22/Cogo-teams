import { Button } from '@cogoport/components';
import ScopeSelect from '@cogoport/scope-select';
import { useTranslation } from 'next-i18next';

import Filter from '../Filters';

import styles from './styles.module.css';

function Header({ setFilters = () => {}, filters = {}, setSideBar = () => {} }) {
	const { t } = useTranslation(['locations']);
	return (
		<div className={styles.header_container}>

			<h1>{t('locations:locations_heading')}</h1>
			<div className={styles.btn_align}>
				<Filter setFilters={setFilters} filters={filters} activeTab={filters.type} />
				<ScopeSelect size="md" showChooseAgent={false} />
				<Button onClick={() => setSideBar('create')}>{t('locations:create_location')}</Button>

			</div>
		</div>
	);
}

export default Header;
