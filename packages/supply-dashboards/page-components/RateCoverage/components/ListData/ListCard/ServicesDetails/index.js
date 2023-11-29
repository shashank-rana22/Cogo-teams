import { Button, Placeholder, Popover } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useListLocationExpertServiceProvider from '../../../../hooks/useListLocationExpertServiceProvider';

import styles from './styles.module.css';
import ViewFiles from './ViewFiles';
import ViewMoreServices from './ViewMoreServices';
import ViewRates from './ViewRates';
import ViewRevertedRates from './ViewRevertedRates';
import ViewSuggestedServices from './ViewSuggestedServices';

const LOADER_COUNT = 3;

function Loader() {
	return (
		<>
			{[...new Array(LOADER_COUNT).keys()].map((index) => (
				<Placeholder
					height="4vh"
					key={index}
					width={400}
					style={{ marginTop: '10px' }}
				/>
			))}
		</>
	);
}

function ServicesDetails({
	data = {}, source = {}, filter = {},
	serviceIdPresent = {},
	setShowAddRateModal = () => {},
	setServiceIdPresent = () => {},
	getRequest = () => {},
	serviceList = [],
	loadingSpotSearch = false,
	spot_data = {},
	showServicePopover = false,
	setShowServicePopover = () => {},
	feedbackData = {},
	getFeedback = () => {},
	feedback_loading = false,
}) {
	const [showPopover, setShowPopover] = useState(false);
	const [page, setPage] = useState(1);
	const user_id = useSelector(({ profile }) => profile.id);

	const {
		data: listview,
		loading,
		fetch = () => {},
	} = useListLocationExpertServiceProvider({
		cogo_entity_id                            : data.cogo_entity_id,
		service_expertise_destination_location_id : data.destination_port_id,
		service_expertise_origin_location_id      : data.origin_port_id,
		supply_agent_id                           : user_id,
		page,

	});

	const rateList = source === 'rate_feedback'
		? Object.values(feedbackData?.list?.[0]?.booking_params?.rate_card?.service_rates || [])
		: [];

	const customer_name = spot_data?.importer_exporter?.business_name || undefined;

	const handelSuggestedRates = () => {
		if (serviceIdPresent) {
			setShowPopover(false);
		}
		setShowPopover(true);
		fetch();
	};

	const handelServices = () => {
		setShowServicePopover((p) => !p);
		if (!showServicePopover) {
			if (source === 'rate_feedback') {
				getFeedback();
			}
			if (source === 'rate_request') {
				getRequest();
			}
		}
	};

	return (
		<div className={styles.container}>
			{source === 'rate_feedback'
			&& (
				<div>
					<Popover
						placement="top"
						render={feedback_loading ? <Loader /> : <ViewRates rateList={rateList} />}
					>
						<Button
							size="md"
							themeType="link"
							onClick={() => getFeedback()}
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
				render={loadingSpotSearch
					? <Loader /> : <ViewMoreServices serviceList={serviceList} customer_name={customer_name} />}
				interactive
				maxWidth="none"
				animation="perspective"
				visible={showServicePopover}
				onClickOutside={() => setShowServicePopover(false)}
			>
				<Button
					size="md"
					themeType="link"
					onClick={() => {
						handelServices();
					}}
				>
					View all Services
				</Button>
			</Popover>

			<div>
				{filter?.service === 'fcl_freight' && (
					<Popover
						theme="light"
						visible={showPopover}
						content={(
							<ViewSuggestedServices
								listview={listview}
								page={page}
								setPage={setPage}
								loading={loading}
								showPopover={showPopover}
								setShowPopover={setShowPopover}
								setShowAddRateModal={setShowAddRateModal}
								setServiceIdPresent={setServiceIdPresent}
							/>
						)}
						onClickOutside={() => setShowPopover(false)}
						interactive
						maxWidth="none"
						animation="perspective"
					>
						<Button
							size="md"
							themeType="link"
							onClick={() => handelSuggestedRates()}
						>
							Suggested Service Provider
						</Button>
					</Popover>
				)}
			</div>

			{source === 'rate_feedback'
			&& (
				<div>
					<Popover
						theme="light"
						render={<ViewFiles urlList={feedbackData?.list?.[0]?.attachment_file_urls || []} />}
						interactivexw
						maxWidth="none"
						animation="shift-away"
						placement="bottom-end"
					>
						<Button
							size="md"
							themeType="link"
							onClick={() => getFeedback()}
						>
							Attached files
						</Button>
					</Popover>
				</div>
			)}
		</div>
	);
}

export default ServicesDetails;
