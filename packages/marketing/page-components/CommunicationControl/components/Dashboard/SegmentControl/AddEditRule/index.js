import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useState } from 'react';

import Layout from '../../../../common/Layout';
import getControls from '../../../../configurations/add-edit-rule-controls';

function AddEditRule({ showAddModal = '', setShowAddModal = () => {} }) {
	const [segmentData, setSegmentData] = useState({});
	const modifiedControls = getControls(setSegmentData);

	const DEFAULT_VALUES = {};

	modifiedControls.forEach((ctrl) => { DEFAULT_VALUES[ctrl.name] = ctrl?.value || ''; });

	const { control, watch, formState: { errors }, handleSubmit } = useForm({ defaultValues: DEFAULT_VALUES });

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

	};

	return (
		<Modal
			show={showAddModal}
			onClose={() => { setShowAddModal(false); }}
			placement="top"
		>
			<Modal.Header title="Add Rule" />
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
					disabled={segmentData}// remove later
				>
					CANCEL
				</Button>
				<Button
					onClick={handleSubmit(onSubmit)}
				>
					SAVE
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
export default AddEditRule;
