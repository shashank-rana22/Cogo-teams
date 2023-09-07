import { FunnelStepper, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import BasicInformation from './BasicInformation/BasicInformation';
import TermsAndCondition from './TermsAndCondition';
import useModalContentForAddingDetails from './useModalContentForAddingDetails';

const CREATION_STEPS_MAPPING = {
	basicInfo: {
		key            : 'basicInfo',
		label          : 'Basic Info',
		ComponentLevel : BasicInformation,
	},
	termsAndCondition: {
		key            : 'termsAndCondition',
		label          : 'Terms & Conditions',
		ComponentLevel : TermsAndCondition,
	},
};
function CreateTerm(props) {
	const {
		tncLevel,
		setTncLevel,
		editFormValue,
		editTncModalId,
		setEditTncModalId,
	} = props;

	const action = isEmpty(editTncModalId) ? 'create' : 'update';
	const {
		formProps,
		showElements,
		control,
		newControl,
	} = useModalContentForAddingDetails({
		action,
		tncLevel,
		editFormValue,
	});

	const componentProps = {
		action,
		...props,
		setTncLevel,
		formProps,
		showElements,
		control,
		newControl,
	};
	const Component = CREATION_STEPS_MAPPING[tncLevel]?.ComponentLevel;

	const items = [
		{ title: 'Basic Info', key: 'basicInfo' },
		{ title: 'Terms And Condition', key: 'termsAndCondition' },
	];

	return (
		<div>
			<Modal
				size="md"
				show={!!editTncModalId}
				onClose={() => setEditTncModalId(null)}
				placement="center"
			>
				<Modal.Header title="Create Terms and Condition" />
				<Modal.Body>
					<FunnelStepper active={tncLevel} items={items} />
					<form />
					{Component ? (
						<Component
							key={tncLevel}
							{...componentProps}
							label={CREATION_STEPS_MAPPING[tncLevel]?.label}
						/>
					) : null}
				</Modal.Body>
				{/*
				<Modal.Footer>
					<Button onClick={onClose}>OK</Button>
				</Modal.Footer> */}
			</Modal>
		</div>
	);
}

export default CreateTerm;
