import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import { getFieldController } from '../../../../../common/Form/getFieldController';
import useCreateNewEvent from '../../../hooks/useCreateNewEvent';
import useGetAllocationKamExpertiseRules from '../../../hooks/useGetAllocationKamExpertiseRules';
import useUpdateEvent from '../../../hooks/useUpdateEvent';

import AttributePage from './AttributesPage';
import styles from './styles.module.css';

function CreateEvent(props) {
	const {
		listRefetch = () => {},
		eventListData = {},
		setEventListData = () => {},
	} = props;

	const onClose = () => {
		setEventListData({
			data        : {},
			toggleEvent : 'eventList',
		});
	};

	const {
		attributeList = [],
		loading,
	} = useGetAllocationKamExpertiseRules();

	const {
		onSave,
		loading: createLoading,
	} = useCreateNewEvent({ attributeList, listRefetch, setEventListData });

	const {
		onUpdate,
		formProps,
		getAddRuleControls,
		loading: updateLoading,
	} = useUpdateEvent({ eventListData, listRefetch, attributeList, setEventListData });

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = formProps;

	return (
		<div>
			<div className={styles.create_new_event}>
				{isEmpty(eventListData?.data) ? (
					<p>
						Create New Event
					</p>
				) : (

					<p>
						Update Event
					</p>
				)}
			</div>

			<div className={styles.form_container}>

				<div className={styles.rule_and_attribute}>
					<div className={styles.add_rule_container}>
						<div className={styles.add_rule_text}>
							Add Rule
						</div>

						<section className={styles.rule_form_container}>
							{ getAddRuleControls.map((controlItem) => {
								const el = { ...controlItem };

								const Element = getFieldController(el.type);

								const isDisabled = (!isEmpty(eventListData?.data || el.disabled));

								if (!Element) return null;

								return (
									<div className={styles.form_group}>
										<span className={styles.label}>{el.label}</span>

										<div className={styles.input_group}>
											<Element
												key={el.name}
												control={control}
												id={`${el.name}_input`}
												disabled={isDisabled}
												{...el}

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

					<AttributePage
						loading={loading}
						attributeList={attributeList}
						formProps={formProps}
					/>

				</div>

				<div className={styles.btn_container}>
					<Button
						size="md"
						type="button"
						themeType="tertiary"
						style={{ marginRight: '10px' }}
						onClick={onClose}
						disabled={(isEmpty(eventListData?.data)) ? createLoading : updateLoading}
					>
						Cancel
					</Button>

					<Button
						size="md"
						type="submit"
						onClick={(isEmpty(eventListData?.data)) ? handleSubmit(onSave) : handleSubmit(onUpdate)}
						loading={(isEmpty(eventListData?.data)) ? createLoading : updateLoading}
					>
						Save
					</Button>
				</div>
			</div>

		</div>
	);
}

export default CreateEvent;
