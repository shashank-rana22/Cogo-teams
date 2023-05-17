import { Accordion, Pill, Button } from '@cogoport/components';
import { IcMCrossInCircle, IcMDelete, IcMDrag, IcMEdit } from '@cogoport/icons-react';

import LoadingState from '../../../../../../../../../../commons/LoadingState';
import { getFieldController } from '../../../../../../../../commons/getFieldController';
import SubModule from '../components/SubModule';

import controls from './controls';
import styles from './styles.module.css';
import useHandleModule from './useHandleModule';

function ModuleComponent({
	module,
	handleDragStart,
	handleDragOver,
	handleDrop,
	nodeIndex,
	id,
	getLoading,
	setFinalData,
	getCourseModuleDetails,
	getSubModuleRefetch,
	setGetSubModuleRefetch,
	finalData,
}) {
	const {
		deleteModule,
		moduleLoading,
		handleSubmit,
		control,
		errors,
		onSubmit,
		hideEditComponent,
		showModule,
		setShowModule,
		deleteLoading,
	} = useHandleModule({
		getLoading,
		setFinalData,
		getCourseModuleDetails,
		module,
		nodeIndex,
		id,
		finalData,
	});

	if (deleteLoading) {
		return <LoadingState />;
	}

	if (module.isNew || showModule.includes(module.id)) {
		return (
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={`${styles.module} ${
					showModule.includes(module.id) && styles.edit
				} ${module.isNew && styles.new}`}
			>
				{showModule.includes(module.id) ? (
					<div className={styles.edit_text}>
						Edit - Module
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

				{showModule.includes(module.id) ? (
					<IcMCrossInCircle
						width={16}
						height={16}
						className={styles.cross_icon}
						onClick={hideEditComponent}
					/>
				) : null}

				<div className={`${styles.button_container} ${module.isNew && styles.new}`}>
					<Button loading={moduleLoading} type="submit" size="sm">Save</Button>

					<IcMDelete
						onClick={() => deleteModule({
							id     : module.id,
							isNew  : module.isNew || false,
							length : finalData.length,
						})}
						className={`${styles.left} ${styles.icon}`}
					/>
				</div>
			</form>
		);
	}

	return (
		<div className={styles.child_accordian}>
			<Accordion
				type="text"
				title={(
					<div
						key={module.id}
						draggable
						onDragStart={(event) => handleDragStart(event, { ...module, type: 'module' }, 'module')}
						onDragOver={(event) => handleDragOver(event)}
						onDrop={(event) => handleDrop(event, { ...module, type: 'module' }, 'module')}
						className={`${styles.module} ${styles.flex}`}
					>
						<IcMDrag className={styles.icon} />
						<div className={`${styles.left} ${styles.flex}`}>
							{`Module ${nodeIndex + 1}:`}
							{' '}
							<b className={styles.name}>{module.name}</b>
						</div>

						<IcMEdit
							onClick={() => setShowModule((prev) => ([...prev, module.id]))}
							className={`${styles.left} ${styles.icon}`}
						/>

						<Pill
							style={{ marginLeft: '16px' }}
							size="sm"
							color={module.isNew ? '#df8b00' : '#98FB98'}
						>
							{module.isNew ? 'unsaved' : 'saved'}
						</Pill>
					</div>
				)}
			>
				{module.course_sub_modules && !module.isNew && (
					<SubModule
						module={module}
						handleDragStart={handleDragStart}
						handleDragOver={handleDragOver}
						handleDrop={handleDrop}
						id={id}
						course_module_id={module.id}
						getLoading={getLoading}
						getCourseModuleDetails={getCourseModuleDetails}
						getSubModuleRefetch={getSubModuleRefetch}
						setGetSubModuleRefetch={setGetSubModuleRefetch}
					/>
				)}
			</Accordion>
		</div>
	);
}

export default ModuleComponent;
