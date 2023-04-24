import { Button } from '@cogoport/components';
import { ChipsController, InputController, useFieldArray } from '@cogoport/forms';
import { IcMDelete } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useMemo } from 'react';

import getAlphabets from '../../../utils/getAlphabets';

import styles from './styles.module.css';

const alphabets = getAlphabets('A', 'Z');

function OptionsComponent({ control, controls, register, name, errors, mode, isNewQuestion }) {
	const NAME_CONTROL_MAPPING = useMemo(() => {
		const hash = {};

		controls.forEach((item) => {
			hash[item?.name] = item;
		});

		return hash;
	}, [controls]);

	const childEmptyValues = {};

	controls.forEach((controlItem) => {
		childEmptyValues[controlItem.name] = controlItem.value || '';
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name,
	});

	const handleAppendChild = () => {
		append(childEmptyValues);
	};

	if (isEmpty(fields)) {
		append(childEmptyValues);
	}

	return (
		<>
			{fields.map((field, index) => (
				<div
					key={field.id}
					className={styles.option_container}
				>
					<div className={styles.alphabet_container}>{alphabets[index]}</div>

					<InputController
						{...NAME_CONTROL_MAPPING.answer_text}
						control={control}
						{...register(`${name}.${index}.answer_text`, {
							...(NAME_CONTROL_MAPPING.answer_text.rules || {}),
						})}
						className={errors[index]?.answer_text ? styles.error : null}
					/>

					<div className={styles.right_button_container}>
						{fields.length < 11 && index === fields.length - 1 && mode !== 'view' && isNewQuestion ? (
							<Button
								type="button"
								themeType="secondary"
								className={styles.add_button}
								onClick={() => handleAppendChild()}
							>
								+ Add
							</Button>
						) : null}

						{fields.length > 1 && mode !== 'view' && isNewQuestion ? (
							<IcMDelete
								style={{ cursor: 'pointer' }}
								width={20}
								height={20}
								onClick={() => remove(index, 1)}
							/>
						) : null}

						<div className={styles.left_button_container}>
							<ChipsController
								control={control}
								{...NAME_CONTROL_MAPPING.is_correct}
								{...register(`${name}.${index}.is_correct`, {
									...(NAME_CONTROL_MAPPING.is_correct.rules || {}),
								})}
							/>

							{errors[index]?.is_correct ? (
								<div className={styles.error_msg}>This is required</div>
							) : null}
						</div>
					</div>
				</div>
			))}
		</>
	);
}

export default OptionsComponent;
