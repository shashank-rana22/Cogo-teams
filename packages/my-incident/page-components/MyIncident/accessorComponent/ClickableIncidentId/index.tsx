import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import React from 'react';

import styles from './styles.module.css';

interface ItemProps {
	userIncidentStatus:string;
	referenceId:string;
	id:string;
	linkedIncidentId:string;
}
interface PropsType {
	itemData:ItemProps;
	setActiveTab:Function;
	setPayload:Function;
}

function ClickableIncidentId({ itemData, setActiveTab, setPayload }:PropsType) {
	const { userIncidentStatus, referenceId, linkedIncidentId } = itemData || {};
	const { push } = useRouter();
	const {
		user_data:UserData,
	} = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));

	const { user: { id:userId = '' } } = UserData;

	const handleTabChange = () => {
		setActiveTab('requested');
		setPayload(['raisedPayload', linkedIncidentId, userId]);
		push('/my-incident/requested');
	};
	return (
		<div className={styles.container}>

			{userIncidentStatus === 'RAISED_AGAIN'
				? (
					// eslint-disable-next-line jsx-a11y/no-static-element-interactions
					<div className={styles.clickable} onClick={handleTabChange}>
						{referenceId}
					</div>
				) : (
					<div>
						{referenceId}
					</div>
				)}
		</div>
	);
}

export default ClickableIncidentId;
