import { Input, Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function SearchContainer({
	searchValue,
	setSearchValue,
	handleClick,
	loading,
}) {
	const { t } = useTranslation(['athenaDashboard']);

	return (
		<div className={styles.search_container}>
			<Input
				size="sm"
				placeholder={t('athenaDashboard:search_here_placeholder')}
				onChange={setSearchValue}
				value={searchValue}
			/>
			<Button
				size="md"
				themeType="primary"
				onClick={handleClick}
				disabled={loading}
			>
				{t('athenaDashboard:search_button')}
			</Button>
		</div>
	);
}
export default SearchContainer;
