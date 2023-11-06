import { Input, Button, Popover } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { IcMFilter, IcMSearchlight } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useState, useEffect, useRef } from 'react';

import AssignPlanModal from './AssignPlanModal';
import FilterPopover from './FilterPopover';
import styles from './styles.module.css';

function FilterContainer({ setGlobalFilters, refectUserList }) {
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
		}
	}, [query, setGlobalFilters]);

	useEffect(() => {
		if (searchTerm !== null && searchTerm !== undefined) {
			debounceQuery(searchTerm);
		}
	}, [debounceQuery, searchTerm]);

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>{t('saasSubscription:customer_title')}</h2>

			<div className={styles.flex_box}>
				<Popover
					className={styles.filter}
					content={(
						<FilterPopover
							setShowPopover={setShowPopover}
							setGlobalFilters={setGlobalFilters}
						/>
					)}
					visible={showPopover}
				>
					<div className={styles.filter_container}>
						<Button
							className={styles.filter_icon}
							themeType="secondary"
							onClick={() => setShowPopover((prev) => !prev)}
						>
							<IcMFilter width={15} height={15} />
						</Button>
					</div>
				</Popover>

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
