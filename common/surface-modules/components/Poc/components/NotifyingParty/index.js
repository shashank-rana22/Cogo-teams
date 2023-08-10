import { useState, useEffect } from 'react';

import Card from '../Card';

import CreateNotifyingPary from './CreateNotifyingParty';
import Detail from './Detail';

function NotifyingParty({
	tradePartnersData = {}, shipment_id = '', tradePartnerTrigger = () => {},
	rolesPermission = {},
}) {
	const editPermission = rolesPermission?.can_edit || [];
	const { notify_parties_detail = [], list:tradePartnerList = [] } = tradePartnersData;

	const showCondition = notify_parties_detail.length;

	const [show, setShow] = useState(showCondition);

	useEffect(() => {
		setShow(showCondition);
	}, [showCondition]);

	const editAction = () => {
		setShow(!show);
	};

	return (
		<Card
			title="Notifying Party"
			showEdit={showCondition && editPermission?.includes('notifying_party')}
			editAction={editAction}
		>
			{show ? <Detail data={notify_parties_detail} />
				: (
					<CreateNotifyingPary
						tradePartnerList={tradePartnerList}
						shipment_id={shipment_id}
						tradePartnerTrigger={tradePartnerTrigger}
						setShow={setShow}
					/>
				)}

		</Card>
	);
}
export default NotifyingParty;
