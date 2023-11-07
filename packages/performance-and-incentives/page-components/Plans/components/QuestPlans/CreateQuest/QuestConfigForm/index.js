import { Button } from '@cogoport/components';
import { InputController } from '@cogoport/forms';
import { IcMJobsConfig } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import blockOptions from '../../../../constants/select-block-options';

import Block from './Block';
import styles from './styles.module.css';
import useQuestConfig from './useQuestConfig';

const CHILD_EMPTY_VALUES = {
	block      : '',
	sub_blocks : [],
};

function QuestConfigForm(props) {
	const { data, refetch, name: questName } = props;

	const {
		loading,
		control,
		fields,
		append,
		remove,
		errors,
		watch,
		handleSubmit,
		handleClick,
		formattedString,
		onClickFill,
		handleResetString,
		...rest
	} = useQuestConfig({ data, refetch, questName });

	return (
		<>
			<div className={styles.heading}>
				<IcMJobsConfig height={20} width={20} />
				Set Configurations
			</div>

			<div className={styles.blocks_container}>

				<div className={styles.generated_string}>
					<div className={styles.generated_string_heading}>Auto-generate quest:</div>
					<div className={styles.generated_string_content}>{formattedString}</div>
				</div>

				<div className={styles.quest_string_label}>
					Quest String
					<sup className={styles.sup}>*</sup>
				</div>

				<div className={styles.input_string_div}>

					<InputController
						name="quest_string"
						size="sm"
						control={control}
						errors={errors}
						rules={{ required: 'Required' }}
						style={{ width: '80%' }}
						value={data?.quest_string}
					/>
					<Button disabled={isEmpty(formattedString)} onClick={onClickFill}>Use Auto-generated </Button>
					<Button
						themeType="secondary"
						disabled={data?.quest_string === watch('quest_string')}
						onClick={handleResetString}
					>
						Reset

					</Button>
				</div>
				{fields.map((field, index) => (
					<Block
						{...rest}
						config_id={data?.agent_scoring_config_id}
						key={field.id}
						name={`blocks.${index}`}
						control={control}
						errors={errors}
						blockIndex={index}
						removeBlock={remove}
						watch={watch}
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
