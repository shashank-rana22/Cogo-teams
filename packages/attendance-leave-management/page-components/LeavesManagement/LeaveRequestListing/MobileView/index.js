import { Pagination, cl, Placeholder, Popover } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMOverflowDot, IcMEdit, IcMDelete } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import Loader from '../../../../common/Loader';

import styles from './styles.module.css';

function MobileView({
	data = {}, setFilters = () => {},
	loading = false, handleDeleteModal = () => {}, handleOpenModal = () => {},
}) {
	const { list = [], page, page_limit, total_count } = data || {};

	const onPageChange = (val) => {
		setFilters((prev) => ({
			...prev,
			page: val,
		}));
	};
	const [popoverVisibility, setPopoverVisibility] = useState({});

	const togglePopover = (id) => {
		setPopoverVisibility({
			id,
			open: true,
		});
	};

	const handleEditDelete = (val, isEdit) => {
		if (isEdit) {
			handleOpenModal(val);
		} else {
			handleDeleteModal(val);
		}
		setPopoverVisibility({});
	};

	return (
		<div className={styles.container}>
			{loading ? <Loader />
				: (list || []).map((val) => (
					<div className={styles.card} key={val.id}>
						<div className={styles.flex}>
							<div className={styles.leave_count}>
								{val.leave_count}
								<span>
									day
								</span>
							</div>
							<div className={styles.leave_dates}>
								<div className={styles.leave_type}>
									{ startCase(val.leave_type)}
								</div>
								<div className={styles.dates}>
									{formatDate({
										date       : val.leave_start_date,
										dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
										formatType : 'date',
									})}
									-
									{' '}
									{formatDate({
										date       : val.leave_end_date,
										dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
										formatType : 'date',
									})}
								</div>
							</div>
						</div>
						<div className={styles.leave_status}>
							<div className={cl`${styles.leave_dot} 
						${styles[val.leave_status === 'pending' ? 'pending_color_bg' : 'approved_color_bg']}`}
							/>
							<div className={cl`${styles.leave_status_text}
								${styles[val.leave_status === 'pending' ? 'pending_color' : 'approved_color']}`}
							>
								{ startCase(val.leave_status) }
							</div>
							<Popover
								placement="left"
								trigger="click"
								caret={false}
								render={(
									<div className={styles.action}>
										{val.leave_status === 'pending' ? (
											<IcMEdit
												className={styles.cursor}
												onClick={() => handleEditDelete(val, true)}
											/>
										) : <div style={{ marginRight: '14px' }} />}
										<IcMDelete
											className={styles.cursor}
											onClick={() => handleEditDelete(val)}
										/>
									</div>
								)}
								visible={val.id === popoverVisibility?.id}
							>
								<IcMOverflowDot onClick={() => togglePopover(val.id)} />
							</Popover>
						</div>

					</div>
				))}
			<div className={styles.pagination_container}>
				{loading ? <Placeholder height="50px" width="100%" margin="0px 0px 20px 0px" /> : (
					<Pagination
						type="compact"
						currentPage={page}
						totalItems={total_count}
						pageSize={page_limit}
						onPageChange={onPageChange}
					/>
				)}
			</div>
		</div>
	);
}

export default MobileView;
