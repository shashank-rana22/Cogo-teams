import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import {
	IcMArrowRotateDown,
	IcMArrowRotateUp,
} from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import useGetWallet from '../../../../hook/useGetWallet';
import Details from '../Details/index';
import GetPills from '../GetPills';

import styles from './styles.module.css';

const DEFAULT_AMOUNT = 0;

function DetailsCard({
	onTabClick = () => {},
	loadingShipment = false,
	onAccept = () => {},
	shipmentDetailsTab = false,
	shipmentDetailsCheck = false,
	dataList = [],
}) {
	const arrowElement = shipmentDetailsTab ? <IcMArrowRotateUp height="17px" width="17px" />
		: <IcMArrowRotateDown height="17px" width="17px" />;

	const shipmentId = dataList?.id || '';
	const { data: dataWallet } = useGetWallet(shipmentId);
	const {
		agent_data: agentData,
		agent_role_data: agentRoleData,
		amount,
		amount_currency: amountCurrency,
	} = dataWallet?.list?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	const { source, trade_type: tradeType } = dataList;

	const sourceText = source === 'direct' ? 'Sell Without Buy' : startCase(source);
	return (
		<div className={styles.card}>
			<div
				className={styles.card_upper}
				onClick={() => onTabClick({ tabName: 'shipmentDetailsTab' })}
				role="presentation"
			>
				<div className={styles.sub_container}>
					Details
					<div className={styles.tags_container}>
						<GetPills
							loadingShipment={loadingShipment}
							sourceText={sourceText}
							tradeType={tradeType}
						/>
					</div>
					{dataWallet?.list?.[GLOBAL_CONSTANTS.zeroth_index] && (
						<div className={styles.data}>
							<div className={styles.kam_data}>KAM -</div>
							<div>
								{agentData?.name || ''}
								(
								{agentRoleData?.name || ''}
								)
							</div>
							<div className={styles.kam_data}>Wallet Usage - </div>
							<div>
								{amountCurrency || ''}

								{amount || DEFAULT_AMOUNT}
							</div>
						</div>
					)}
				</div>
				<div
					className={styles.caret}
					role="presentation"
				>
					{arrowElement}
				</div>
			</div>

			{shipmentDetailsTab && (
				<div className={styles.shipment_container_section}>
					<div className={styles.details}>
						<Details
							dataList={dataList}
							shipmentId={shipmentId}
						/>
					</div>
					<Button
						size="md"
						themeType="secondary"
						style={{ marginRight: '8px' }}
						disabled={shipmentDetailsCheck}
						onClick={() => onAccept({
							tabName      : 'shipmentDetailsTab',
							tabToOpen    : 'documentsTab',
							timelineItem : 'shipmentDetailsCheck',
						})}
						className={styles.approve_button}
					>
						Approve
					</Button>
				</div>
			)}
		</div>
	);
}

export default DetailsCard;
