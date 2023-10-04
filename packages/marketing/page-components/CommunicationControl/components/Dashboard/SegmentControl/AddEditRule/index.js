import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useState } from 'react';

import Layout from '../../../../common/Layout';
import getControls from '../../../../configurations/add-edit-rule-controls';
import removeObjEmptyValue from '../../../../utils/removeObjEmptyValue';

function AddEditRule(
	{
		showAddModal = '', setShowAddModal = () => {}, submit = () => {}, loading = '', title = '', item = {},
	},
) {
	const [segmentData, setSegmentData] = useState({});
	const isEdit = title === 'Edit';

	const modifiedControls = getControls({ setSegmentData, isEdit, itemVal: item });

	const { control, watch, formState: { errors }, handleSubmit, reset } = useForm();

	const formValues = watch();
	const action_type = formValues?.actions;
	const sub_action = formValues?.sub_action;

	const SHOW_ELEMENTS = {
		sub_action     : action_type === 'stop',
		day            : action_type === 'dnd',
		day_start_time : action_type === 'dnd',
		day_end_time   : action_type === 'dnd',
		validity_start : (action_type === 'stop' && sub_action === 'fixed'),
		validity_end   : (action_type === 'stop' && sub_action === 'fixed'),
	};
	const onSubmit = () => {
		const PAYLOAD_ADD = {
			...removeObjEmptyValue(formValues),
			status            : 'active',
			segmentation_name : segmentData?.name,
			id                : item?.id,
		};
		if (action_type === 'dnd') {
			PAYLOAD_ADD.day_start_time = formValues?.day_start_time?.toISOString();
			PAYLOAD_ADD.day_end_time = formValues?.day_end_time?.toISOString();
			PAYLOAD_ADD.sub_action = formValues?.day;
		} else if (action_type === 'stop' && sub_action === 'fixed') {
			PAYLOAD_ADD.validity_start = formValues?.validity_start?.toISOString();
			PAYLOAD_ADD.validity_end = formValues?.validity_end?.toISOString();
		}
		if (isEdit) {
			submit(PAYLOAD_ADD, true);
		} else {
			submit(PAYLOAD_ADD);
		}
		setShowAddModal(false);
		reset();
	};

	return (
		<div>
			{showAddModal ? (
				<Modal
					show={showAddModal}
					onClose={() => { setShowAddModal(false); }}
					placement="top"
				>
					<Modal.Header title={`${title} Rule`} />
					<Modal.Body
						style={{ minHeight: 350 }}
					>
						<Layout
							control={control}
							controls={modifiedControls}
							errors={errors}
							showElements={SHOW_ELEMENTS}
						/>
					</Modal.Body>
					<Modal.Footer>
						<Button
							themeType="secondary"
							style={{ marginRight: 5 }}
							onClick={() => {
								setShowAddModal(false);
								reset();
							}}
						>
							CANCEL
						</Button>
						<Button
							onClick={
						handleSubmit(onSubmit)
					}
							disabled={loading}
						>
							SAVE
						</Button>
					</Modal.Footer>
				</Modal>
			) : null}
		</div>
	);
}
export default AddEditRule;
