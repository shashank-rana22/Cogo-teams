import { Button } from '@cogoport/components';
import { InputController } from '@cogoport/forms';
import { IcMJobsConfig } from '@cogoport/icons-react';

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
	const { questLoading, data } = props;

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
	} = useQuestConfig({ default_data: data?.quest_configurations, quest_id: data?.id });

	if (questLoading) return <LoadingState />;

	return (
		<>
			<div className={styles.heading}>
				<IcMJobsConfig height={20} width={20} />
				Set Configurations
			</div>

			<div className={styles.blocks_container}>
				<InputController
					name="quest_string"
					size="sm"
					control={control}
					errors={errors}
					rules={{ required: 'Required' }}
					style={{ width: '84%' }}
					value={data?.quest_string}
				/>
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
					Save Configurations
				</Button>
			</div>
		</>
	);
}

export default QuestConfigForm;
