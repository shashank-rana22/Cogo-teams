import { Input, Button } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';

import AssignPlanModal from './AssignPlanModal';
import styles from './styles.module.css';

function FilterContainer({ setGlobalFilters, refetchUserStats, refectUserList }) {
	const { t } = useTranslation(['saasSubscription']);

	const { debounceQuery, query } = useDebounceQuery();
	const [searchTerm, setSearchTerm] = useState('');
	const [openPlanModal, setOpenPlanModal] = useState(false);

	useEffect(() => {
		if (query !== null && query !== undefined) {
			setGlobalFilters((prev) => ({
				...prev,
				page   : 1,
				search : query,
			}));
			refetchUserStats(query);
		}
	}, [query, refetchUserStats, setGlobalFilters]);

	useEffect(() => {
		if (searchTerm !== null && searchTerm !== undefined) {
			debounceQuery(searchTerm);
		}
	}, [debounceQuery, searchTerm]);

	return (
		<div className={styles.container}>
			<h2>{t('saasSubscription:customer_title')}</h2>
			<div className={styles.flex_box}>
				<Input
					size="sm"
					placeholder={t('saasSubscription:filter_placeholder')}
					prefix={<IcMSearchlight />}
					value={searchTerm}
					onChange={setSearchTerm}
					className={styles.input_box}
				/>
				<Button
					themeType="accent"
					type="button"
					onClick={() => setOpenPlanModal((prev) => !prev)}
				>
					{t('saasSubscription:assign_plan')}
				</Button>
			</div>

			{openPlanModal && (
				<AssignPlanModal
					openPlanModal={openPlanModal}
					setOpenPlanModal={setOpenPlanModal}
					refectUserList={refectUserList}
				/>
			)}
		</div>
	);
}

export default FilterContainer;
