import { Input, Button } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import AssignPlanModal from './AssignPlanModal';
import styles from './styles.module.css';

function FilterContainer({ setGlobalFilters, refetchUserStats, refectUserList }) {
	const [searchTerm, setSearchTerm] = useState();
	const [openPlanModal, setOpenPlanModal] = useState(false);
	const { debounceQuery, query } = useDebounceQuery();

	useEffect(() => {
		if (query !== null) {
			setGlobalFilters((prev) => ({
				...prev,
				page   : 1,
				search : query,
			}));
			refetchUserStats(query);
		}
	}, [query]);

	useEffect(() => {
		if (searchTerm !== null) {
			debounceQuery(searchTerm);
		}
	}, [searchTerm]);

	return (
		<div className={styles.container}>
			<h2>Customer</h2>
			<div className={styles.flex_box}>
				<Input
					size="sm"
					placeholder="Search By Id"
					prefix={<IcMSearchlight />}
					value={searchTerm}
					onChange={setSearchTerm}
					className={styles.input_box}
				/>
				<Button themeType="accent" onClick={() => setOpenPlanModal((prev) => !prev)}>Assign Plan</Button>
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
