import { Button } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import POC_WORKSCOPE_MAPPING from '../../../../../contants/POC_WORKSCOPE_MAPPING';
import Card from '../../Card';

import LabelValue from './LabelValue';
import styles from './styles.module.css';

function TradeParty({ data = {}, title = '', setAddCompany = () => {}, setAddPoc = () => {}, rolesPermission = {} }) {
	const [show, setShow] = useState({});

	const editPermission = rolesPermission?.can_edit || [];

	const {
		trade_partner_details:{
			business_name = '',
			poc_data = {},
		} = {},
		address = [],
		trade_party_type = '',
		trade_party_id = '',
	} = data;
	const { address:first_address = '' } = address[0] || {};

	const mapping = {
		Name         : poc_data?.name || '',
		'Contact No' : `${poc_data?.mobile_country_code || ''} ${poc_data?.mobile_number}`,
		Email        : poc_data?.email || '',
		Workscope    : (poc_data?.work_scopes || []).map((i) => POC_WORKSCOPE_MAPPING[i]).join(', '),

	};

	const editAction = () => {
		setAddCompany({ trade_party_type });
	};

	return (
		<Card
			title={title}
			showEdit={editPermission?.includes(trade_party_type)}
			editAction={editAction}
		>
			<div>
				<div className={styles.header}>
					<div className={styles.business_name}>{business_name}</div>
					<div>
						{isEmpty(poc_data)
							? (
								<Button
									size="sm"
									onClick={() => {
										setAddPoc({
											poc_type: 'tradeParty',
											business_name,
											trade_party_type,
											trade_party_id,
										});
									}}
									themeType="accent"
								>
									+ ADD POC
								</Button>
							)
							: (
								<Button
									themeType="linkUi"
									onClick={() => { setShow({ ...show, [title]: !show[title] }); }}
								>
									{show[title] ? <IcMArrowRotateUp /> : <IcMArrowRotateDown />}
								</Button>
							)}
					</div>
				</div>

				{first_address ? <div className={styles.address}>{`Address : ${first_address}`}</div> : null}

				{!isEmpty(poc_data) && show[title]
					? (
						<div className={styles.detail_card}>
							{Object.keys(mapping).map((key) => <LabelValue label={key} value={mapping[key]} />)}
						</div>
					) : null}
			</div>
		</Card>
	);
}

export default TradeParty;
