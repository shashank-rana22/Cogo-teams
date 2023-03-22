import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import { getFieldController } from '../../../../../common/Form/getFieldController';
import useCreateNewEvent from '../../../hooks/useCreateNewEvent';
import useGetAllocationKamExpertiseRules from '../../../hooks/useGetAllocationKamExpertiseRules';
import useUpdateEvent from '../../../hooks/useUpdateEvent';

import AttributePage from './AttributesPage';
import styles from './styles.module.css';

const FILTER_ATTRIBUTE_MAPPING = {
	account_attribute  : 'account',
	shipment_attribute : 'shipment',
	misc_attribute     : 'misc',
};

function CreateEvent(props) {
	const {
		setToggleEvent = () => {},
		listRefetch = () => {},
		eventListData = {},
	} = props;

	console.log('eventlistdata', eventListData);

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
	} = useUpdateEvent({ eventListData, listRefetch, attributeList, setToggleEvent });

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
				{isEmpty(eventListData) ? (
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
												disabled={!isEmpty(eventListData)}
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

					<AttributePage
						loading={loading}
						attributeList={attributeList}
						watchListener={watchListener}
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
					>
						Cancel
					</Button>

					<Button
						size="md"
						type="submit"
						onClick={(isEmpty(eventListData)) ? handleSubmit(onSave) : handleSubmit(onUpdate)}
					>
						Save
					</Button>
				</div>
			</div>

		</div>
	);
}

export default CreateEvent;
