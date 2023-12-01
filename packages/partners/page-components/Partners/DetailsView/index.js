import { Button } from '@cogoport/components';
import { useGetPermission } from '@cogoport/request';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import useCreateUpdatePartner from '../../../hooks/useCreateUpdatePartner';
import CC from '../../../utils/condition-constants';

import CreatePartner from './createPartner';
import DetailedView from './detailedView';
import EmptyView from './emptyView';
import styles from './styles.module.css';
import UpdatePartner from './updatePartner';
import UpdateStatus from './updateStatus';

const ZERO = 0;
function DetailsView({
	setClickedItem = () => {},
	clickedItem = {}, view = '', setView = () => {},
	entityType = 'channel_partner',
	setEntityType = () => {},
	refetch = () => {},
}) {
	const { isAuthorizeToSee:AuthorizedToSee, isChannelPartner } = useGetPermission();
	const HEADING = {
		create   : 'Create Channel Partner',
		update   : 'Edit Cogoport Entity',
		details  : 'DETAILS',
		active   : 'Update Status',
		inactive : 'Update Status',
		empty    : 'DETAILS',

	};

	const router = useRouter();
	const { setUrl, createUpdatePartner, apiData } = useCreateUpdatePartner();
	useEffect(() => {
		if (entityType === 'channel_partner') {
			setUrl('onboard_partner');
		} else {
			setUrl('create_partner');
		}
	}, [setUrl, entityType]);

	const onBuyNow = () => {
		const baseUrl = `${window.location.origin}/${router.query.partner_id}/`;
		const PATH = 'pricing/spot-negotiation/';
		const PAYMENT = '/partners';

		const url = new URL(baseUrl);
		url.pathname += PATH;
		url.search = `afterPaymentUrl=${encodeURIComponent(PAYMENT)}`;

		window.location.href = url.toString();
	};
	return (
		<div className={styles.details_body}>
			<div className={styles.header}>
				<div>{HEADING[view]}</div>
				{view === 'details' ? (
					<div className={styles.btn_panel}>
						{!isChannelPartner ? (
							<Button
								onClick={() => onBuyNow()}
								size="sm"
								themeType="secondary"
								className={styles.first_btn}
							>
								Buy Enquiry

							</Button>
						) : null}
						<AuthorizedToSee conditions={CC.SEE_ALL_USERS} type="or">
							<Button
								onClick={() => setView(clickedItem.status)}
								className={styles.mid_btn}
								size="sm"
								themeType="secondary"
							>
								{clickedItem.status === 'active' ? 'Deactivate' : 'Activate'}

							</Button>
						</AuthorizedToSee>
						<Button
							onClick={() => {
								setView('update'); setUrl('update_partner');
								setEntityType(clickedItem?.entity_types?.[ZERO]);
							}}
							size="sm"
						>
							Update

						</Button>
					</div>
				) : null }

			</div>
			<div className={styles.details}>
				{view === 'create' ? (
					<CreatePartner
						setView={setView}
						setClickedItem={setClickedItem}
						entityType={entityType}
						setEntityType={setEntityType}
						createUpdatePartner={createUpdatePartner}
						refetch={refetch}
						apiData={apiData}
					/>
				) : null}
				{view === 'details' ? (
					<DetailedView
						clickedItem={clickedItem}
					/>
				) : null}
				{view === 'empty' ? (
					<EmptyView />
				) : null}
				{view === 'update' ? (
					<UpdatePartner
						setView={setView}
						setClickedItem={setClickedItem}
						clickedItem={clickedItem}
						entityType={entityType}
						createUpdatePartner={createUpdatePartner}
						refetch={refetch}
						apiData={apiData}
					/>
				) : null}
				{view === clickedItem.status ? (
					<UpdateStatus
						setView={setView}
						clickedItem={clickedItem}
						refetch={refetch}
					/>
				) : null}
			</div>
		</div>
	);
}
export default DetailsView;
