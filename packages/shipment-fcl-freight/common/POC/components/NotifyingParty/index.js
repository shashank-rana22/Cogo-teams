import { useState, useEffect } from 'react';

import Card from '../Card';

import CreateNotifyingPary from './CreateNotifyingParty';
import Detail from './Detail';

function NotifyingParty({ tradePartnersData = {} }) {
	const { notify_parties_detail = [], list:tradePartnerList = [] } = tradePartnersData;

	const showCondition = notify_parties_detail.length;

	const [show, setShow] = useState(showCondition);

	useEffect(() => {
		setShow(showCondition);
	}, [showCondition]);

	return (
		<Card title="Notifying Party" showEdit={showCondition}>
			{show ? <Detail data={notify_parties_detail} />
				: <CreateNotifyingPary tradePartnerList={tradePartnerList} />}

		</Card>
	);
}
export default NotifyingParty;
