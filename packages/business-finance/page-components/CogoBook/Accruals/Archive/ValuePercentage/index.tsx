import { Tooltip } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';

import styles from './styles.module.css';

function ValuePercentage({ data, keys, flag = false }) {
	const percentage = `${keys}Percentage`;

	const formatted = getFormattedPrice(
		data[keys],
		data.incomeCurrency,

	);

	const variance = data[keys] < 0 && data[keys];

	const absVariance = variance
		? Math.abs(variance)?.toFixed(2)?.toString()
		: data[keys]?.toFixed(2)?.toString();

	const renderValue = (amt, n) => {
		const check = keys === 'variance' ? variance : '';
		return (
			<div>
				{amt?.length > n ? (
					<Tooltip
						placement="top"
						content={`${amt} | ${data[percentage] || 0}%`}
					>
						<div
							className={
                                    check > 0 || check === false ? styles.green : check !== '' && styles.red
                                }
						>
							{flag ? (
								<>
									<div>{`${amt?.substring(0, 15)}.. `}</div>
									<div>
										{data[percentage] === null ? 0 : `${data[percentage]}%`}
									</div>
								</>
							) : (
								`${amt?.substring(0, n)}.. | ${
									data[percentage] === null ? 0 : `${data[percentage]}%`
								}`
							)}
						</div>
					</Tooltip>
				) : (
					<div
						className={
                                check > 0 || check === false ? styles.green : check !== '' && styles.red
                            }
					>
						{flag ? (
							<>
								<div>{`${amt}`}</div>
								<div>
									{data[percentage] === null ? 0 : `${data[percentage]}%`}
								</div>
							</>
						) : (
							`${amt} | ${data[percentage] === null ? 0 : data[percentage]} %`
						)}
					</div>
				)}
			</div>
		);
	};
	return (
		<div>
			{keys === 'variance'
				? renderValue(absVariance, 5)
				: renderValue(formatted, 13)}
		</div>
	);
}
export default ValuePercentage;
