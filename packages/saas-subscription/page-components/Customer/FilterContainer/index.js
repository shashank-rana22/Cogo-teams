import { Input, Button, ButtonIcon, Popover } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { IcMFilter, IcMSearchlight } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useState, useEffect, useRef } from 'react';

import AssignPlanModal from './AssignPlanModal';
import FilterPopover from './FilterPopover';
import styles from './styles.module.css';

function FilterContainer({ setGlobalFilters, refetchUserStats, refectUserList }) {
	const { t } = useTranslation(['saasSubscription']);

	const { debounceQuery, query } = useDebounceQuery();
	const initialRef = useRef(false);

	const [searchTerm, setSearchTerm] = useState('');
	const [showPopover, setShowPopover] = useState(false);
	const [openPlanModal, setOpenPlanModal] = useState(false);

	useEffect(() => {
		if (query !== null && query !== undefined && initialRef.current) {
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
					onChange={(e) => {
						setSearchTerm(e);
						initialRef.current = true;
					}}
					className={styles.input_box}
				/>

				<Popover
					content={(
						<FilterPopover
							setShowPopover={setShowPopover}
							setGlobalFilters={setGlobalFilters}
						/>
					)}
					visible={showPopover}
				>
					<ButtonIcon
						size="md"
						icon={<IcMFilter />}
						themeType="primary"
						onClick={() => setShowPopover(true)}
					/>
				</Popover>

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
