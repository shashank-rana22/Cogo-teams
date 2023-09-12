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

	const { fields, append, remove } = useFieldArray({ control, name: 'blocks' });

	return (
		<>
			<h3 className={styles.title}>Blockwise Scoring</h3>

			<p>
				Set base scores for each parameter in a block. These scores will form
				the base for Incentive Calculation
			</p>

			<div className={styles.blocks_container}>
				{fields.map((field, index) => (
					<Block
						key={field.id}
						name={`blocks.${index}`}
						control={control}
						errors={errors}
						blockIndex={index}
						removeBlock={remove}
						watch={watch}
					/>
				))}

				<Button
					type="button"
					size="md"
					themeType="link"
					onClick={() => append(CHILD_EMPTY_VALUES)}
				>
					+ Add Parameter
				</Button>
			</div>

			<div className={styles.btn_container}>
				<Button
					size="lg"
					type="button"
					themeType="secondary"
					style={{ marginRight: '8px' }}
				>
					Cancel
				</Button>

				<Button
					size="lg"
					type="button"
					themeType="primary"
				>
					Create Scoring
				</Button>
			</div>
		</>
	);
}

export default BlockwiseScoring;
