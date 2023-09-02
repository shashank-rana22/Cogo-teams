import { RadioGroup, Pagination, Loader } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import EmptyState from '../../../../../../../common/EmptyState';

import PreferenceCard from './PreferenceCard';
import styles from './styles.module.css';

function PreferencesData(props) {
	const { t } = useTranslation(['allocation']);

	const {
		list,
		listLoading,
		paginationData,
		getNextPage,
		CONFIGURATION_OPTIONS,
		radioValue,
		setRadioValue,
	} = props;

	const { page = 1, total_count = 0, page_limit = 0 } = paginationData;

	if (listLoading) {
		return (
			<div className={styles.spinner_container}>
				<Loader themeType="primary" />
				<p>{t('allocation:update_preferences_loading_text')}</p>
			</div>
		);
	}

	if (isEmpty(list)) {
		return <EmptyState />;
	}

	return (
		<div className={styles.preferences_container}>
			<div className={styles.radio_container}>
				<div className={styles.radio_label}>{t('allocation:select_all_label')}</div>
				<RadioGroup options={CONFIGURATION_OPTIONS} value={radioValue} onChange={setRadioValue} />
			</div>

			{list.map((preference) => <PreferenceCard key={preference.id} preference={preference} />)}

			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={getNextPage}
				/>
			</div>
		</div>
	);
}

export default PreferencesData;
