import { Collapse, Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState } from 'react';

import FieldArray from '../../../../../../common/Form/FieldArray';
import { getFieldController } from '../../../../../../common/Form/getFieldController';
import getControls from '../../../../configurations/get-add-conditions-controls';
import ADD_CONDITION_CONTROL_MAPPING from '../../../../constants/add-condition-controls-mapping';
import EXPERTISE_CARDS_COLUMNS_MAPPING from '../../../../constants/expertise-cards-columns-mapping';
import EXPERTISE_CARDS_MAPPING from '../../../../constants/expertise-cards-mapping';

import ExpertiseParameters from './ExpertiseParameters';
import Header from './Header';
import styles from './styles.module.css';

const CONTROL_MAPPING = {
	percentage: [{
		name               : 'milestones',
		label              : 'Enter milestones (%) and score allocated at each milestone',
		type               : 'fieldArray',
		buttonText         : 'Add More',
		noDeleteButtonTill : 1,
		controls           : [
			{
				name        : 'milestone',
				type        : 'number',
				label       : 'Milestone',
				placeholder : '0',
				rules       : { required: 'Milestone is required' },
			},
			{
				name        : 'score',
				type        : 'number',
				label       : 'Score',
				placeholder : '0',
				rules       : { required: 'Score is required' },
			},
		],
	}],
	tat: [{
		name               : 'tat',
		label              : 'Enter duration (days) and score allocated on completion',
		type               : 'fieldArray',
		buttonText         : 'Add More',
		noDeleteButtonTill : 1,
		controls           : [
			{
				name        : 'from',
				type        : 'number',
				label       : 'From',
				placeholder : '0',
				rules       : { required: 'From is required' },
			},
			{
				name        : 'to',
				type        : 'number',
				label       : 'To',
				placeholder : '0',
				rules       : { required: 'To is required' },
			},
			{
				name        : 'score',
				type        : 'number',
				label       : 'Score',
				placeholder : '0',
				rules       : { required: 'Score is required' },
			},
		],
	}],
	absolute: [{
		name        : 'score_on_completion',
		type        : 'number',
		label       : 'Score on Completion',
		placeholder : '0',
		rules       : { required: 'Score on Completion is required' },
	},
	{
		name        : 'score_on_repetition',
		type        : 'number',
		label       : 'Score on Repetition',
		placeholder : '0',
		rules       : { required: 'Score on Repetition is required' },
	},
	],
};

// Todo getControls from utility function

const titleSection = (expertiseItem = {}) => (
	<div>
		<div className={styles.expertise_name}>

			<div className={styles.icon_container}>
				{expertiseItem.icon}
			</div>

			{startCase(expertiseItem.name || '')}
		</div>

		<div className={styles.expertise_stats}>
			{EXPERTISE_CARDS_COLUMNS_MAPPING.map((colDetails) => {
				const { key, label, flex } = colDetails;
				return (
					<div key={key} style={{ flex }}>
						{label ? <div className={styles.label}>{label}</div> : null}

						<div className={styles.value}>{expertiseItem[key]}</div>
					</div>

				);
			})}
		</div>

	</div>
);

function KamExpertiseScoreConfig() {
	const [addConditionModal, setAddConditionModal] = useState({});

	const [activeCollapse, setActiveCollapse] = useState('');

	const showModal = !isEmpty(addConditionModal);

	const { control, formState:{ errors = {} }, watch, handleSubmit } = useForm({
		defaultValues: {
			condition_type : '', // Todo based on expertise
			score_type     : '', // Todo based on expertise
			milestones     : [{
				milestone : '',
				score     : '',
			}],
			tat: [{
				from  : '',
				to    : '',
				score : '',
			}],
		},
	});

	const expertiseType = startCase(addConditionModal.type || '');

	const { score_type } = watch();

	// const filteredControls = controls.filter(
	// 	(controlObj) => {
	// 		if (score_type) {
	// 			return (ADD_CONDITION_CONTROL_MAPPING[score_type]).includes(controlObj.name);
	// 		}

	// 		return controlObj;
	// 	},
	// );

	const controls = getControls({ modifiedControls: CONTROL_MAPPING[score_type] });

	// Todo need to format Values before sending it in payload
	const onSave = async (values) => {
		console.log('values', values);
	};

	const options = Object.entries(EXPERTISE_CARDS_MAPPING).map(([key, value]) => (
		{
			key,
			title    : titleSection(value),
			children : <ExpertiseParameters
				expertiseData={value}
				onClickAddCondition={() => setAddConditionModal({ type: value?.name })}
			/>,

		}
	));

	return (
		<>
			<div className={styles.container}>
				<Header />
			</div>

			<div className={styles.expertise_cards_container}>
				{
					// Object.entries(EXPERTISE_CARDS_MAPPING).map(([key, value]) => (
					// 	<Accordion id={key} title={titleSection(value)}>
					// 		<ExpertiseParameters
					// 			expertiseData={value}
					// 			onClickAddCondition={() => setAddConditionModal({ type: value?.name })}
					// 		/>
					// 	</Accordion>
					// ))
					<Collapse panel={options} activeKey={activeCollapse} setActive={setActiveCollapse} type="text" />
				}
			</div>

			{showModal ? (
				<Modal
					size="md"
					show={showModal}
					onClose={() => setAddConditionModal({})}
					placement="center"
				>
					<Modal.Header title="Add Condition" />

					<form onSubmit={handleSubmit(onSave)}>
						<Modal.Body>
							<div>
								<div className={styles.expertise_score_type}>
									{expertiseType}
								</div>

								<div className={styles.description}>
									Scores earned by KAMs based on activities that relate to the KAM’s
									{' '}
									{expertiseType}
									.
								</div>
							</div>

							<div className={styles.add_rule_container}>
								<section>
									{controls.map((controlItem) => {
										const el = { ...controlItem };

										if (el.type === 'fieldArray') {
											return (
												<div className={styles.field_array_container}>
													<span className={styles.label}>{el.label}</span>

													<FieldArray {...el} control={control} />
												</div>
											);
										}

										const Element = getFieldController(el.type);

										if (!Element) return null;

										return (
											<div className={styles.form_group}>
												<span className={styles.label}>{el.label}</span>

												<div className={styles.input_group}>
													<Element
														{...el}
														key={el.name}
														control={control}
														id={`${el.name}_input`}
													/>
												</div>

												<div className={styles.error_message}>
													{errors?.[el.name]?.message}
												</div>
											</div>
										);
									})}
								</section>
							</div>

						</Modal.Body>

						<Modal.Footer>
							{/* <Button
							size="md"
							type="button"
							themeType="tertiary"
							style={{ marginRight: '10px' }}
						>
							Cancel
						</Button> */}

							<Button
								size="md"
								type="submit"
								themeType="primary"
							// loading={loadingOnSave}
								id="add_condition_btn"
							>
								Add
							</Button>
						</Modal.Footer>
					</form>
				</Modal>
			) : null}

		</>
	);
}

export default KamExpertiseScoreConfig;
