import { RadioGroup, Pagination, Loader } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../../common/EmptyState';

import PreferenceCard from './PreferenceCard';
import styles from './styles.module.css';

function PreferencesData({
	list, listLoading, paginationData, getNextPage, CONFIGURATION_OPTIONS, radioValue, setRadioValue,
}) {
	const { page = 1, total_count = 0, page_limit = 0 } = paginationData;

	if (listLoading) {
		return <Loader themeType="primary" />;
	}

	if (!listLoading && isEmpty(list)) {
		return <EmptyState />;
	}

	return (
		<div className={styles.preferences_container}>
			<div className={styles.radio_container}>
				<div className={styles.radio_label}>Select All : </div>
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
