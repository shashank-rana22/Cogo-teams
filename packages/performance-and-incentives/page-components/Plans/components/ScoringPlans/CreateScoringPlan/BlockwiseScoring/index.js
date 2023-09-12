import { Button } from '@cogoport/components';

import Block from './Block';
import styles from './styles.module.css';
import useBlockWiseScoring from './useBlockWiseScoring';

const CHILD_EMPTY_VALUES = {
	block              : '',
	scoring_type       : '',
	service_fieldarray : [],
};

function BlockwiseScoring(props) {
	const { data, refetch } = props;

	console.log('data::', data);

	const {
		control,
		fields,
		append,
		remove,
		errors,
		watch,
	} = useBlockWiseScoring({ data });

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
						data={data}
						refetch={refetch}
					/>
				))}

				<Button
					type="button"
					size="md"
					themeType="link"
					onClick={() => append(CHILD_EMPTY_VALUES)}
				>
					+ Add Block
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
