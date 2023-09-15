import { Button, Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import blockOptions from '../../../../constants/select-block-options';
import ActivationModal from '../../commons/ActivationModal';

import Block from './Block';
import LoadingState from './LoadingState';
import styles from './styles.module.css';
import useBlockWiseScoring from './useBlockWiseScoring';

const CHILD_EMPTY_VALUES = {
	block      : '',
	sub_blocks : [],
};

function BlockwiseScoring(props) {
	const { data, refetch, getConfigLoading } = props;

	const { push, query : { id } = {} } = useRouter();

	const {
		control,
		fields,
		append,
		remove,
		errors,
		watch,
		handleSubmit,
		editSubBlock,
		setEditSubBlock,
		prefillValues,
		additionalControlsData,
		showActivationModal,
		setShowActivationModal,
	} = useBlockWiseScoring({ data });

	if (getConfigLoading) return <LoadingState />;

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
						handleSubmit={handleSubmit}
						editSubBlock={editSubBlock}
						setEditSubBlock={setEditSubBlock}
						prefillValues={prefillValues}
						additionalControlsData={additionalControlsData}
					/>
				))}

				{(blockOptions.length !== fields.length) ? (
					<Button
						type="button"
						size="md"
						themeType="link"
						onClick={() => append(CHILD_EMPTY_VALUES)}
					>
						+ Add Block
					</Button>
				) : null}

			</div>

			{showActivationModal ? (
				<ActivationModal
					source="creation"
					activeActionId={id}
					setShowActivationModal={setShowActivationModal}
				/>
			) : null}

			<div className={styles.btn_container}>
				<Button
					size="lg"
					type="button"
					themeType="secondary"
					style={{ marginRight: '8px' }}
					onClick={() => {
						Toast.success('Saved Successfully');
						push('/performance-and-incentives/plans');
					}}
				>
					Save As Draft
				</Button>

				<Button
					size="lg"
					type="button"
					themeType="primary"
					onClick={() => setShowActivationModal(true)}
				>
					Activate Config
				</Button>
			</div>
		</>
	);
}

export default BlockwiseScoring;
