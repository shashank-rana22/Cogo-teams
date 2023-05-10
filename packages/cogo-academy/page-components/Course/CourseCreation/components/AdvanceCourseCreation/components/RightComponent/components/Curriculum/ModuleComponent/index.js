import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMDelete, IcMDrag, IcMEdit } from '@cogoport/icons-react';
import { useState } from 'react';

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
}) {
	const [showModule, setShowModule] = useState([]);

	const { control, formState:{ errors = {} }, handleSubmit } = useForm();

	const onSubmit = (values) => {
		const { isNew = false } = module || {};

		onSaveModule({ values, module, isNew, setShowModule });
	};

	console.log('errors', showModule);

	if (module.isNew || showModule.includes(module.id)) {
		return (
			<form onSubmit={handleSubmit(onSubmit)} className={styles.module}>
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
			className={styles.module}
		>
			<IcMDrag className={styles.icon} />
			<div className={`${styles.left} ${styles.flex}`}>
				{`Module ${nodeIndex + 1}:`}
				{' '}
				<b className={styles.name}>{module.module_name}</b>
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
