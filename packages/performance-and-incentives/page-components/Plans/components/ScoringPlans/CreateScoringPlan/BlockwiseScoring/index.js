import { Button } from '@cogoport/components';
import { useFieldArray, useForm } from '@cogoport/forms';

import Block from './Block';
import styles from './styles.module.css';

const CHILD_EMPTY_VALUES = {
	block              : '',
	scoring_type       : '',
	service_fieldarray : [],
};

function BlockwiseScoring() {
	const { control, formState: { errors }, watch } = useForm();

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'blocks',
	});

	return (
		<>
			<h3 className={styles.title}>Blockwise Scoring</h3>

			<p>
				Set base scores for each parameter in a block. These scores will form
				the base for Incentive Calculation
			</p>

			{fields.map((field, index) => (
				<Block
					key={field.id}
					name={`blocks.${index}`}
					control={control}
					errors={errors}
					index={index}
					removeBlock={remove}
					watch={watch}
				/>
			))}

			<div role="presentation" onClick={() => append(CHILD_EMPTY_VALUES)} style={{ cursor: 'pointer' }}>
				+
				{' '}
				<span style={{ textDecoration: 'underline' }}>Add Block</span>
			</div>

			<div className={styles.btn_container}>
				<Button
					size="md"
					themeType="secondary"
					className={styles.btn}
				>
					<b>Cancel</b>
				</Button>

				<Button
					size="md"
					themeType="primary"
					className={styles.btn}
				>
					Create Scoring
				</Button>
			</div>
		</>
	);
}

export default BlockwiseScoring;
