import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMCrossInCircle, IcMDelete, IcMDrag, IcMEdit } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import { getFieldController } from '../../../../../../../../../../commons/getFieldController';

import controls from './controls';
import styles from './styles.module.css';

function SubModuleComponent({
	subModule,
	deleteModule,
	handleDragStart,
	handleDragOver,
	handleDrop,
	nodeIndex,
	onSaveSubModule,
	course_module_id,
	deleteSubModule,
}) {
	const [showSubModule, setShowSubModule] = useState([]);

	const {
		control,
		formState: { errors = {} },
		handleSubmit,
		setValue,
	} = useForm();

	const onSubmit = (values) => {
		const { isNew = false, id = '' } = subModule || {};

		const payloadValues = {
			...values,
			sequence_order: nodeIndex,
			...(isNew ? { course_module_id } : { id }),
		};

		onSaveSubModule({ values: payloadValues, subModule });
	};

	const hideEditComponent = () => {
		setShowSubModule((prev) => prev.filter((item) => item !== subModule.id));
	};

	useEffect(() => {
		if (!subModule.isNew) {
			setValue('name', subModule.name);
			setValue('description', subModule.description);
		}
	}, [subModule, setValue]);

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

				<div className={styles.button_container}>
					<Button type="submit" size="sm">
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
			<IcMDelete
				onClick={() => deleteModule({ id: subModule.id, isNew: subModule.isNew || false })}
				className={`${styles.left} ${styles.icon}`}
			/>
		</div>
	);
}

export default SubModuleComponent;
