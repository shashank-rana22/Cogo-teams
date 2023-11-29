import { Button, Modal } from '@cogoport/components';
import { CheckboxController, useForm } from '@cogoport/forms';
import React from 'react';

import useUpdateMargin from '../../../../hooks/useUpdateMargin';

function UpdateDicountSetting({
	show = false,
	setShow = () => { },
	marginBreakupData = {},
	refetch = () => { },
}) {
	const handleCloseModal = () => {
		setShow(false);
		refetch();
	};

	const { onSubmit = () => { } } = useUpdateMargin({ onSuccess: handleCloseModal });

	const { control, handleSubmit } = useForm();

	return (
		<Modal show={show} showCloseIcon onClose={() => setShow(false)} placement="top">
			<Modal.Header title="Update Settings" />

			<Modal.Body>
				<div style={{ display: 'flex' }}>
					<CheckboxController
						control={control}
						name="is_sales_discount_allowed"
						label="Is Sales Discount Allowed"
						value={marginBreakupData?.is_sales_discount_allowed}
					/>
					<CheckboxController
						control={control}
						name="is_marketing_discount_allowed"
						label="Is Marketing Discount Allowed"
						value={marginBreakupData?.is_marketing_discount_allowed}
					/>
				</div>
			</Modal.Body>

			<Modal.Footer>
				<Button
					onClick={handleSubmit((val) => onSubmit({
						data: {
							id: marginBreakupData?.id,
							...val,
						},
					}))}
					themeType="secondary"
				>
					Update Discount Setting
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default UpdateDicountSetting;
