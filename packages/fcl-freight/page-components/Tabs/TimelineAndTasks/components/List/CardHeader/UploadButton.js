import React from 'react';
import RPASearch from '@cogo/business-modules/rpa/components/Search/PopoverSearch';
import rpaSupportedTasks from '@cogo/business-modules/rpa/constants/rpa-supported';
import { UploadButton } from './styles';

function UpdateButton({
	handleClick,
	task,
	handleChange,
	isMainServiceCancelled,
	buttonText,
	shipment_type,
	show,
}) {
	if (
		rpaSupportedTasks.includes(task.task) &&
		(task.task !== 'upload_booking_note' || shipment_type === 'fcl_freight')
	) {
		return (
			<RPASearch
				onManualUpload={() => handleClick(task)}
				multiple
				entity_type={task?.task}
				onUpload={handleChange}
			>
				<UploadButton disabled={isMainServiceCancelled}>
					{!show ? buttonText : 'Close'}
				</UploadButton>
			</RPASearch>
		);
	}
	return (
		<UploadButton
			disabled={isMainServiceCancelled}
			onClick={() => handleClick(task)}
		>
			{!show ? buttonText : 'Close'}
		</UploadButton>
	);
}

export default UpdateButton;
