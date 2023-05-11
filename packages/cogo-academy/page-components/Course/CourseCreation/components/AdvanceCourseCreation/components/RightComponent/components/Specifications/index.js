import { useState } from 'react';

import FieldArray from '../../../../../../../commons/FieldArray';
import { getFieldController } from '../../../../../../../commons/getFieldController';

import ModalComponent from './components/ModalComponent';
import controls from './controls';
import styles from './styles.module.css';

function Specifications({
	control,
	errors,
}) {
	const [showModal, setShowModal] = useState({
		topics : false,
		tags   : false,
	});

	return (
		<div className={styles.container}>
			{controls.map((controlItem) => {
				const { type, label, name, rules } = controlItem || {};

				if (type === 'fieldArray') {
					return (
						<div key={name} className={styles.form_group}>
							<div className={styles.label}>
								{label}
								{rules ? <sup className={styles.superscipt}>*</sup> : null}
							</div>

							<FieldArray
								{...controlItem}
								control={control}
								error={errors?.[name]}
							/>
						</div>
					);
				}

				const Element = getFieldController(type);

				if (!Element) return null;

				return (
					<div key={name} className={styles.form_group}>
						<div className={styles.label}>
							{label}
							{rules ? <sup className={styles.superscipt}>*</sup> : null}
						</div>

						<div className={styles.label_container}>
							<div
								role="presentation"
								className={styles.create_tag_label}
								onClick={() => setShowModal((prev) => ({ ...prev, [name]: true }))}
							>
								Create New Topic
							</div>
						</div>

						<ModalComponent show={showModal[name]} setShow={setShowModal} from={name} />

						<div className={styles.input_group}>

							<Element
								{...controlItem}
								key={name}
								control={control}
								id={`${name}_input`}
							/>
						</div>

						{errors?.[name]?.message ? (
							<div className={styles.error_message}>
								{errors?.[name]?.message}
							</div>
						) : null}
					</div>
				);
			})}
		</div>
	);
}

export default Specifications;
