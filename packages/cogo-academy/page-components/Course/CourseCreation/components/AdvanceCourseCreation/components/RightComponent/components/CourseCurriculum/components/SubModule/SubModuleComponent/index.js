import { Pill, Button } from '@cogoport/components';
import { IcMCrossInCircle, IcMDelete, IcMDrag, IcMEdit } from '@cogoport/icons-react';

import { getFieldController } from '../../../../../../../../../../commons/getFieldController';

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
	} = useHandleSubModuleComponent({
		onSaveSubModule,
		subModule,
		course_id,
		nodeIndex,
		course_module_id,
		setCourseSubModule,
	});

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

				<div className={`${styles.button_container} ${subModule.isNew && styles.new}`}>
					<Button loading={subModuleLoading} type="submit" size="sm">
						Save
					</Button>

					<IcMDelete
						onClick={() => deleteSubModule({ subModule })}
						className={`${styles.left} ${styles.icon}`}
					/>
				</div>
			</form>
		);
	}

	return (
		<div
			key={subModule.id}
			draggable
			onDragStart={(event) => handleDragStart(event, subModule, false)}
			onDragOver={(event) => handleDragOver(event)}
			onDrop={(event) => handleDrop(event, subModule, false)}
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
			{/* <IcMDelete
				onClick={() => deleteModule({ id: subModule.id, isNew: subModule.isNew || false })}
				className={`${styles.left} ${styles.icon}`}
			/> */}

			<Pill
				style={{ marginLeft: '16px' }}
				size="sm"
				color={subModule.isNew ? '#df8b00' : '#45f829'}
			>
				{subModule.isNew ? 'unsaved' : 'saved'}
			</Pill>
		</div>
	);
}

export default SubModuleComponent;
