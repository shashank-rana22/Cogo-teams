import { Button, Select, RadioGroup, Input } from '@cogoport/components';

import { FilterInterface } from '../../../interface';
import { optionsData, optionsJobData, optionsRadio } from '../../constant';

import styles from './styles.module.css';

interface MoreFilterInterface {
	filters:FilterInterface
	setFilters: React.Dispatch<React.SetStateAction<FilterInterface>>
	profitNumber?:string
	setProfitNumber: React.Dispatch<React.SetStateAction<string>>
	setMoreFilter: React.Dispatch<React.SetStateAction<boolean>>
}

function MoreFilter({ setFilters, filters, setProfitNumber, profitNumber, setMoreFilter }:MoreFilterInterface) {
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
	const content = () => (
		<div className={styles.content_container}>
			<div className={styles.radio}>
				<RadioGroup
					options={optionsRadio}
					value={profitType}
					onChange={(item:string) => {
						setFilters((prev) => ({ ...prev, profitType: item }));
						setProfitNumber('');
					}}
				/>
			</div>

			<div>
				<Select
					value={range}
					onChange={(val:string) => { setFilters((prev) => ({ ...prev, range: val })); }}
					placeholder="All"
					options={optionsData}
					isClearable
					style={{ width: '300px' }}
				/>
			</div>

			{range === '<=x=<' &&			(
				<div className={styles.input_container}>
					<Input
						className="primary md"
						placeholder={profitType === 'amount' ? 'From Amount' : 'From Percentage'}
						value={filters?.profitAmountUpper || filters?.profitPercentUpper || ''}
						onChange={(e:string) => {
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
					className="primary md"
					placeholder={getPlaceHolder()}
					value={profitNumber || ''}
					onChange={(e:string) => {
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

	return (
		<div>
			<div className={styles.select_container}>
				<Select
					value={filters?.jobState}
					onChange={(val:string) => { setFilters((prev) => ({ ...prev, jobState: val })); }}
					placeholder="Job Type"
					options={optionsJobData}
					isClearable
				/>
			</div>

			<div className={styles.profit_hr}>
				{' '}
				<div className={styles.profit}> Profitability</div>

				{' '}
				<div className={styles.hr} />
			</div>

			{content()}

			<div className={styles.button_container}>
				<Button
					size="sm"
					themeType="secondary"
					onClick={() => {
						setFilters((prev) => ({
							...prev,
							range         : '',
							profitAmount  : '',
							profitPercent : '',
							profitType    : '',
							jobState      : '',
						}));
						setProfitNumber('');
					}}
				>
					Reset

				</Button>
				<Button size="sm" onClick={() => { setMoreFilter(false); }}>Apply</Button>
			</div>
		</div>
	);
}
export default MoreFilter;
