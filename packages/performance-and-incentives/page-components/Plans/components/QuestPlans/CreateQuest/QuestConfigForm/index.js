import { Button } from '@cogoport/components';
import { IcMJobsConfig } from '@cogoport/icons-react';

import ScrollAnnouncement from '../../../../../../common/ScrollAnouncement';
import blockOptions from '../../../../constants/select-block-options';

import Block from './Block';
import QuestStringEditor from './QuestStringEditor';
import styles from './styles.module.css';
import useQuestConfig from './useQuestConfig';

const CHILD_EMPTY_VALUES = {
	block      : '',
	sub_blocks : [],
};

function QuestConfigForm(props) {
	const { data, refetch, questData } = props;

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
		handleResetString,
		setValue,
		editor,
		setEditor,
		...rest
	} = useQuestConfig({ data, refetch, questData });

	const scroll_list = [{ quest_string: editor.toString('html') }];

	return (
		<>
			<div className={styles.heading}>
				<IcMJobsConfig height={20} width={20} />
				Set Configurations
			</div>

			<div className={styles.blocks_container}>
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

			<div className={styles.container_head}>

				<ScrollAnnouncement id={data?.id} list={scroll_list} />

				<QuestStringEditor
					editor={editor}
					setEditor={setEditor}
					formattedString={formattedString}
					handleResetString={handleResetString}
				/>

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
			</div>
		</>
	);
}

export default QuestConfigForm;
