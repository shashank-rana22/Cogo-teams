import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMCrossInCircle, IcMDelete, IcMDrag, IcMEdit } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import { getFieldController } from '../../../../../../../../commons/getFieldController';

import controls from './controls';
import styles from './styles.module.css';

function ModuleComponent({
	module,
	deleteModule,
	handleDragStart,
	handleDragOver,
	handleDrop,
	nodeIndex,
	onSaveModule = () => {},
	id,
}) {
	const [showModule, setShowModule] = useState([]);

	const { control, formState:{ errors = {} }, handleSubmit, setValue } = useForm();

	const onSubmit = (values) => {
		const { isNew = false } = module || {};

		const payloadValues = { ...values, course_id: id, sequence_order: nodeIndex + 1 };

		onSaveModule({ values: payloadValues, module, isNew, setShowModule });
	};

	const hideEditComponent = () => {
		setShowModule((prev) => prev.filter((item) => item !== module.id));
	};

	useEffect(() => {
		if (!module.isNew) {
			setValue('name', module.name);
			setValue('description', module.description);
		}
	}, [module, setValue]);

	if (module.isNew || showModule.includes(module.id)) {
		return (
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={`${styles.module} ${showModule.includes(module.id) && styles.edit}`}
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

				<div className={styles.button_container}>
					<Button type="submit" size="sm">Save</Button>
					<IcMDelete
						onClick={() => deleteModule({ id: module.id, isNew: module.isNew || false })}
						className={`${styles.left} ${styles.icon}`}
					/>
				</div>
			</form>
		);
	}

	return (
		<div
			key={module.id}
			draggable
			onDragStart={(event) => handleDragStart(event, module, false)}
			onDragOver={(event) => handleDragOver(event)}
			onDrop={(event) => handleDrop(event, module, false)}
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
			<IcMDelete
				onClick={() => deleteModule({ id: module.id, isNew: module.isNew || false })}
				className={`${styles.left} ${styles.icon}`}
			/>
		</div>
	);
}

export default ModuleComponent;
