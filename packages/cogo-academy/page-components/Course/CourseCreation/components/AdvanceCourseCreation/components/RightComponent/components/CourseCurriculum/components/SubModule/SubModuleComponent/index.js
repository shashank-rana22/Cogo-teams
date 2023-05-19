import { Accordion, Pill, Button } from '@cogoport/components';
import { IcMCrossInCircle, IcMDelete, IcMDrag, IcMEdit } from '@cogoport/icons-react';

import { getFieldController } from '../../../../../../../../../../commons/getFieldController';
import LoadingState from '../../../../../../../../../../commons/LoadingState';
import Chapter from '../../Chapter';

import controls from './controls';
import styles from './styles.module.css';
import useHandleSubModuleComponent from './useHandleSubModuleComponent';

function SubModuleComponent({
	subModule,
	handleDragStart,
	handleDragOver,
	handleDrop,
	nodeIndex,
	onSaveSubModule,
	course_module_id,
	setCourseSubModule,
	id: course_id,
	subModuleLoading,
	getLoading,
	getCourseModuleDetails,
	getSubModuleRefetch,
	setGetSubModuleRefetch,
	courseSubModule,
	showButtons,
}) {
	const {
		handleSubmit,
		control,
		errors,
		onSubmit,
		showSubModule,
		deleteSubModule,
		hideEditComponent,
		setShowSubModule,
		deleteLoading,
	} = useHandleSubModuleComponent({
		onSaveSubModule,
		subModule,
		course_id,
		nodeIndex,
		course_module_id,
		setCourseSubModule,
		getCourseModuleDetails,
		courseSubModule,
	});

	if (deleteLoading) {
		return <LoadingState rowsCount={2} />;
	}

	if (subModule.isNew || showSubModule.includes(subModule.id)) {
		return (
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={`${styles.module} ${showSubModule.includes(subModule.id) && styles.edit}`}
			>
				{showSubModule.includes(subModule.id) ? (
					<div className={styles.edit_text}>
						Edit - Sub Module
						{' '}
						{nodeIndex + 1}
					</div>
				) : null}

				<div className={styles.input_container}>
					{controls.map((controlItem) => {
						const { type, label, name } = controlItem || {};

						const Element = getFieldController(type);

						if (!Element) return null;

						return (
							<div
								key={name}
								className={`${styles.select_container} ${styles[name]}`}
							>
								<div className={styles.label}>{label}</div>

								<Element
									{...controlItem}
									key={name}
									control={control}
									id={`${name}_input`}
								/>

								{errors?.[name]?.message ? (
									<div className={styles.error_message}>
										{errors?.[name]?.message}
									</div>
								) : null}
							</div>
						);
					})}
				</div>

				{showSubModule.includes(subModule.id) ? (
					<IcMCrossInCircle
						width={16}
						height={16}
						className={styles.cross_icon}
						onClick={hideEditComponent}
					/>
				) : null}

				{showButtons ? (
					<div className={`${styles.button_container} ${subModule.isNew && styles.new}`}>
						<Button loading={subModuleLoading} type="submit" size="sm">
							Save
						</Button>

						<IcMDelete
							onClick={() => deleteSubModule({ length: courseSubModule.length })}
							className={`${styles.left} ${styles.icon}`}
						/>
					</div>
				) : null}
			</form>
		);
	}

	return (
		<div className={styles.child_accordian}>
			<Accordion
				type="text"
				title={(
					<div
						key={subModule.id}
						draggable={showButtons}
						onDragStart={(event) => handleDragStart(
							event,
							{ ...subModule, type: 'sub_module', start_course_module_id: course_module_id },
							'sub_module',
						)}
						onDragOver={(event) => handleDragOver(event)}
						onDrop={(event) => handleDrop(
							event,
							{ ...subModule, type: 'sub_module', drop_course_module_id: course_module_id },
							'sub_module',
						)}
						className={`${styles.module} ${styles.flex}`}
					>
						<IcMDrag className={styles.icon} />
						<div className={`${styles.left} ${styles.flex}`}>
							{`Sub Module ${nodeIndex + 1}:`}
							{' '}
							<b className={styles.name}>{subModule.name}</b>
						</div>

						<IcMEdit
							onClick={() => setShowSubModule((prev) => ([...prev, subModule.id]))}
							className={`${styles.left} ${styles.icon}`}
						/>

						<Pill
							style={{ marginLeft: '16px' }}
							size="sm"
							color={subModule.isNew ? '#df8b00' : '#98FB98'}
						>
							{subModule.isNew ? 'unsaved' : 'saved'}
						</Pill>
					</div>
				)}
			>
				{!subModule.isNew && (
					<Chapter
						subModule={subModule}
						handleDragStart={handleDragStart}
						handleDragOver={handleDragOver}
						handleDrop={handleDrop}
						getLoading={getLoading}
						getCourseModuleDetails={getCourseModuleDetails}
						getSubModuleRefetch={getSubModuleRefetch}
						setGetSubModuleRefetch={setGetSubModuleRefetch}
						showButtons={showButtons}
					/>
				)}
			</Accordion>
		</div>

	);
}

export default SubModuleComponent;
