import { isEmpty } from '@cogoport/utils';

import { getOperatorOptions, getOptions } from '../utils/getOperatorOptions';

const getFilterControls = ({
	operatorHash = {}, shippersList = [],
	consigneesList = [], booked_with_cogoport = [], activeTab = 'ocean', t,
}) => {
	const TITLE = {
		ocean : t('airOceanTracking:tracking_filter_controls_label_1'),
		air   : t('airOceanTracking:tracking_filter_controls_label_2'),
	};

	return [
		{
			name        : 'operatorId',
			type        : 'multi_select',
			placeholder : `${t('airOceanTracking:tracking_filter_controls_select_placeholder')} ${TITLE[activeTab]}`,
			label       : TITLE[activeTab],
			options     : getOperatorOptions({ operatorHash }),
			show        : !isEmpty(operatorHash),
			size        : 'sm',
			isClearable : true,
		},
		{
			name        : 'shipperId',
			type        : 'multi_select',
			placeholder : t('airOceanTracking:tracking_filter_controls_placeholder_1'),
			label       : t('airOceanTracking:tracking_filter_controls_label_3'),
			options     : getOptions(shippersList),
			show        : !isEmpty(shippersList),
			size        : 'sm',
			isClearable : true,
		},
		{
			name        : 'consigneeId',
			type        : 'multi_select',
			placeholder : t('airOceanTracking:tracking_filter_controls_placeholder_2'),
			label       : t('airOceanTracking:tracking_filter_controls_label_4'),
			options     : getOptions(consigneesList),
			show        : !isEmpty(consigneesList),
			size        : 'sm',
			isClearable : true,
		},
		{
			name    : 'bookWithCogo',
			type    : 'chips',
			label   : t('airOceanTracking:tracking_filter_controls_label_5'),
			options : [{
				key      : 'bookWithCogo',
				children : t('airOceanTracking:tracking_filter_controls_label_chip_label'),
			}],
			show: !isEmpty(booked_with_cogoport),
		},
	];
};

export default getFilterControls;
