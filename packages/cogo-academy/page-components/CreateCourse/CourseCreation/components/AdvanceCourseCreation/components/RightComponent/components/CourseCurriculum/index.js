import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { forwardRef, useImperativeHandle } from 'react';

import EmptyState from '../../../../../../../commons/EmptyState';
import LoadingState from '../../../../../../../commons/LoadingState';
import CURRENT_TO_NEXT_MAPPING from '../../Header/CURRENT_TO_NEXT_MAPPING';

import ModuleComponent from './ModuleComponent';
import styles from './styles.module.css';
import useHandleCourseCurriculum from './useHandleCourseCurriculum';

function CourseCurriculum({ id, activeTab, mode }, ref) {
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
		showButtons,
	} = useHandleCourseCurriculum({ courseId: id, activeTab, mode });

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

	if (getLoading) {
		return <LoadingState />;
	}

	if (isEmpty(finalData)) {
		return (
			<div style={{ marginTop: '100px' }}>
				<EmptyState
					height={200}
					width={300}
					emptyText="No modules found"
					flexDirection="column"
					textSize={24}
				/>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<fieldset
				style={{ border: 'unset' }}
				disabled={mode === 'view'}
			>
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
							showButtons={showButtons}
						/>
					</div>
				))}

				{showButtons ? (
					<Button
						type="button"
						className={styles.button}
						themeType="secondary"
						onClick={() => addModule()}
						disabled={finalData[finalData.length - 1]?.isNew}
					>
						+ Module
					</Button>
				) : null}
			</fieldset>
		</div>
	);
}

export default forwardRef(CourseCurriculum);
