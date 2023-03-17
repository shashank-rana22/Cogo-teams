import { Placeholder, Button } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { startCase, isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import EmptyState from '../../../../../common/EmptyState';
import { getFieldController } from '../../../../../common/Form/getFieldController';
import useCreateNewEvent from '../../../hooks/useCreateNewEvent';
import useGetAllocationKamExpertiseRules from '../../../hooks/useGetAllocationKamExpertiseRules';
import useUpdateEvent from '../../../hooks/useUpdateEvent';

import styles from './styles.module.css';

const CONTROL_TYPE_MAPPING = {
	string  : 'text',
	integer : 'number',
	select  : 'select',
};

const FILTER_ATTRIBUTE_MAPPING = {
	account_attribute  : 'account',
	shipment_attribute : 'shipment',
	misc_attribute     : 'misc',
};

function CreateEvent(props) {
	const {
		setToggleEvent = () => {},
		listRefetch = () => {},
		updateEventListData = {},
	} = props;

	const onClose = () => {
		setToggleEvent('eventList');
	};

	const {
		attributeList = [],
		loading,
		setRuleType = () => {},
	} = useGetAllocationKamExpertiseRules();

	const {
		onSave,
		getAddRuleControls,
	} = useCreateNewEvent({ attributeList, listRefetch, setToggleEvent });

	const {
		onUpdate,
		formProps,
	} = useUpdateEvent({ updateEventListData, listRefetch, attributeList, setToggleEvent });

	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
	} = formProps;

	const watchListener = watch('attribute');

	useEffect(() => {
		setRuleType(FILTER_ATTRIBUTE_MAPPING[watchListener]);
	}, [setRuleType, watchListener]);

	return (
		<div>
			<div className={styles.create_new_event}>
				{isEmpty(updateEventListData) ? (
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
							{
							getAddRuleControls.map((controlItem) => {
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
												disabled={!isEmpty(updateEventListData)}
											/>
										</div>

										<div className={styles.error_message}>
											{errors?.[el.name]?.message}
										</div>
									</div>
								);
							})
}
						</section>
					</div>

					{
						(isEmpty(attributeList) && !loading)
							? (
								<div
									className={styles.account_attributes}
									style={{
										background : '#fff',
										padding    : '80px 16px 0 16px',

									}}
								>
									<EmptyState
										height="320px"
										width="500px"
										flexDirection="column"

									/>
								</div>
							)
							: (
								<div className={styles.account_attributes}>
									<div className={styles.account_attribute_text}>
										Account Attribute
										{' '}
										<IcMInfo />
									</div>

									<section className={styles.row_container}>
										{

							loading
								? [1, 2, 3, 4, 5].map(() => (
									<div className={styles.attribute_form_group}>
										<div
											className={`${styles.input_group}
													${styles.margin_bottom}`}
										>
											<Placeholder height="40px" style={{ margin: '8px 0 16px 0' }} />
										</div>

									</div>
								))

								:	attributeList.map((controlItem, index) => {
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
										${index < attributeList.length ? styles.margin_bottom : ''}`}
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
								})
}
									</section>
								</div>
							)
					}

				</div>

				<div className={styles.btn_container}>
					<Button
						size="md"
						type="button"
						themeType="tertiary"
						style={{ marginRight: '10px' }}
						onClick={onClose}
					>
						Cancel
					</Button>

					<Button
						size="md"
						type="submit"
						onClick={(isEmpty(updateEventListData)) ? handleSubmit(onSave) : handleSubmit(onUpdate)}
					>
						Save
					</Button>
				</div>
			</div>

		</div>
	);
}

export default CreateEvent;
