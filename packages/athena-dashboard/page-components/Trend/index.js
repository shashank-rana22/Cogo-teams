import { MultiSelect, Input, Checkbox, Button } from '@cogoport/components';
import { useAthenaRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import styles from './styles.module.css';

function Trends() {
	const [value, setValue] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [answer, setAnswer] = useState([]);
	const [hscodearr, setHscodearr] = useState([]);
	console.log(hscodearr);

	const options = [
		{ label: 'INDIA', value: 'INDIA' },
	];

	const [{ loading = false, data: responseData = {} }, trigger] = useAthenaRequest({
		url    : 'athena/hscodes_by_commodity_name',
		method : 'post',
	}, { manual: true });

	const handleClick = async () => {
		await trigger({
			data: {
				filters: { commodity_name: searchValue },
			},
		});
	};

	useEffect(() => {
		if (!isEmpty(responseData)) {
			setAnswer(responseData.list);
		}
	}, [responseData]);

	const hidetext = (x, y) => {
		const k = document.getElementById('hidetext');
		const l = document.getElementById('buildreport');
		console.log(l);
		if (y === 1 && x + 1 > 0) {
			k.style.display = 'None';
			l.style.display = 'block';
		} else if (x - 1 === 0) {
			k.style.display = 'block';
			l.style.display = 'None';
		}
	};

	return (
		<div className={styles.wholepage}>
			<div className={styles.header}>
				<div>
					Country/Region
					<MultiSelect
						value={value}
						onChange={setValue}
						placeholder="Select here..."
						options={options}
						isClearable
						style={{ width: '250px' }}
						size="sm"
						className={styles.multiselect}
					/>
				</div>
				<div>
					Trade Direction
					<div className={styles.tradedn}>
						<input type="radio" id="import" name="Trade direction" value="Import" />
						<label htmlFor="import"> Import</label>
						<input type="radio" id="export" name="Trade direction" value="Export" />
						<label htmlFor="export"> Export</label>
					</div>
				</div>
				<div>
					HS Codes
					<div className={styles.codesn}>
						<input type="radio" id="all" name="HS Codes" value="All" />
						<label htmlFor="all"> All</label>
						<input type="radio" id="few" name="HS Codes" value="Select Codes Below" />
						<label htmlFor="few"> Select Codes Below</label>
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
				<button className={styles.button} type="submit" onClick={() => handleClick()}> Search </button>
			</div>
			<div className={styles.rectdiv}>
				<div>
					<Button
						size="md"
						themeType="primary"
						id="buildreport"
						className={styles.buildreportbutton}
					>
						Build Report
					</Button>
				</div>
				<div className={styles.textrect}>
					<p id="hidetext">Select HS Codes for your report below. Your selected codes will show up here.</p>
				</div>
			</div>
			<div>
				<div className={styles.codes}>
					{
					((answer || []).map((Item) => (
						<div>
							<div className={styles.setcssoutput}>
								<div className={styles.checkbox}>
									<Checkbox
										key={Item.hs_code}
										label={Item.hs_code}
										value={Item.hs_code}
										onChange={(e) => {
											let arr = [...hscodearr];
											let flag = 0;
											if (e.target.checked) {
												arr = [...hscodearr, e.target.value];
												flag = 1;
											} else if (arr.includes(e.target.value)) {
												const index = arr.indexOf(e.target.value);
												arr.splice(index, 1);
												flag = 0;
											}
											setHscodearr(arr);
											hidetext(hscodearr.length, flag);
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
