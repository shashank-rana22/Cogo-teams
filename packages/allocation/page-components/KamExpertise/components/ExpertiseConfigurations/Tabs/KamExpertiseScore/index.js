import { Collapse, Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState } from 'react';

import FieldArray from '../../../../../../common/Form/FieldArray';
import { getFieldController } from '../../../../../../common/Form/getFieldController';
import controls from '../../../../configurations/get-add-conditions-controls';
import EXPERTISE_CARDS_COLUMNS_MAPPING from '../../../../constants/expertise-cards-columns-mapping';
import EXPERTISE_CARDS_MAPPING from '../../../../constants/expertise-cards-mapping';

import ExpertiseParameters from './ExpertiseParameters';
import Header from './Header';
import styles from './styles.module.css';

const titleSection = (expertiseItem = {}) => (
	<div>
		<div className={styles.expertise_name}>

			<div className={styles.icon_container}>
				{expertiseItem.icon}
			</div>

			{startCase(expertiseItem.name)}
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

	const { control, formState:{ errors = {} } } = useForm({
		defaultValues: {
			milestones: [{
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
				<Collapse panel={options} activeKey={activeCollapse} setActive={setActiveCollapse} type="text" />
			</div>

			{showModal ? (
				<Modal
					size="md"
					show={showModal}
					onClose={() => setAddConditionModal({})}
					placement="center"
				>
					<Modal.Header title="Add Condition" />

					{/* <form onSubmit={handleSubmit(onSave)}> */}
					<Modal.Body>
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
					{/* </form> */}
				</Modal>
			) : null}

		</>
	);
}

export default KamExpertiseScoreConfig;
