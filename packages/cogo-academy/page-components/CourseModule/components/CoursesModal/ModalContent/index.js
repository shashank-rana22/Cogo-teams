import { Modal } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import LoadingState from '../../../../../commons/LoadingState';

import LeftComponent from './components/LeftComponent';
import RightComponent from './components/RightComponent';
import styles from './styles.module.css';
import useListCourseUserMappings from './useListCourseUserMappings';

function ModalContent({ finalCourseCategories, loading }) {
	const { user:{ id: user_id } } = useSelector((state) => state.profile);

	const [currentCategory, setCurrentCategory] = useState('all_courses');
	const [params, setParams] = useState({
		page    : 1,
		filters : {
			status: 'active',
			user_id,
		},
	});

	const {
		data,
		loading: listLoading,
		fetchList,
	} = useListCourseUserMappings({ activeTab: currentCategory, params });

	if (loading) {
		return (
			<div style={{ margin: '20px' }}>
				<LoadingState rowsCount={3} />
			</div>
		);
	}

	return (
		<Modal.Body className={styles.preview_modal_body}>
			<div className={styles.left_component}>
				<LeftComponent
					currentCategory={currentCategory}
					setCurrentCategory={setCurrentCategory}
					finalCourseCategories={finalCourseCategories}
					fetchList={fetchList}
				/>
			</div>

			<div className={styles.right_component}>
				<RightComponent data={data} listLoading={listLoading} />
			</div>
		</Modal.Body>
	);
}

export default ModalContent;
