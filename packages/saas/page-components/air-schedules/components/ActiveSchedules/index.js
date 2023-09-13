import { Pagination, Button, Popover } from '@cogoport/components';
import { IcMArrowBack, IcMPortArrow, IcMFilter } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import Loading from '../../common/Loading';
import Map from '../../common/Map';
import getConstants from '../../constants/checkbox-constants';
import getControls from '../../constants/checkbox-controls';
import useFetchScheduleDetails from '../../hooks/useFetchScheduleDetails';
import useGetData from '../../hooks/useGetData';
import NoSchedulesCard from '../NoSchedulesCard';

import ActiveScheduleCard from './ActiveScheduleCard';
import Filter from './Filter';
import Navigation from './Navigation';
import styles from './styles.module.css';

function ActiveSchedules() {
	const PAGE_LIMIT = 6;

	const DEFAULT_CURRENT_PAGE = 1;
	const { push } = useRouter();
	const {
		id,
	} = useSelector(({ general }) => ({
		id: general?.query?.schedule_id,
	}));
	const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);

	const { restOptions, stopsOptions } = getConstants();

	const [options, setOptions] = useState(stopsOptions);

	const controls = getControls({ options });
	const {
		setFilters, scheduleDetails,
		setCarrierList, carrierList,
		loading, mapPoints,
	} = useFetchScheduleDetails({
		pageLimit: PAGE_LIMIT, id, currentPage,
	});

	const {
		handleCheckList,
		clearAllHandler,
		control,
		departureDate,
		onChange,
		durationValue,
		arrivalDate,
		setArrivalDate,
		setDepartureDate,
		setVisible,
		visible,
	} = useGetData({
		setCurrentPage,
		setCarrierList,
		setFilters,
		carrierList,
		setOptions,
		restOptions,
	});

	const handleBack = () => {
		push('/saas/air-schedules');
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<IcMArrowBack
					fill="#000000"
					width="1.2rem"
					height="1.2rem"
					style={{ cursor: 'pointer' }}
					onClick={handleBack}
				/>
				<div className={styles.header_text}>
					{scheduleDetails?.origin_airport?.name || 'Origin'}
				</div>
				<div className={styles.icon_container}>
					<IcMPortArrow fill="#88CAD1" width="1.5rem" height="1.5rem" />
				</div>
				<div className={styles.header_text}>
					{scheduleDetails?.destination_airport?.name || 'Destination'}
				</div>
			</div>
			<div className={styles.map_container}>
				<Map
					mapPoints={mapPoints}
					portDetails={scheduleDetails}
					transportMode="AIR"
					width="100%"
				/>
			</div>
			<div className={styles.middle_container}>
				<div className={styles.middle_text_container}>
					Active Schedules
				</div>

				<Popover
					placement="bottom"
					visible={visible}
					render={(
						<Filter
							carrierList={carrierList}
							setCarrierList={setCarrierList}
							scheduleDetails={scheduleDetails}
							clearAllHandler={clearAllHandler}
							onChange={onChange}
							durationValue={durationValue}
							handleCheckList={handleCheckList}
							departureDate={departureDate}
							setDepartureDate={setDepartureDate}
							arrivalDate={arrivalDate}
							setArrivalDate={setArrivalDate}
						/>
					)}
				>
					<div>
						<Button
							themeType="accent"
							type="button"
							className={styles.button}
							onClick={() => setVisible(!visible)}
						>
							Filter By
							<IcMFilter />
						</Button>
					</div>
				</Popover>

			</div>
			<div className={styles.container_box}>
				<div className={styles.filter}>
					<Navigation
						departureDate={departureDate}
						setDepartureDate={setDepartureDate}
						arrivalDate={arrivalDate}
						setArrivalDate={setArrivalDate}
						carrierList={carrierList}
						handleCheckList={handleCheckList}
						durationValue={durationValue}
						onChange={onChange}
						fields={controls}
						clearAllHandler={clearAllHandler}
						control={control}

					/>

				</div>
				<div className={styles.active_schedules}>
					{loading ? (
						<div className={styles.card}>
							<Loading />
						</div>
					) : null}

					{!loading && !isEmpty(scheduleDetails?.schedules?.list?.length)
						&& scheduleDetails?.schedules?.list.map((item) => (
							<ActiveScheduleCard
								key={item.id}
								schedule={item}
								scheduleDetails={scheduleDetails}
							/>
						))}

					{!loading && isEmpty(scheduleDetails?.schedules?.list) && <NoSchedulesCard />}
				</div>
			</div>
			<div className={styles.pagination_container}>
				{!isEmpty(scheduleDetails?.schedules?.list?.length)
					&& (
						<Pagination
							type="table"
							currentPage={currentPage}
							totalItems={scheduleDetails?.schedules?.total_count}
							pageSize={scheduleDetails?.schedules?.page_limit}
							onPageChange={setCurrentPage}
						/>
					)}
			</div>
		</div>
	);
}

export default ActiveSchedules;
