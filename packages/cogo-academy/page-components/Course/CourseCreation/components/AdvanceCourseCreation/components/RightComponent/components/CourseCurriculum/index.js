import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { forwardRef, useImperativeHandle } from 'react';

import LoadingState from '../../../../../../../commons/LoadingState';
import CURRENT_TO_NEXT_MAPPING from '../../Header/CURRENT_TO_NEXT_MAPPING';

import ModuleComponent from './ModuleComponent';
import styles from './styles.module.css';
import useHandleCourseCurriculum from './useHandleCourseCurriculum';

function CourseCurriculum({ id, activeTab }, ref) {
	const {
		handleDragStart,
		handleDrop,
		handleDragOver,
		finalData,
		addModule,
		getLoading,
		setFinalData,
		getCourseModuleDetails,
		getSubModuleRefetch,
		setGetSubModuleRefetch,
	} = useHandleCourseCurriculum({ courseId: id, activeTab });

	useImperativeHandle(ref, () => ({
		handleSubmit: () => {
			const onSubmit = () => ({
				hasError : false,
				values   : {
					id,
					state: CURRENT_TO_NEXT_MAPPING[activeTab],
				},
			});

			return new Promise((resolve) => { resolve(onSubmit()); });
		},
	}));

	if (getLoading || isEmpty(finalData)) {
		return <LoadingState />;
	}

	return (
		<div className={styles.container}>
			{finalData.map((module, nodeIndex) => (
				<div key={module.id} className={`${styles.module_container} ${module.isNew && styles.new}`}>
					<ModuleComponent
						nodeIndex={nodeIndex}
						module={module}
						handleDragStart={handleDragStart}
						handleDragOver={handleDragOver}
						handleDrop={handleDrop}
						id={id}
						getLoading={getLoading}
						setFinalData={setFinalData}
						getCourseModuleDetails={getCourseModuleDetails}
						getSubModuleRefetch={getSubModuleRefetch}
						finalData={finalData}
						setGetSubModuleRefetch={setGetSubModuleRefetch}
					/>
				</div>
			))}

			<Button
				type="button"
				className={styles.button}
				themeType="secondary"
				onClick={() => addModule()}
				disabled={finalData[finalData.length - 1].isNew}
			>
				+ Module
			</Button>
		</div>
	);
}

export default forwardRef(CourseCurriculum);
