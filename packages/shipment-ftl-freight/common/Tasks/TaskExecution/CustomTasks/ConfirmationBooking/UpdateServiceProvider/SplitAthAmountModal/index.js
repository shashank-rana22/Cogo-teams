import { Button, Modal, Popover } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { Layout } from '@cogoport/surface-modules';
import { useState, useEffect, useMemo } from 'react';

import getDefaultValues from '../../../../utils/get-default-values';

import splitAthAmountControls from './splitAthAmountControls';
import styles from './styles.module.css';

function SplitAthAmountModal({ item = {}, setFinalGetHookData = () => {} }) {
	const [watchSplitType, setWatchSplitType] = useState({});
	const [show, setShow] = useState(false);

	const controls = splitAthAmountControls();

	const defaultValues = getDefaultValues(controls);
	const { fields, control, formState, watch, handleSubmit } = useForm({ defaultValues });
	const { errors } = formState;

	const watchSplitAdvancedAmount = watch('split_advanced_amount');

	const submit = (val) => {
		const tempItem = item;
		tempItem.split_advanced_amount = val?.split_advanced_amount;
		setFinalGetHookData((prev) => ({ ...prev }));
		setShow(false);
	};

	useEffect(() => {
		const subscription = watch((value, { name }) => {
			const [controlName, index, controlSubName] = name.split('.');
			if (
				controlName === 'split_advanced_amount'
				&& controlSubName === 'split_type'
			) {
				setWatchSplitType((prev) => ({
					...prev,
					[index]: value[controlName][index][controlSubName],
				}));
			}
		});
		return () => subscription.unsubscribe();
	}, [watch, watchSplitAdvancedAmount]);

	const memoizedFields = useMemo(() => {
		const newFields = {};
		Object.entries(fields).forEach(([key, field]) => {
			let newField = { ...field };
			if (key === 'split_advanced_amount') {
				const newSubControls = newField.controls.map((subControl) => {
					if (subControl.name === 'trade_party_id') {
						const mutatedParams = {};
						watchSplitAdvancedAmount.forEach((amount, index) => {
							if (watchSplitType[index]) {
								mutatedParams[index] = {
									filters: {
										organization_id  : item?.service_provider_id,
										trade_party_type : ['self'].includes(watchSplitType[index])
											? watchSplitType[index]
											: undefined,
									},
								};
							}
						});
						return {
							...subControl,
							mutatedParams,
						};
					}
					return subControl;
				});
				newField = {
					...newField,
					controls: newSubControls,
				};
			}
			newFields[key] = newField;
		});
		return newFields;
	}, [fields, watchSplitAdvancedAmount, watchSplitType, item]);

	return (
		<>
			<Modal
				show={show}
				position="center"
				onClose={() => setShow(false)}
				onOuterClick={() => setShow(false)}
			>
				<div className={styles.modal_content}>
					<div className={styles.text}>Split Advanced Amount</div>
				</div>
				<Layout
					fields={controls}
					control={control}
					errors={errors}
				/>
				<div className={styles.button_container}>
					<Button themeType="primary" size="md" onClick={() => handleSubmit(submit)()}>
						Save
					</Button>
				</div>
			</Modal>
			<Popover
				placement="left"
				theme="light"
				content={(
					<Button themeType="tertiary" size="md" onClick={() => setShow(true)}>
						Split Advanced Amount
					</Button>
				)}
				interactive
			>
				<Button themeType="secondary" className="kebab_action" size="md">
					<IcMOverflowDot width={21} height={21} />
				</Button>
			</Popover>
		</>
	);
}

export default SplitAthAmountModal;
