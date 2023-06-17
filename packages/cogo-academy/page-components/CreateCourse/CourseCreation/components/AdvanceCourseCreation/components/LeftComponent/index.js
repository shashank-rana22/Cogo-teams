import { Accordion } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import LoadingState from '../../../../../commons/LoadingState';
import useUpdateCourse from '../../hooks/useUpdateCourse';

import MAPPING from './MAPPING';
import styles from './styles.module.css';

const STATE_MAPPING = ['overview', 'specification', 'curriculum', 'completion', 'audience', 'pre_publish'];

const VALUE_TO_INDEX_DIFF = 1;

function LeftComponent({ activeTab, setActiveTab, getCogoAcademyCourse, id, state }) {
	const { loading, updateCourse } = useUpdateCourse({
		getCogoAcademyCourse,
		setActiveTab,
		activeTab,
		changeTab: true,
		state,
	});

	const handleChangeActiveTab = ({ value }) => {
		let currIndex = 1;

		if (state !== 'published') {
			currIndex = STATE_MAPPING.findIndex((item) => item === activeTab);
		}

		const nextIndex = STATE_MAPPING.findIndex((item) => item === value);

		if (!loading && state !== 'published' && currIndex > nextIndex) {
			updateCourse({ values: { id, state: value } });
			return;
		}

		if (state === 'published') {
			setActiveTab(value);
		}
	};

	if (loading) {
		return <LoadingState rowsCount={4} small />;
	}

	return (
		<div className={styles.container}>
			{MAPPING.map((item, index) => {
				const { key, title, children } = item || {};

				if (isEmpty(children)) {
					return (
						<div
							key={key}
							role="presentation"
							onClick={() => handleChangeActiveTab({ value: key })}
							className={`${styles.ind_container} ${activeTab === key && styles.active_tab}`}
						>
							<div className={styles.number}>
								<div className={styles.index}>{index + VALUE_TO_INDEX_DIFF}</div>
							</div>
							<div>{title}</div>
						</div>
					);
				}

				const isActiveTab = children.map((childItem) => childItem.key).includes(activeTab);

				return (
					<div key={isActiveTab} className={`${styles.item} ${isActiveTab && styles.active_tab}`}>
						<Accordion
							type="text"
							isOpen={isActiveTab}
							title={(
								<div className={styles.flex}>
									<div className={styles.number}>
										<div className={styles.index}>{index + VALUE_TO_INDEX_DIFF}</div>
									</div>
									<div>{title}</div>
								</div>
							)}
						>
							{children.map((childItem) => {
								const { key:childKey, title:childTitle } = childItem || {};

								return (
									<div
										key={childKey}
										role="presentation"
										onClick={() => handleChangeActiveTab({ value: childKey })}
										className={`${styles.child_container}
                                         ${activeTab === childKey && styles.active}`}
									>
										{childTitle}
									</div>
								);
							})}
						</Accordion>
					</div>
				);
			})}
		</div>
	);
}

export default LeftComponent;
