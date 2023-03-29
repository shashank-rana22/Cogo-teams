import { Select, Input, Checkbox, Button, RadioGroup } from '@cogoport/components';
import { useState } from 'react';

import countryname_value from '../../../constants/country-name-value';
import useTrendSearch from '../hooks/useTrendSearch';

import styles from './styles.module.css';

function Trends() {
	const {
		searchValue,
		setSearchValue,
		responsevalue,
		hscodeArr,
		setHscodeArr,
		setShipmentType,
		loading,
		handleClick,
		hidetext,
		reRender,
		getReport,
		handleClear,
	} = useTrendSearch();

	const [trade_value, trade_onChange] = useState('import');
	const [hscode_value, hscode_onChange] = useState('select_codes_value');

	const trade_diretion = [
		{ value: 'import', label: 'Import' },
		{ value: 'export', label: 'Export' },
	];

	const hs_code = [
		{ label: 'All', value: 'all' },
		{ label: 'Select Codes Below', value: 'select_codes_value' },
	];

	return (
		<div className={styles.wholepage}>
			<div className={styles.header}>
				<div>
					Country/Region
					<Select
						value="india"
						placeholder="Select here..."
						options={countryname_value}
						style={{ width: '250px' }}
						size="sm"
						disabled
						className={styles.multiselect}
					/>
				</div>
				<div>
					<div style={{ marginLeft: '10px' }}>
						Trade Direction
					</div>
					<div>
						<RadioGroup options={trade_diretion} onChange={trade_onChange} value={trade_value} />
					</div>
				</div>
				<div>
					<div style={{ marginLeft: '10px' }}>
						HS Codes
					</div>
					<div>
						<RadioGroup options={hs_code} onChange={hscode_onChange} value={hscode_value} />
					</div>
				</div>
			</div>

			<div className={styles.search_container}>
				<Input
					size="sm"
					placeholder="Search Here..."
					onChange={setSearchValue}
					value={searchValue}
				/>
				<Button
					className={styles.button}
					size="md"
					themeType="secondary"
					onClick={() => {
						setHscodeArr([]);
						handleClick();
						reRender();
					}}
					disabled={loading}
					style={{ border: 'None' }}
				>
					{' '}
					Search
					{' '}

				</Button>
			</div>
			{
				hscodeArr.is
			}
			<div className={styles.rectdiv}>
				<div className={styles.displayrect}>
					<div className={styles.selectedtext} id="selectedhscode">
						Selected HS Codes
					</div>
					<div className={styles.displayselectedcode}>
						{
							((hscodeArr || []).map((Item) => (
								<div className={styles.individual}>
									<div className={styles.individualtext}>
										{Item}
									</div>
								</div>
							)))
						}
					</div>
					<div className={styles.buttongroup}>
						<div>
							<Button
								size="md"
								themeType="primary"
								id="buildreport"
								className={styles.buildreportbutton}
								onClick={() => {
									getReport();
								}}
							>
								Build Report
							</Button>
						</div>
						<div>
							<Button
								className={styles.clearall}
								themeType="secondary"
								id="clearall"
								onClick={() => { handleClear(); }}
								style={{ border: 'None', backgroundColor: 'transparent', paddingTop: '0px' }}
							>
								Clear all

							</Button>
						</div>
					</div>
				</div>
				<div className={styles.textrect}>
					<p id="hidetext">Select HS Codes for your report below. Your selected codes will show up here.</p>
				</div>

			</div>
			<div>
				<div className={styles.codes}>
					{
					((responsevalue || []).map((Item) => (
						<div>
							<div className={styles.setcssoutput}>
								<div className={styles.checkbox}>
									<Checkbox
										key={Item.hs_code}
										id={Item.hs_code}
										className="checkboxes"
										label={Item.hs_code}
										value={Item.hs_code}
										onChange={(e) => {
											let arr = [...hscodeArr];
											let flag = 0;
											if (e.target.checked) {
												arr = [...hscodeArr, e.target.value];
												flag = 1;
											} else if (arr.includes(e.target.value)) {
												const index = arr.indexOf(e.target.value);
												arr.splice(index, 1);
												flag = 0;
											}
											setHscodeArr(arr);
											hidetext(hscodeArr.length, flag);
										}}
									/>
								</div>
								<div className={styles.description}>
									{Item.category}
								</div>
							</div>
							<hr />
						</div>
					)))
				}
				</div>
			</div>
		</div>
	);
}
export default Trends;
