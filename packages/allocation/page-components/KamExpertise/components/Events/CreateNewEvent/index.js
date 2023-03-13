import { Button } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { startCase, isEmpty } from '@cogoport/utils';

import { getFieldController } from '../../../../../common/Form/getFieldController';
import useCreateNewEvent from '../../../hooks/useCreateNewEvent';
import useGetAllocationKamExpertiseRules from '../../../hooks/useGetAllocationKamExpertiseRules';
// import useUpdateEvent from '../../../hooks/useUpdateEvent';

import styles from './styles.module.css';

const CONTROL_TYPE_MAPPING = {
	string  : 'text',
	integer : 'number',
	select  : 'select',
};

function CreateNewEvent(props) {
	const {
		attributeList,
		loading,
		refetch,
	} = useGetAllocationKamExpertiseRules();

	const { setToggleEvent = () => {}, eventListData = {} } = props;
	console.log('eventListData', eventListData);

	const onClose = () => {
		setToggleEvent('eventList');
	};

	// if(isEmpty(eventListData)){

	// }

	const {
		onSave,
		formProps,
		getAddRuleControls,
	} = useCreateNewEvent({ attributeList, eventListData });

	// const {
	// 	onUpdate,
	// } = useUpdateEvent();

	console.log('attributeList:', attributeList);

	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
	} = formProps;

	return (
		<div>
			<div className={styles.create_new_event}>
				{!isEmpty(eventListData) ? (
					<p>
						Update Event
					</p>
				) : (
					<p>
						Create New Event
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
							{getAddRuleControls.map((controlItem) => {
								const el = { ...controlItem };

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
												disabled={!isEmpty(eventListData)}
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

					<div className={styles.account_attributes}>
						<div className={styles.account_attribute_text}>
							Account Attribute
							{' '}
							<IcMInfo />
						</div>

						{/* // Todo atleast one of them is required */}

						<section className={styles.row_container}>
							{attributeList.map((controlItem, index) => {
								const { name = '', parameters } = controlItem;
								const { params_type, options = [] } = parameters || {};

								const type = CONTROL_TYPE_MAPPING[params_type || ''];

								const el = {
									name,
									label: startCase(name),
									type,
									...(type === 'select' && { options, isClearable: true }),
								};

								const Element = getFieldController(el?.type);

								if (!Element) return null;

								return (
									<div className={styles.attribute_form_group}>
										<span className={styles.label}>{el.label}</span>

										<div
											className={`${styles.input_group}
										${index < 12 ? styles.margin_bottom : ''}`}
										>
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
				</div>

				<div className={styles.btn_container}>
					<Button
						size="md"
						type="button"
						themeType="tertiary"
				// onClick={onCloseModal}
						style={{ marginRight: '10px' }}
						onClick={onClose}
					>
						Cancel
					</Button>

					<Button
						size="md"
						type="submit"
						onClick={handleSubmit(onSave)}
					>
						Save
					</Button>
				</div>
			</div>

		</div>
	);
}

export default CreateNewEvent;
