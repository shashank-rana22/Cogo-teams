import { Button, Select, RadioGroup, Popover, Input } from '@cogoport/components';

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
	const content = () => (
		<div className={styles.content_container}>
			<div className={styles.radio}>
				<RadioGroup
					options={optionsRadio}
					value={filters?.profitType}
					onChange={(item:string) => setFilters((prev) => ({ ...prev, profitType: item }))}
				/>
			</div>

			<div>
				<Select
					value={filters?.range}
					onChange={(val:string) => { setFilters((prev) => ({ ...prev, range: val })); }}
					placeholder="All"
					options={optionsData}
					isClearable
					style={{ width: '250px' }}
				/>
			</div>

			{filters?.range === '<=x=<' &&			(
				<div className={styles.input_container}>
					<Input
						className="primary md"
						placeholder={filters?.profitType === 'amount' ? 'From Amount' : 'From Percentage'}
						value={filters?.profitAmountUpper || filters?.profitPercentUpper || ''}
						onChange={(e:string) => {
							if (filters?.profitType === 'amount') {
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
					/>
				</div>
			)}

			<div className={styles.input_container}>
				<Input
					className="primary md"
					placeholder={filters?.profitType === 'amount' ? 'Amount' : 'Percentage'}
					value={profitNumber || ''}
					onChange={(e:string) => {
						setProfitNumber(e);
						if (filters?.profitType === 'amount') {
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
				/>
			</div>

		</div>
	);

	const getAmount = filters?.profitAmount || filters?.profitPercent;
	const getUpperAmount = filters?.profitAmountUpper || filters?.profitPercentUpper;

	return (
		<div>
			<Popover
				placement="bottom"
				render={content()}
			>
				<Input
					placeholder="Profit"
					value={(filters?.range === '<=x=<' ? getUpperAmount : '') + filters.range + getAmount}
				/>
			</Popover>
			<div className={styles.select_container}>
				<Select
					value={filters?.jobState}
					onChange={(val:string) => { setFilters((prev) => ({ ...prev, jobState: val })); }}
					placeholder="Job Type"
					options={optionsJobData}
					isClearable
					style={{ width: '250px' }}
				/>
			</div>
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
