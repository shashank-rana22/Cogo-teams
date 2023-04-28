import { useRouter } from '@cogoport/next';
import { useEffect } from 'react';

import useRpaMail from './useRpaMail';

const useTaskRpa = ({ task, setSelectedMail }) => {
	let entity_type = 'booking_note';
	if (task.task === 'upload_draft_bill_of_lading') {
		entity_type = 'bill_of_lading';
	} else if (task.task === 'upload_si') {
		entity_type = 'shipping_instruction';
	} else if (task.task === 'upload_bill_of_lading') {
		entity_type = 'bill_of_lading';
	}
	const router = useRouter();
	const mailId = router.query?.mail_id || task?.mail_id;
	const { data, mailLoading } = useRpaMail({ mailId, entity_type });

	useEffect(() => {
		if (mailId && !mailLoading && Object.keys(data.formatted).length) {
			setSelectedMail(data);
		}
	}, [mailId, mailLoading, data, setSelectedMail]);
	return {
		mailLoading,
	};
};

export default useTaskRpa;
