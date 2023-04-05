import { Collapse, Button, Modal } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState } from 'react';

import EmptyState from '../../../../../../common/EmptyState';
import FieldArray from '../../../../../../common/Form/FieldArray';
import { getFieldController } from '../../../../../../common/Form/getFieldController';
import CONTROL_MAPPING from '../../../../configurations/add-condition-controls-mapping';
import getControls from '../../../../configurations/get-add-conditions-controls';
import EXPERTISE_CARDS_COLUMNS_MAPPING from '../../../../constants/expertise-cards-columns-mapping';
import ICON_MAPPING from '../../../../constants/icon-mapping';
import useCreateAllocationKamExpertiseEventScoring from '../../../../hooks/useCreateAllocationKamExpertiseEventScoring';
import LoadingState from '../LoadingState';

import ExpertiseParameters from './ExpertiseParameters';
import Header from './Header';
import styles from './styles.module.css';

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

function KamExpertiseScoreConfig({
	listExpertiseParams,
	expertiseLoading,
	expertiseRefetch,
	cardRefetch,
}) {
	const [addConditionModal, setAddConditionModal] = useState({});

	const [activeCollapse, setActiveCollapse] = useState('');

	const showModal = !isEmpty(addConditionModal);

	const onClose = () => {
		setAddConditionModal({});
	};

	const { list = [], audit_data: auditData = {} } = listExpertiseParams || {};

	const {
		createConditionloading,
		formProps,
		onSave,
	} = useCreateAllocationKamExpertiseEventScoring({
		onClose,
		cardRefetch,
		expertiseRefetch,
	});

	const { control, formState:{ errors = {} }, watch, handleSubmit } = formProps;

	const expertiseType = startCase(addConditionModal.type || '');

	const { scoring_type } = watch();

	const controls = getControls({
		modifiedControls : CONTROL_MAPPING[scoring_type],
		typeFilter       : addConditionModal.type,
		showModal,
	});

	const options = list.map((value) => ({
		key      : value.expertise_type,
		title    : titleSection(value),
		children : <ExpertiseParameters
			activeCollapse={activeCollapse}
			onClickAddCondition={() => setAddConditionModal({ type: value?.expertise_type })}
			loading={expertiseLoading}
			cardRefetch={cardRefetch}
		/>,

	}));

	return (
		<>
			<div className={styles.container}>
				<Header auditData={auditData} loading={expertiseLoading} />
			</div>

			{isEmpty(list) && !expertiseLoading ? <EmptyState /> : null}

			{!expertiseLoading ? (
				<div className={styles.expertise_cards_container}>
					<Collapse panels={options} activeKey={activeCollapse} setActive={setActiveCollapse} type="text" />
				</div>
			) : <LoadingState columnsToLoad={2} />}

			{showModal && (
				<Modal
					size="md"
					show={showModal}
					onClose={onClose}
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

													<FieldArray
														{...el}
														control={control}
														error={errors?.[el.name]}
													/>
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
														disabled={createConditionloading}
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
							<Button
								size="md"
								type="submit"
								themeType="primary"
								loading={createConditionloading}
								id="add_condition_btn"
							>
								Add
							</Button>
						</Modal.Footer>
					</form>
				</Modal>
			)}
		</>
	);
}

export default KamExpertiseScoreConfig;
