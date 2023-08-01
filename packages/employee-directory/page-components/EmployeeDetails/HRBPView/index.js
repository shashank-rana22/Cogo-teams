import { Modal, Pill, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMCross } from '@cogoport/icons-react';
import { getByKey } from '@cogoport/utils';
import React from 'react';

import { EMPLOYEE_STATUS, HRBP_VIEW_DATA } from '../../utils/constants';

import styles from './styles.module.css';

const getViewData = (data, val) => {
	if (val === 'status') {
		if (data.status === 'inactive') {
			return <Pill {...EMPLOYEE_STATUS.inactive}>Inactive</Pill>;
		}

		const statusData = EMPLOYEE_STATUS[data.employee_status.toLowerCase()];

		return <Pill {...statusData}>{statusData?.label}</Pill>;
	}

	if (val === 'cogoport_email') {
		return (
			<Tooltip
				interactive
				placement="top"
				className={styles.tooltip}
				content={data[val]}
			>
				<div className={styles.data}>
					{data[val]}
				</div>
			</Tooltip>
		);
	}

	if (['date_of_joining', 'resignation_date'].includes(val)) {
		return formatDate({
			date       : data[val],
			dateFormat : GLOBAL_CONSTANTS.formats.date['dd MM yyyy'],
			formatType : 'date',
			separator  : '-',
		});
	}

	return getByKey(data, val) || '-';
};

function HRBPView({ show = false, onClose = () => {}, employeeDetails = {} }) {
	return (
		<Modal show={show} placement="top" size="lg" onClose={onClose}>
			<div className={styles.container}>
				<div className={styles.header_container}>
					<div className={styles.title}>
						Profile Details
					</div>
					<IcMCross className={styles.cross_icon} width={20} height={20} onClick={onClose} />
				</div>
				<div className={styles.employee_details_container}>
					{HRBP_VIEW_DATA.map((val) => (
						<div key={val.value} className={val.className ? styles[val.className] : styles.container_item}>
							<div className={styles.label}>
								{val.label}
							</div>
							<div className={styles.bold}>
								{getViewData(employeeDetails, val.value) || '-'}
							</div>
						</div>
					))}
				</div>
			</div>
		</Modal>
	);
}

export default HRBPView;
