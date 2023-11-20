import { Modal, Table } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMArrowRight } from '@cogoport/icons-react';
import React, { useState } from 'react';

import Loader from '../../../../../common/Loader';
import useGetHolidayList from '../../../../../hooks/useGetHolidayList';

import styles from './styles.module.css';

const columns = [
	{
		Header   : 'DATE',
		accessor : (item) => formatDate({
			date       : item.holiday_date,
			dateFormat : GLOBAL_CONSTANTS.formats.date['eee, dd MMM, yyyy'],
			formatType : 'date',
		}),
	},
	{ Header: 'NAME', accessor: 'holiday_occasion' },
	{ Header: 'TYPE', accessor: () => 'Mandatory' },
];

function Holiday({ data = {}, loading = false }) {
	const { holiday_date, holiday_occassion } = data || {};
	const [openHolidayList, setOpenHolidayList] = useState(false);

	const { data : holidayData } = useGetHolidayList();

	const getDate = (format) => formatDate({
		date       : holiday_date,
		dateFormat : GLOBAL_CONSTANTS.formats.date[format],
		formatType : 'date',
	});

	if (loading) {
		return (
			<div className={styles.container}>
				<Loader height="20px" count={3} />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.heading_title}>
				Next Holiday
			</div>
			<div className={styles.holiday_summary}>
				<div style={{ marginRight: 40 }}>
					<div className={styles.holiday_flex}>
						<div className={styles.holiday_date}>
							{getDate('dd')}
						</div>
						<div className={styles.holiday_month}>
							<div>
								{getDate('MMM')}
							</div>
							{getDate('yyyy')}
						</div>
					</div>
					{holiday_occassion || ''}
				</div>
				<img
					src={GLOBAL_CONSTANTS.image_url.HOLIDAY_FLIGHT}
					alt="holiday"
					width={100}
				/>
			</div>
			<div
				className={styles.view_calendar}
				onClick={() => setOpenHolidayList(true)}
				aria-hidden
			>
				View Calendar
				{' '}
				<IcMArrowRight style={{ marginLeft: 8 }} />
			</div>
			{ openHolidayList && (
				<Modal
					size="lg"
					show={openHolidayList}
					onClose={() => setOpenHolidayList(false)}
					placement="top"
				>
					<Modal.Header title="Holidays" />
					<Modal.Body>
						<Table columns={columns} data={holidayData || []} />
					</Modal.Body>
				</Modal>
			) }
		</div>
	);
}

export default Holiday;
