import { Button } from '@cogoport/components';

import IP_STATE_CONDITONS from '../../../constants/IP_STATE_CONDITIONS';

import styles from './styles.module.css';

const actions = ({
	status = {},
	serviceListItem,
	addRate,
	setShowModal = () => {},
	setItem = () => {},
	stakeholderConfig = {},
}) => {
	const isSameItem = serviceListItem.id === addRate?.item?.id;

	const actionButtonsConfig = stakeholderConfig?.additional_services?.action_buttons || {};

	const onClickSetItem = () => setItem({ serviceListItem, status });

	const ACTION_BUTTONS = {
		[addRate && isSameItem ? 'CLOSE' : 'ADD SELL PRICE']: {
			show    : ['quoted_by_service_provider', 'price_recieved'].includes(status.status),
			onClick : () => setShowModal('add_sell_price'),
		},
		[addRate && isSameItem ? 'CLOSE' : 'REVIEW PRICE']: {
			show: status?.status === 'charges_incurred'
				&& serviceListItem.add_to_sell_quotation === null,
			onClick: () => { onClickSetItem(); setShowModal('add_sell_price'); },
		},
		REALLOCATE: {
			show    : status?.status === 'cancelled_by_supplier' && !!actionButtonsConfig.reallocate,
			onClick : onClickSetItem,
		},
		'REVIEW COMMENTS': {
			show: status?.status === 'amendment_requested_by_importer_exporter'
				&& !!actionButtonsConfig.review_comments,
			onClick: () => { onClickSetItem(); setShowModal('add_sell_price'); },
		},
		[isSameItem ? 'CLOSE' : 'ADD IP']: {
			show: !IP_STATE_CONDITONS.includes(serviceListItem.state)
				|| !serviceListItem.invoice_preference,
			onClick: () => { onClickSetItem(); setShowModal('ip'); },
		},
	};

	const actionButton = Object.entries(ACTION_BUTTONS).find(([, button]) => button.show);

	return actionButton ? (
		<Button
			themeType="secondary"
			className={styles.action_button}
			onClick={actionButton[1].onClick}
			size="sm"
		>
			{actionButton[0]}
		</Button>
	) : false;
};

export default actions;
