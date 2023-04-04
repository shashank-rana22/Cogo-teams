import { Placeholder, Toggle, Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';
import React, { useState } from 'react';

import useGetDailyPayableOutstanding from '../hooks/useGetDailyPayableOutstanding';

import styles from './styles.module.css';

interface FilterProps {
	service?: string,
	currency?: string,
}
interface ItemData {
	filters: FilterProps,
	activeEntity: string,
}

function DailyPayableOutstanding({ filters, activeEntity }:ItemData) {
	const [isQuarterView, setIsQuarterView] = useState(false);
	const { data, loading } = useGetDailyPayableOutstanding({ isQuarterView, filters, activeEntity });
	const { list } = data || {};
	const formatedJan = format(list?.[0]?.yearMonth, 'MMM');
	const formatedApr = format(list?.[1]?.yearMonth, 'MMM');
	const formatedJul = format(list?.[2]?.yearMonth, 'MMM');
	const formatedOct = format(list?.[3]?.yearMonth, 'MMM');

	const QUARTER_MAPPING = [
		{
			amount        : list?.[0],
			formatedMonth : formatedJan === 'Jan'
			&& 'Jan-Feb-March',
			quarter: 'Q1',
		},
		{
			amount        : list?.[1],
			formatedMonth : formatedApr === 'Apr'
			&& ' Apr-May-Jun',
			quarter: 'Q2',
		},
		{
			amount        : list?.[2],
			formatedMonth : formatedJul === 'Jul'
			&& ' Jul-Aug-Sep',
			quarter: 'Q3',
		},
		{
			amount        : list?.[3],
			formatedMonth : formatedOct === 'Oct'
			&& ' Oct-Nov-Dec',
			quarter: 'Q4',
		},
	];

	const MONTH_MAPPING = [
		{
			amount: list?.[2],
		},
		{
			amount: list?.[1],
		},
		{
			amount: list?.[0],
		},
	];
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.heading_text}>
					<div className={styles.text}>
						Days Payable Outstanding
						<div className={styles.hr} />
					</div>
					<Tooltip
						placement="top"
						content={(
							<div className={styles.tooltip}>
								Days payable outstanding (DPO) is a financial ratio
								<br />
								that indicates the average
								<br />
								time (in days) that a
								<br />
								company takes to pay
								<br />
								its bills and invoices
							</div>
						)}
					>
						<div className={styles.info_icon}>
							<IcMInfo width="16px" height="16px" />
						</div>
					</Tooltip>
				</div>
				<div className={styles.toggle}>
					<div className={styles.heading_text}>
						Quarter View
					</div>
					<Toggle
						name="view"
						size="md"
						showOnOff
						value={isQuarterView as unknown as string}
						onChange={() => setIsQuarterView(!isQuarterView)}
						disabled={false}
					/>
				</div>
			</div>
			{!isQuarterView
				? (
					<div className={styles.sub_container}>

						{MONTH_MAPPING.map((item) => (

							item?.amount
								? (
									<div className={styles.month_container}>
										{loading ? (
											<Placeholder
												className={styles.loader}
											/>
										)
											: (
												<div className={styles.value}>
													<Tooltip
														content={item?.amount?.dpo}
														placement="top"
														interactive
													>
														{item?.amount?.dpo?.toFixed(2)}
													</Tooltip>

												</div>
											)}
										{loading ? (
											<Placeholder
												className={styles.loader}
											/>
										)
											: (
												<div className={styles.label}>
													{format(item?.amount?.yearMonth, ' MMM yyyy')}
												</div>
											)}
									</div>
								) : <div className={styles.dash}> -- </div>

						))}

					</div>
				) : (
					<div className={styles.sub_container}>

						{QUARTER_MAPPING.map((item) => (
							<div className={styles.month_box}>
								{loading ? (
									<Placeholder
										className={styles.loader}
									/>
								)
									: (
										<div className={styles.value}>
											{item?.amount
												? (
													<Tooltip content={item?.amount?.dpo} placement="top" interactive>
														{item?.amount?.dpo?.toFixed(2)}
													</Tooltip>
												)
												: '--'}
										</div>
									)}
								{loading ? <Placeholder className={styles.loader} />
									: (
										<div className={styles.sub_container}>
											<div className={styles.quarter_text}>
												{item?.quarter}
											</div>
											<div className={styles.label}>
												-
												{item?.formatedMonth}
											</div>
										</div>
									)}
							</div>
						))}

					</div>
				)}
		</div>
	);
}

export default DailyPayableOutstanding;
