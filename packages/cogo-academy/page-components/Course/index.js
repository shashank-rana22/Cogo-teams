import { TabPanel, Tabs, Badge } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import Header from './components/Header';
import ListComponent from './components/ListComponent';
import SearchFilter from './components/SearchFilter';
import useListCogoAcademyCourses from './hooks/useListCogoAcademyCourses';
import useListCourseUserMappings from './hooks/useListCourseUserMappings';
import styles from './styles.module.css';

function Course() {
	const { query, push } = useRouter();

	const { activeTab: currentActiveTab, coursesTab } = query || {};

	const [activeTab, setActiveTab] = useState(currentActiveTab || 'courses');
	const [filters, setFilters] = useState({});

	const {
		data,
		loading,
		fetchList,
		setParams,
		params,
		debounceQuery,
		input,
		setInput,
	} = useListCogoAcademyCourses({ filters, activeTab });

	const {
		data: studentData,
		loading: studentListLoading,
		fetchList: studentListRefetch,
		setParams: setstudentListParams,
		params: studentListParams,
		debounceQuery: studentListDebounceQuery,
		input: studentListInput,
		setInput: setstudentListInput,
	} = useListCourseUserMappings({ filters, activeTab });

	const componentMapping = {
		courses: {
			key            : 'courses',
			title          : 'Courses',
			component      : ListComponent,
			componentProps : {
				data,
				loading,
				fetchList,
				setParams,
				activeTab,
				params,
			},
			filterProps: {
				debounceQuery,
				input,
				setInput,
				setParams,
				params,
			},
		},
		students: {
			key            : 'students',
			title          : 'Students',
			component      : ListComponent,
			componentProps : {
				data      : studentData,
				loading   : studentListLoading,
				fetchList : studentListRefetch,
				setParams : setstudentListParams,
				activeTab,
				params    : studentListParams,
			},
			filterProps: {
				debounceQuery : studentListDebounceQuery,
				input         : studentListInput,
				setInput      : setstudentListInput,
				setParams     : setstudentListParams,
				params        : studentListParams,
			},
		},
	};

	const handleChangeTab = (val) => {
		push(`/learning/course?activeTab=${val}`);

		setActiveTab(val);
	};

	return (
		<div className={styles.container}>
			<Header />

			<div className={styles.tabs_container}>
				<Tabs
					activeTab={activeTab}
					themeType="primary"
					onChange={handleChangeTab}
					fullWidth
				>
					{Object.values(componentMapping).map((tab) => {
						const { key, title, componentProps, filterProps } = tab;

						return (
							<TabPanel
								key={key}
								name={key}
								title={(
									<div className={styles.tab_title}>
										{title}
										<Badge color="red" size="md" text="100" style={{ marginLeft: '6px' }} />
									</div>
								)}
							>
								<>
									<SearchFilter {...filterProps} />

									<ListComponent {...componentProps} />
								</>
							</TabPanel>
						);
					})}
				</Tabs>
			</div>
		</div>
	);
}

export default Course;
