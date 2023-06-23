import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import styles from './styles.module.css';

const ACTION_BUTTON_ONCLICK_INDEX = 1;

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
	};

	const actionButton = Object.entries(ACTION_BUTTONS).find(([, button]) => button.show);

	return actionButton ? (
		<Button
			themeType="secondary"
			className={styles.action_button}
			onClick={actionButton[ACTION_BUTTON_ONCLICK_INDEX].onClick}
			size="sm"
		>
			{actionButton[GLOBAL_CONSTANTS.zeroth_index]}
		</Button>
	) : false;
};

export default actions;
