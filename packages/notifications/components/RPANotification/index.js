import { isEmpty } from '@cogoport/utils';
import React from 'react';

import Notification from '../Notification';
import Empty from '../NotificationPopover/Empty';
import LoadingComp from '../NotificationPopover/Loader';

function RPANotification({
	rpaNotifications,
	rpaLoading,
	handleRpaNotificationClick,
	setShowRpa,
}) {
	let content = (rpaNotifications || []).map((item) => (
		<Notification
			// key={item?.id}
			key={item}
			className="small"
			item={item || []}
			handleNotificationClick={handleRpaNotificationClick}
			setShow={setShowRpa}
		/>
	));

	// if ((rpaNotifications || []).length === 0 && rpaLoading) {
	if (isEmpty(rpaNotifications) && rpaLoading) {
		content = <LoadingComp />;
	} else if (!rpaLoading && isEmpty(rpaNotifications)) {
		content = <Empty />;
	}
	return <div>{content}</div>;
}

export default RPANotification;
