import { Button, Popover } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useGetSpoetSearches from '../../../../hooks/useGetSpoetSearches';
import useListLocationExpertServiceProvider from '../../../../hooks/useListLocationExpertServiceProvider';

import styles from './styles.module.css';
import ViewFiles from './ViewFiles';
import ViewMoreServices from './ViewMoreServices';
import ViewRates from './ViewRates';
import ViewRevertedRates from './ViewRevertedRates';
import ViewSuggestedServices from './ViewSuggestedServices';

function ServicesDetails({ data = {}, source = {}, filter = {}, getFeedback = () => {}, feedbackData = [] }) {
	const [showPopover, setShowPopover] = useState(false);
	const [page, setPage] = useState(1);
	const user_id = useSelector(({ profile }) => profile.id);
	const { serviceList, getData, spot_data } =	useGetSpoetSearches({ id: data?.source_id });
	const {
		data: listview,
		loading,
	} = useListLocationExpertServiceProvider({
		cogo_entity_id                            : data.cogo_entity_id,
		service_expertise_destination_location_id : data.destination_port_id,
		service_expertise_origin_location_id      : data.origin_port_id,
		supply_agent_id                           : user_id,
		showPopover,
		page,
	});

	const rateList = source === 'rate_feedback'
		? Object.values(feedbackData?.list?.[0]?.booking_params?.rate_card?.service_rates || [])
		: [];

	const customer_name = spot_data?.importer_exporter?.business_name || undefined;

	return (
		<div className={styles.container}>

			{source === 'rate_feedback'
			&& (
				<div>
					<Popover
						theme="light"
						content={<ViewRates rateList={rateList} />}
						interactive
						maxWidth="none"
						animation="perspective"
					>
						<Button
							size="md"
							themeType="link"
							onClick={getFeedback}
						>
							View Disliked Rate
						</Button>
					</Popover>
				</div>
			)}

			{!isEmpty(data?.reverted_rate_data) && (
				<div>
					<Popover
						theme="light"
						content={(
							<ViewRevertedRates
								revertedRateData={data?.reverted_rate_data}
							/>
						)}
						interactive
						maxWidth="none"
						animation="perspective"
					>
						<Button
							size="md"
							themeType="link"
						>
							View Reverted Rates

						</Button>
					</Popover>
				</div>
			)}

			<Popover
				theme="light"
				content={(
					<ViewMoreServices
						serviceList={serviceList}
						customer_name={customer_name}
					/>
				)}
				interactive
				maxWidth="none"
				animation="perspective"
			>
				<Button
					size="md"
					themeType="link"
					onClick={() => {
						getData();
					}}
				>
					View all Services
				</Button>
			</Popover>

			{filter?.service === 'fcl_freight' ? (
				<Popover
					theme="light"
					content={(
						<ViewSuggestedServices
							listview={listview}
							page={page}
							setPage={setPage}
							loading={loading}
								// handleAddRate={handleAddRate}
							setShowPopover={setShowPopover}
						/>
					)}
					interactive
					maxWidth="20vw"
					animation="scale"
				>
					<Button
						size="md"
						themeType="link"
						onClick={() => {
							setShowPopover(true);
						}}
					>
						Suggested Service Provider
					</Button>
				</Popover>
			) : null}

			<div>
				<Popover
					theme="light"
					content={<ViewFiles urlList={feedbackData?.list?.[0]?.attachment_file_urls || []} />}
					interactive
					maxWidth="none"
					animation="shift-away"
					placement="bottom-end"
				>
					<Button
						size="md"
						themeType="link"
						onClick={getFeedback}
					>
						Attached files
					</Button>
				</Popover>
			</div>

		</div>
	);
}

export default ServicesDetails;
