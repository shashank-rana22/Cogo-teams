import { Accordion } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import styles from './styles.module.css';

function ModuleNavigation() {
	// const { user:{ id: user_id } } = useSelector((state) => state.profile);

	// const [currentCategory, setCurrentCategory] = useState('all_courses');
	// const [params, setParams] = useState({
	// 	page    : 1,
	// 	filters : {
	// 		status: 'active',
	// 		user_id,
	// 	},
	// });

	// const {
	// 	data,
	// 	loading: listLoading,
	// 	fetchList,
	// } = useListCourseUserMappings({ activeTab: currentCategory, params });

	// if (loading) {
	// 	return (
	// 		<div style={{ margin: '20px' }}>
	// 			{/* <LoadingState rowsCount={3} /> */}
	// 		</div>
	// 	);
	// }

	return (
		<div className={styles.container}>
			<Accordion
				type="text"
				title="Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Sed"
				className={styles.module_accordion}
			>
				<Accordion type="text" title="Text Accordion" className={styles.submodule_accordion}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
					condimentum, nisl eget aliquam tincidunt, nunc nisl aliquam
				</Accordion>
			</Accordion>

			<Accordion type="text" title="Text Accordion" className={styles.module_accordion}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
				condimentum, nisl eget aliquam tincidunt, nunc nisl aliquam
			</Accordion>

			<Accordion type="text" title="Text Accordion" className={styles.module_accordion}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
				condimentum, nisl eget aliquam tincidunt, nunc nisl aliquam
			</Accordion>
		</div>
	);
}

export default ModuleNavigation;
