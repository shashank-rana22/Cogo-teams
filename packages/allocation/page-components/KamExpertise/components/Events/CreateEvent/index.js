import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import { getFieldController } from '../../../../../common/Form/getFieldController';
import useCreateNewEvent from '../../../hooks/useCreateNewEvent';
import useGetAllocationKamExpertiseRules from '../../../hooks/useGetAllocationKamExpertiseRules';
import useUpdateEvent from '../../../hooks/useUpdateEvent';

import AttributePage from './AttributesPage';
import styles from './styles.module.css';

function CreateEvent(props) {
	const { t } = useTranslation(['allocation']);
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
	} = useCreateNewEvent({ attributeList, listRefetch, setEventListData, t });

	const {
		onUpdate,
		formProps,
		controls,
		loading: updateLoading,
	} = useUpdateEvent({ eventListData, listRefetch, attributeList, setEventListData, t });

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = formProps;

	const createEventMode = isEmpty(eventListData?.data);

	return (
		<div>
			<div className={styles.create_new_event}>
				<p>
					{createEventMode ? t('allocation:create_button_label') : t('allocation:update_button') }
					{' '}
					{t('allocation:new_event_label')}
				</p>
			</div>

			<div className={styles.form_container}>
				<div className={styles.rule_and_attribute}>
					<div className={styles.add_rule_container}>
						<div className={styles.add_rule_text}>
							{t('allocation:add_rule_label')}
						</div>

						<section className={styles.rule_form_container}>
							{controls.map((controlItem) => {
								const el = { ...controlItem };

								const Element = getFieldController(el.type);

								if (!Element) return null;

								return (
									<div className={styles.form_group} key={el.name}>
										<span className={styles.label}>{el.label}</span>

										<div className={styles.input_group}>
											<Element
												key={el.name}
												control={control}
												id={`${el.name}_input`}
												{...el}
												disabled={!createEventMode || el.disabled}

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
						disabled={(createEventMode) ? createLoading : updateLoading}
					>
						{t('allocation:cancel_button')}
					</Button>

					<Button
						size="md"
						type="submit"
						onClick={createEventMode ? handleSubmit(onSave) : handleSubmit(onUpdate)}
						loading={createEventMode ? createLoading : updateLoading}
					>
						{t('allocation:save_button')}
					</Button>
				</div>
			</div>

		</div>
	);
}

export default CreateEvent;
