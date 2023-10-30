import { Select, RadioGroup, Input } from '@cogoport/components';

import { optionsData, optionsRadio } from '../../constant';

import styles from './styles.module.css';

function ProfitabilityContent({
	filters = {},
	setFilters = () => {},
	profitNumber = '',
	setProfitNumber = () => {},
}) {
	const { profitType = '', range = '' } = filters || {};
	const getPlaceHolder = () => {
		if (profitType === 'percentage' && range === '<=x=<') {
			return 'To Percentage';
		}
		if (profitType === 'amount' && range === '<=x=<') {
			return 'To Amount';
		}
		if (profitType === 'amount') {
			return 'Amount';
		}
		if (profitType === 'percentage') {
			return 'Percentage';
		}

		return null;
	};

	return (
		<div>
			<div className={styles.radio}>
				<RadioGroup
					options={optionsRadio}
					value={profitType}
					onChange={(item) => {
						setFilters((prev) => ({ ...prev, profitType: item }));
						setProfitNumber('');
					}}
					className={styles.radio_group_section}
				/>
			</div>

			<div className={styles.profitability_text_style}>
				<Select
					value={range}
					onChange={(val) => { setFilters((prev) => ({ ...prev, range: val })); }}
					placeholder="All"
					options={optionsData}
					isClearable
					size="sm"
				/>
			</div>

			{range === '<=x=<' &&			(
				<div className={styles.input_container}>
					<Input
						className="primary md"
						placeholder={profitType === 'amount' ? 'From Amount' : 'From Percentage'}
						value={filters?.profitAmountUpper || filters?.profitPercentUpper || ''}
						onChange={(e) => {
							if (profitType === 'amount') {
								setFilters((prev) => ({
									...prev,
									profitAmountUpper  : e,
									profitPercentUpper : '',
								}));
							} else {
								setFilters((prev) => ({
									...prev,
									profitPercentUpper : e,
									profitAmountUpper  : '',
								}));
							}
						}}
						suffix={profitType === 'percentage' && '%'}
						prefix={profitType === 'amount' && 'INR'}
					/>
				</div>
			)}

			<div className={styles.input_container}>
				<Input
					size="sm"
					className="primary md"
					placeholder={getPlaceHolder()}
					value={profitNumber || ''}
					onChange={(e) => {
						setProfitNumber(e);
						if (profitType === 'amount') {
							setFilters((prev) => ({
								...prev,
								profitAmount  : e,
								profitPercent : '',
							}));
						} else {
							setFilters((prev) => ({
								...prev,
								profitPercent : e,
								profitAmount  : '',
							}));
						}
					}}
					suffix={profitType === 'percentage' && '%'}
					prefix={profitType === 'amount' && 'INR'}
				/>
			</div>
		</div>
	);
}
export default ProfitabilityContent;
