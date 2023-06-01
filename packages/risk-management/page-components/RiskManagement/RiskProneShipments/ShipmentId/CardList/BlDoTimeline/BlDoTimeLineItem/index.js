import { IcMFtick } from '@cogoport/icons-react';
import { startCase, format } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function BlDoTimeLineItem({ blDoTimelineData, isAccordionActive }) {
	let leftFilteredTimelineData = (blDoTimelineData || []).filter(
		(element) => element.milestone === 'draft_bl',
	);

	let topFilteredTimelineData = (blDoTimelineData || []).filter(
		(element) => element.milestone === 'purchase_invoice'
    || element.milestone === 'purchase_utr_updated'
    || element.milestone === 'bl_upload' || element.milestone === 'do_upload',
	);

	let bottomFilteredTimelineData = (blDoTimelineData || []).filter(
		(element) => element.milestone === 'proforma'
    || element.milestone === 'sales_invoice' || element.milestone === 'sales_utr_updated',
	);
	let RightFilteredTimelineData = (blDoTimelineData || []).filter(
		(element) => element.milestone === 'bl_release_to_credit_controller'
        || element.milestone === 'do_release_to_credit_controller'
         || element.milestone === 'bl_release' || element.milestone === 'do_release'
          || element.milestone === 'delivered',
	);
	if (isAccordionActive === false) {
		leftFilteredTimelineData = [];
		topFilteredTimelineData = [];
		bottomFilteredTimelineData = [];
		RightFilteredTimelineData = [];
	}

	return (
		<div className={styles.div_container}>
			<div className={styles.container}>
				{leftFilteredTimelineData.map((item) => (
					<div key={item.milestone} className={styles.container}>
						<div className={styles.main_div}>
							<div className={styles.container}>
								{item.completed_on === null
									? <div className={styles.dull_circle} />
									: (
										<IcMFtick
											height={20}
											width={20}
											color="#F68B21"
										/>
									)}
							</div>
							<div className={styles.column_container}>
								<div className={styles.text}>{startCase(item.milestone)}</div>
								<div className={styles.text}>
									{item.completed_on && format(
										item.completed_on,
										'dd MMM yyyy',
									)}

								</div>
							</div>

						</div>
						<div className={item.completed_on === null ? styles.dull_line : styles.color_line} />
						<div className={item.completed_on === null
							? styles.dull_vertical_line : styles.vertical_line}
						/>
					</div>
				))}

			</div>

			<div className={styles.sub_container}>
				<div className={styles.container}>
					{topFilteredTimelineData.map((item) => (
						<div key={item.milestone} className={styles.container}>
							<div className={item.completed_on === null ? styles.dull_line : styles.color_line} />
							<div className={styles.main_div}>
								<div>
									{item.completed_on === null
										? <div className={styles.dull_circle} />
										: (
											<IcMFtick
												height={20}
												width={20}
												color="#F68B21"
											/>
										)}
								</div>
								<div className={styles.top_column_conatiner}>
									<div className={styles.text}>{startCase(item.milestone)}</div>
									<div className={styles.text}>
										{item.completed_on
                                    && format(item.completed_on, 'dd MMM yyyy')}

									</div>
								</div>
							</div>
						</div>
					))}

				</div>
				<div className={styles.container}>
					{(bottomFilteredTimelineData || []).map((item) => (
						<div key={item.milestone} className={styles.container}>
							<div className={item.completed_on === null ? styles.dull_line : styles.color_line} />
							<div className={styles.main_div}>
								<div className={styles.container}>
									{item.completed_on === null
										? <div className={styles.dull_circle} />
										: (
											<IcMFtick
												height={20}
												width={20}
												color="#F68B21"
											/>
										)}
								</div>
								<div className={styles.column_container}>
									<div className={styles.text}>{startCase(item.milestone)}</div>
									<div className={styles.text}>
										{ item.completed_on
                                    && format(item.completed_on, 'dd MMM yyyy')}

									</div>
								</div>
							</div>
						</div>
					))}

				</div>
			</div>
			{RightFilteredTimelineData.length > 0
                && (
	<div className={RightFilteredTimelineData[0]?.completed_on === null
		? styles.dull_vertical_line1 : styles.vertical_line1}
	/>
                )}
			<div className={styles.container}>
				{RightFilteredTimelineData.map((item) => (
					<div key={item.milestone} className={styles.container}>
						<div className={item.completed_on === null ? styles.dull_line : styles.color_line} />
						<div className={styles.main_div}>
							<div className={styles.container}>
								{item.completed_on === null
									? <div className={styles.dull_circle} />
									: (
										<IcMFtick
											height={20}
											width={20}
											color="#F68B21"
										/>
									)}
							</div>
							<div className={styles.column_container}>
								<div className={styles.text}>{startCase(item.milestone).slice(0, 13)}</div>
								<div className={styles.text}>
									{startCase(item.milestone).slice(13, item.milestone.length)}

								</div>
								<div className={styles.text}>
									{item.completed_on
                                 && format(item.completed_on, 'dd MMM yyyy')}

								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default BlDoTimeLineItem;
