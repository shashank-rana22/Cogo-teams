import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useState, forwardRef, useImperativeHandle, useEffect } from 'react';

import FieldArray from '../../../../../../../commons/FieldArray';
import { getFieldController } from '../../../../../../../commons/getFieldController';
import CURRENT_TO_NEXT_MAPPING from '../../Header/CURRENT_TO_NEXT_MAPPING';

import ModalComponent from './components/ModalComponent';
import controls from './controls';
import styles from './styles.module.css';

const MAPPING = ['course_objectives', 'tags', 'topics'];

function Specifications({ data = {}, id = '', activeTab = '', mode = '' }, ref) {
	const [showModal, setShowModal] = useState({
		topics : false,
		tags   : false,
	});

	const {
		control,
		formState: { errors = {} },
		handleSubmit,
		setValue,
	} = useForm();

	useEffect(() => {
		MAPPING.forEach((item) => {
			if (data[item] && !isEmpty(data[item])) {
				setValue(item, data[item]);
			}
		});
	}, [data, setValue]);

	useImperativeHandle(ref, () => ({
		handleSubmit: () => {
			const onSubmit = (values) => ({
				hasError : false,
				values   : {
					id,
					topic_ids : values.topics,
					tag_ids   : values.tags,
					state     : CURRENT_TO_NEXT_MAPPING[activeTab],
					course_objectives:
						(values.course_objectives || []).map((item) => item.objective),
				},
			});

			const onError = (error) => ({ hasError: true, error });

			return new Promise((resolve) => {
				handleSubmit(
					(values) => resolve(onSubmit(values)),
					(error) => resolve(onError(error)),
				)();
			});
		},
	}));

	return (
		<div className={styles.container}>
			<fieldset
				style={{ border: 'unset' }}
				disabled={mode === 'view'}
			>
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
									showButtons={mode !== 'view'}
									showDeleteButton={mode !== 'view'}
									disabled={mode === 'view'}
								/>
							</div>
						);
					}

					const Element = getFieldController(type);

					if (!Element) return null;

					return (
						<div key={name} className={styles.form_group}>
							<div className={styles.label_container}>
								<div className={styles.label}>
									{label}
									{rules ? <sup className={styles.superscipt}>*</sup> : null}
								</div>

								<div
									role="presentation"
									className={styles.create_tag_label}
									onClick={() => setShowModal((prev) => ({ ...prev, [name]: true }))}
								>
									Create New
									{' '}
									{(name === 'topics' ? 'Topic' : 'Tag')}
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
			</fieldset>
		</div>
	);
}

export default forwardRef(Specifications);
