import { Button } from '@cogoport/components';

import blockOptions from '../../../../constants/select-block-options';

import Block from './Block';
import LoadingState from './LoadingState';
import styles from './styles.module.css';
import useQuestConfig from './useQuestConfig';

const CHILD_EMPTY_VALUES = {
	block      : '',
	sub_blocks : [],
};

function QuestConfigForm(props) {
	const { questLoading, quest_id, default_data } = props;

	// console.log('data', data);

	const {
		loading,
		control,
		fields,
		append,
		remove,
		errors,
		watch,
		handleSubmit,
		editSubBlock,
		setEditSubBlock,
		handleClick,
		prefillValues,
	} = useQuestConfig({ default_data, quest_id });

	if (questLoading) return <LoadingState />;

	return (
		<>
			<h3 className={styles.title}>Quest Configurations</h3>

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
						editSubBlock={editSubBlock}
						setEditSubBlock={setEditSubBlock}
						prefillValues={prefillValues}
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

			<div className={styles.btn_container}>
				<Button
					size="lg"
					type="button"
					themeType="primary"
					style={{ marginRight: '8px' }}
					onClick={handleSubmit(handleClick)}
					loading={loading}
				>
					Save As Draft
				</Button>
			</div>
		</>
	);
}

export default QuestConfigForm;
