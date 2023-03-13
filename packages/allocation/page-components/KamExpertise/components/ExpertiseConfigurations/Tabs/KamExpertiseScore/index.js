import { Collapse, Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMAgentManagement } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState } from 'react';

import FieldArray from '../../../../../../common/Form/FieldArray';
import { getFieldController } from '../../../../../../common/Form/getFieldController';
import getControls from '../../../../configurations/get-add-conditions-controls';
import CONTROL_MAPPING from '../../../../constants/add-condition-controls-mapping';
import EXPERTISE_CARDS_COLUMNS_MAPPING from '../../../../constants/expertise-cards-columns-mapping';
import useGetKamExpertiseScore from '../../../../hooks/useGetKamExpertiseScore';

import ExpertiseParameters from './ExpertiseParameters';
import Header from './Header';
import styles from './styles.module.css';

const ICON_MAPPING = {
	customer_expertise  : <IcMAgentManagement />,
	trade_expertise     : <IcMAgentManagement />,
	commodity_expertise : <IcMAgentManagement />,
	misc_expertise      : <IcMAgentManagement />,
};

const titleSection = (expertiseItem = {}) => (
	<div>
		<div className={styles.expertise_name}>

			<div className={styles.icon_container}>
				{ICON_MAPPING[expertiseItem.expertise_type]}
			</div>

			{startCase(expertiseItem.expertise_type || '')}
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

	const { data, loading } = useGetKamExpertiseScore();

	const { list = [], audit_data: auditData = {} } = data || {};

	const expertiseType = startCase(addConditionModal.type || '');

	const { score_type } = watch();

	const controls = getControls({ modifiedControls: CONTROL_MAPPING[score_type] });

	// Todo need to format Values before sending it in payload
	const onSave = async (values) => {
		console.log('values', values);
	};

	const options = (list).map((value) => (
		{
			key      : value.expertise_type,
			title    : titleSection(value),
			children : <ExpertiseParameters
				activeCollapse={activeCollapse}
				onClickAddCondition={() => setAddConditionModal({ type: value?.name })}
			/>,

		}
	));

	return (
		<>
			<div className={styles.container}>
				<Header auditData={auditData} />
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
