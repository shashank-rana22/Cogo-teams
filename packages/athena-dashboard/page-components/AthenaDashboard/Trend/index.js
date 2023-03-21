import { MultiSelect, Input, Checkbox, Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useAthenaRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import styles from './styles.module.css';

function Trends() {
	const router = useRouter();
	const [value, setValue] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [answer, setAnswer] = useState([]);
	const [hscodearr, setHscodearr] = useState([]);
	const [shipmenttype, setShipmenttype] = useState(['import']);
	console.log(hscodearr);
	console.log(shipmenttype);

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
		const m = document.getElementById('clearall');
		const n = document.getElementById('selectedhscode');
		console.log(l);
		if (y === 1 && x + 1 > 0) {
			k.style.display = 'None';
			l.style.display = 'block';
			m.style.display = 'block';
			n.style.display = 'block';
		} else if (x - 1 === 0) {
			k.style.display = 'block';
			l.style.display = 'None';
			m.style.display = 'None';
			n.style.display = 'None';
		}
	};
	const reRender = () => {
		const k = document.getElementById('hidetext');
		const l = document.getElementById('buildreport');
		const m = document.getElementById('clearall');
		const n = document.getElementById('selectedhscode');
		k.style.display = 'block';
		l.style.display = 'None';
		m.style.display = 'None';
		n.style.display = 'None';
	};

	const getReport = () => {
		if (shipmenttype && hscodearr) {
			router.push(`/athena-dashboard/report?shipment_type=${shipmenttype}&hscodes=${hscodearr}`, `/athena-dashboard/report?shipment_type=${shipmenttype}&hscodes=${hscodearr}`);
		}
	};

	const handleClear = () => {
		// hscodearr.map((Item)=>(
		// 	const k=document.
		// ))
		//  ((hscodearr||[]).map((Item)=>(
		// 	let ifchecked = document.getElementById(Item)

		// 	if(ifchecked.checked){
		// 		ifchecked.checked===false;
		// 	}
		// )))

		// return [1, 2, 3, 4].map((item) => {
		// 	if (item === 1) {
		// 		return 2;
		// 	}
		// 	return 3;
		// });
		// const checks = document.getElementsByClassName('checkboxes');
		// for (let i = 0; i < checks.length; i++) if (checks[i].checked === true ? checks[i].checked = false : checks[i].checked);
		// for (let i = 0; i < hscodearr.length; i++) {
		// 	if (document.getElementById(hscodearr[i]).checked) {
		// 		document.getElementById(hscodearr[i]).checked = false;
		// 	}
		// }
		setHscodearr([]);
		reRender();
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
						<input
							type="radio"
							id="import"
							name="Trade direction"
							value="import"
							onClick={(e) => {
								if (e.target.checked) {
									setShipmenttype('import');
								}
							}}
							checked
						/>
						<label htmlFor="import"> Import</label>
						<input
							type="radio"
							id="export"
							name="Trade direction"
							value="export"
							onClick={(e) => {
								if (e.target.checked) {
									setShipmenttype(e.target.value);
								}
							}}
						/>
						<label htmlFor="export"> Export</label>
					</div>
				</div>
				<div>
					HS Codes
					<div className={styles.codesn}>
						<input type="radio" id="all" name="HS Codes" value="All" />
						<label htmlFor="all"> All</label>
						<input type="radio" id="few" name="HS Codes" value="Select Codes Below" checked />
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
				<button
					className={styles.button}
					type="submit"
					onClick={() => {
						setHscodearr([]);
						handleClick();
						reRender();
					}}
				>
					{' '}
					Search
					{' '}

				</button>
			</div>
			<div className={styles.rectdiv}>
				<div className={styles.displayrect}>
					<div className={styles.selectedtext} id="selectedhscode">
						Selected HS Codes
					</div>
					<div className={styles.displayselectedcode}>
						{
							((hscodearr || []).map((Item) => (
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
							<button className={styles.clearall} id="clearall" onClick={() => { handleClear(); }}>Clear all</button>
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
					((answer || []).map((Item) => (
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
