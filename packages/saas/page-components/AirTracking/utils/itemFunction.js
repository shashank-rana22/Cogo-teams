import { Checkbox, Toggle, Button } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import { isEmpty, upperCase } from '@cogoport/utils';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatDate from '@/ui/commons/utils/formatDate';

const style = {
	cursor        : 'pointer',
	marginLeft    : '6px',
	verticalAlign : 'middle',
};

const itemFunction = ({
	status = '', statusChangeHandler = () => {},
	loading = false, selectedShipments, checkboxChangeHandler, editHandler,
	activeTab = 'ocean', redirectToTracker = () => {}, t,
}) => ({
	renderName: (itemData) => {
		const { poc_details = {} } = itemData || {};
		return <span>{poc_details?.name}</span>;
	},
	renderStatus: () => (
		<Toggle size="md" checked={status} onChange={statusChangeHandler} disabled={loading} />
	),
	renderDate: (itemData, config) => (
		formatDate({
			date       : itemData?.[config.key],
			dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			formatType : 'date',
		})
	),
	renderEdit: (itemData, config) => (
		<span>
			{itemData?.[config.key]}
			<IcMEdit
				width={12}
				height={12}
				style={style}
				onClick={() => editHandler({ itemData, key: config.key })}
			/>
		</span>
	),
	renderCheckbox: (itemData) => (
		<Checkbox
			checked={selectedShipments.includes(itemData?.id)}
			onChange={(e) => checkboxChangeHandler({ id: itemData?.id, val: e.target.checked })}
			disabled={loading}
		/>
	),
	renderDataTime: (itemData, config) => (
		<span>
			{formatDate({
				date       : itemData?.[config.key],
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
				formatType : 'dateTime',
			})}
		</span>
	),
	renderShipperConsignee: (itemData, config) => {
		const { poc_details = [] } = itemData || {};
		if (isEmpty(poc_details)) return '--';

		const filteredArr = poc_details.filter((item) => item?.user_type === upperCase(config?.key));
		return <span>{filteredArr[0]?.name || '--'}</span>;
	},
	renderPortPair: (itemData) => {
		const { itinerary = [] } = itemData || {};
		return (
			<span>
				{`${itinerary?.origin || 'Origin'} > ${itinerary?.destination || 'Destination'} `}
			</span>
		);
	},
	renderViewMore: (itemData) => {
		const { id = '' } = itemData || {};
		return (
			<Button
				themeType="linkUi"
				type="button"
				onClick={() => redirectToTracker({ type: activeTab, id, fromDashBoard: true })}
			>
				{t('airOceanTracking:tracking_table_view_button_label')}
			</Button>
		);
	},
	renderCurrentStatus    : (itemData, config) => <span>{itemData?.[config.key] || '--'}</span>,
	renderCurrentStatusAir : (itemData) => {
		const { milestones = {} } = itemData || {};
		return (
			<span>{milestones?.current_milestone || '--'}</span>
		);
	},
	renderRoute: (itemData) => {
		const { destination_country = '', origin_country = '' } = itemData || {};
		return (
			<span>{destination_country && origin_country ? `${origin_country} > ${destination_country}` : '--'}</span>
		);
	},
});

export default itemFunction;
