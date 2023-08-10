import { ResponsiveLine } from '@cogoport/charts/line';
import { TabPanel, Tabs } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { Image } from '@cogoport/next';

import { BUSINESS_TAB_OPTIONS } from '../../../../constants';
import useGetReferralBusinessAnalytics from '../../../../hooks/useGetReferralBusinessAnalytics';

import styles from './styles.module.css';

function RenderSliceTooltip({ item = {} }) {
	const { data } = item?.slice?.points?.[GLOBAL_CONSTANTS.zeroth_index] || {};
	return (
		<div className={styles.tooltip_div}>
			<div className={styles.title}>
				Date:
				<div className={styles.amount}>{data?.x}</div>
			</div>
			<div className={styles.title}>
				Count:
				<div className={styles.amount}>{data?.y}</div>
			</div>
		</div>
	);
}

function BusinessStats({ businessFilterType = {}, setBusinessFilterType = () => {}, selectedDate = {} }) {
	const { data: businessData = {}, loading = false } = useGetReferralBusinessAnalytics({
		selectedDate,
		businessFilterType,
		type: 'business',
	});

	const { count = {}, data = {} } = businessData || {};

	const { kyc_verified = 0, shipment = 0, subscription = 0 } = count || {};
	const totalShipmentIncentive = kyc_verified + shipment + subscription;

	const formatCount = {
		total: totalShipmentIncentive,
		kyc_verified,
		shipment,
		subscription,
	};

	const newData = Object.keys(data || {}).map((item) => ({
		x: formatDate({
			date       : item,
			dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM'],
			formatType : 'date',
		}),
		y: data[item] || GLOBAL_CONSTANTS.zeroth_index,
	}));

	const graphData = [
		{
			id   : 'date',
			data : newData.reverse(),
		},
	];

	return (
		<>
			<Tabs
				activeTab={businessFilterType.activityType}
				themeType="secondary-vertical"
				onChange={(val) => setBusinessFilterType((prev) => ({ ...prev, activityType: val }))}
			>
				{BUSINESS_TAB_OPTIONS.map((item) => {
					const { label, name } = item || {};
					return (
						<TabPanel name={name} title={label} badge={formatCount[name]} key={name} />
					);
				})}

			</Tabs>
			{businessFilterType.activityType && (
				<div className={styles.graph_div}>
					{loading ? (
						<Image
							src={GLOBAL_CONSTANTS.image_url.spinner_loader}
							width={50}
							height={50}
							alt="loader"
						/>
					) : (
						<ResponsiveLine
							data={graphData}
							margin={{ top: 30, right: 45, bottom: 40, left: 48 }}
							xScale={{ type: 'point' }}
							yScale={{
								type    : 'linear',
								min     : 'auto',
								max     : 'auto',
								stacked : true,
								reverse : false,
							}}
							yFormat=" >-.2f"
							axisTop={null}
							axisRight={null}
							axisBottom={{
								tickSize     : 5,
								tickPadding  : 5,
								tickRotation : 0,
							}}
							axisLeft={{
								tickSize     : 5,
								tickPadding  : 5,
								tickRotation : 0,
							}}
							enableGridX={false}
							enablePoints={false}
							pointSize={10}
							pointColor={{ theme: 'background' }}
							pointBorderWidth={2}
							pointBorderColor={{ from: 'serieColor' }}
							pointLabelYOffset={-12}
							useMesh
							legends={[]}
							enableSlices="x"
							sliceTooltip={(item) => <RenderSliceTooltip item={item} />}
						/>
					)}
				</div>
			)}
		</>
	);
}

export default BusinessStats;
