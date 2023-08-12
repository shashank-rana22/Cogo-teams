import { Button, ButtonIcon, Modal, Popover } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { Layout } from '@cogoport/surface-modules';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';
import React, { useState, useEffect } from 'react';

import getDefaultValues from '../../../../../../utils/get-default-values';
import controls from '../../../../configs/splitAmountControls';
import { checkForAth } from '../../../../utils/athHelper';

import styles from './styles.module.css';

function SplitAthAmount({ item = {}, setFinalGetHookData = () => {} }) {
	const [visible, setVisible] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [idx, setIdx] = useState(GLOBAL_CONSTANTS.zeroth_index);

	const defaultValues = getDefaultValues(controls);
	const { control, formState: { errors }, watch, handleSubmit } = useForm({ defaultValues });

	const formValues = watch();

	if (showModal) {
		controls.forEach((ctrl) => {
			if (ctrl?.type === 'fieldArray') {
				ctrl?.controls?.forEach((subControl) => {
					const tempControl = subControl;
					if (subControl.name === 'trade_party_id') {
						tempControl.params = {
							filters: {
								organization_id  : item?.service_provider_id,
								trade_party_type : formValues?.split_advanced_amount?.[idx]?.split_type === 'self'
									? 'self' : undefined,
							},
						};
					}
				});
			}
		});
	}

	const submit = (val) => {
		const { checked, err } = checkForAth(val?.split_advanced_amount, item);

		if (!checked) {
			toastApiError(err);
			return;
		}

		const tempItem = item;
		tempItem.split_advanced_amount = val?.split_advanced_amount;
		setFinalGetHookData((prev) => ({ ...prev }));
		setShowModal(false);
	};

	useEffect(() => {
		const subscription = watch((value, { name }) => {
			const [controlName, index, controlSubName] = name.split('.');
			if (
				controlName === 'split_advanced_amount'
				&& controlSubName === 'split_type'
			) {
				setIdx(index);
			}
		});
		return () => subscription.unsubscribe();
	}, [watch]);

	return (
		<div>
			<Popover
				placement="left"
				visible={visible}
				onClickOutside={() => setVisible(false)}
				content={(
					<Button
						themeType="linkUi"
						size="md"
						onClick={() => {
							setVisible(false);
							setShowModal(true);
						}}
					>
						Split Advanced Amount
					</Button>
				)}
				interactive
			>
				<ButtonIcon
					onClick={() => setVisible((prev) => !prev)}
					themeType="accent"
					icon={<IcMOverflowDot height={21} width={21} color="#C26D1A" />}
					size="md"
					className={styles.pop_btn}
				/>
			</Popover>
			{showModal ? (
				<Modal show={showModal} onClose={() => setShowModal(false)}>
					<Modal.Header title="Split ATH Amount" />
					<Modal.Body>
						<Layout control={control} fields={controls} errors={errors} />
					</Modal.Body>
					<Modal.Footer>
						<Button
							themeType="primary"
							size="md"
							onClick={handleSubmit(submit)}
						>
							Save
						</Button>
					</Modal.Footer>
				</Modal>
			) : null}
		</div>
	);
}

export default SplitAthAmount;
