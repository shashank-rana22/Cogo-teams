import { useState } from 'react';

import Card from '../Card';

import CreateNotifyingPary from './CreateNotifyingParty';
import Detail from './Detail';

function NotifyingParty({ tradePartnersData = {} }) {
	const { notify_parties_detail = [], list:tradePartnerList = [] } = tradePartnersData;

	const showCondition = notify_parties_detail.length;

	const [show, setShow] = useState(showCondition);

	return (
		<Card title="Notifying Party" showEdit>
			<div>
				<div>Action</div>
			</div>
			{show ? <Detail /> : <CreateNotifyingPary tradePartnerList={tradePartnerList} />}

		</Card>
	);
}
export default NotifyingParty;
