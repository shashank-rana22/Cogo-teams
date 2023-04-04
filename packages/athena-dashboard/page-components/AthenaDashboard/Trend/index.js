import { Select, Input, Checkbox, Button } from '@cogoport/components';
import { RadioGroupController } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';

import controls from '../../../configurations/trend-controls';
import countryname_value from '../../../constants/country-name-value';
import useTrendSearch from '../hooks/useTrendSearch';

import styles from './styles.module.css';

function Trends() {
	const {
		searchValue,
		setSearchValue,
		responsevalue,
		setResponsevalue,
		hscodeArr,
		setHscodeArr,
		control,
		loading,
		handleClick,
		handleSubmit,
		getReport,
	} = useTrendSearch();

	return (
		<div className={styles.whole_page}>
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
				{controls.map((item) => {
					const ele = { ...item };
					return (
						<div key={ele.name}>
							<div style={{ marginLeft: '10px' }}>
								{ele.label}
							</div>

							<RadioGroupController
								{...ele}
								name={ele.name}
								options={ele.options}
								control={control}
								style={{ padding: '0px' }}
							/>

						</div>
					);
				})}
			</div>

			<div className={styles.search_container}>
				<Input
					size="sm"
					placeholder="Search Here..."
					onChange={setSearchValue}
					value={searchValue}
				/>
				<Button
					size="md"
					themeType="tertiary"
					onClick={handleClick}
					disabled={loading}
				>
					Search
				</Button>
			</div>
			<div className={styles.rect_div}>
				{
				!isEmpty(hscodeArr) ? (

					<div className={styles.display_rect}>
						<div className={styles.selected_text}>
							Selected HS Codes
						</div>
						<div className={styles.display_selected_code}>
							{
							((hscodeArr || []).map((item) => (
								<div key={item} className={styles.individual}>
									<div className={styles.individual_text}>
										{item}
									</div>
								</div>
							)))
						}
						</div>
						<div className={styles.button_group}>

							<Button
								size="md"
								themeType="primary"
								className={styles.build_report_button}
								onClick={handleSubmit(getReport)}
							>
								Build Report
							</Button>

							<Button
								className={styles.clear_all}
								themeType="tertiary"
								onClick={() => { setHscodeArr([]); setResponsevalue([]); }}
							>
								Clear all

							</Button>

						</div>
					</div>

				) : (
					<div className={styles.text_rect}>
						Select HS Codes for your report below. Your selected codes will show up here.
					</div>
				)
			}
			</div>

			<div className={styles.codes}>
				{
					((responsevalue || []).map((item) => (
						<div key={item.hs_code}>
							<div className={styles.set_css_output}>
								<div className={styles.checkbox}>
									<Checkbox
										key={item.hs_code}
										id={item.hs_code}
										className="checkboxes"
										label={item.hs_code}
										value={item.hs_code}
										onChange={(e) => {
											let arr = [...hscodeArr];
											if (e.target.checked) {
												arr = [...hscodeArr, e.target.value];
											} else if (arr.includes(e.target.value)) {
												const index = arr.indexOf(e.target.value);
												arr.splice(index, 1);
											}
											setHscodeArr(arr);
										}}
									/>
								</div>
								<div className={styles.description}>
									{item.category}
								</div>
							</div>
							<hr />
						</div>
					)))
				}
			</div>
		</div>
	);
}
export default Trends;
