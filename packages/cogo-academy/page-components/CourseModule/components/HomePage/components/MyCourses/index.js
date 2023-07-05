import { Button, Modal, TabPanel, Tabs } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import TABS_MAPPING from '../../../../configs/TABS_MAPPING';

import CourseContent from './CourseContent';
import LiveCourseModal from './LiveCourseModal';
import styles from './styles.module.css';

const AUTH_SUB_FUNCTION = 'tech';

function MyCourses({ user_id, setOngoingCategories, ongoingCategories }) {
	const { auth_role_data = {} } = useSelector((state) => state.profile);
	const { role_sub_functions = []	} = auth_role_data || {};

	const [activeTab, setActiveTab] = useState('ongoing');
	const [liveCourseModal, setLiveCourseModal] = useState(false);

	const isLiveCourseButtonVisible = role_sub_functions.includes(AUTH_SUB_FUNCTION);

	return (
		<div>
			<div className={styles.main_heading}>
				<div>My Courses</div>

				{isLiveCourseButtonVisible ? (
					<div>
						<Button
							size="md"
							themeType="secondary"
							onClick={() => setLiveCourseModal(true)}
						>
							View Live Sessions
						</Button>
					</div>
				) : null}
			</div>

			<div>
				<Tabs
					activeTab={activeTab}
					themeType="secondary"
					onChange={setActiveTab}
				>
					{TABS_MAPPING.map(({ name, title }) => (
						<TabPanel key={name} name={name} title={title}>
							<div className={styles.carousel_container}>
								<CourseContent
									user_id={user_id}
									activeTab={activeTab}
									ongoingCategories={ongoingCategories}
									setOngoingCategories={setOngoingCategories}
								/>
							</div>
						</TabPanel>
					))}
				</Tabs>
			</div>

			<Modal size="md" show={liveCourseModal} onClose={() => setLiveCourseModal(false)}>
				<Modal.Header title="Live Course Recordings" />

				<Modal.Body>
					<LiveCourseModal />
				</Modal.Body>

				<Modal.Footer>
					<Button
						onClick={() => setLiveCourseModal(false)}
						themeType="secondary"
					>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default MyCourses;
