import { Select, Input, Checkbox, Button } from '@cogoport/components';
import { RadioGroupController } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';

import countryname_value from '../../../constants/country-name-value';
import useTrendSearch from '../hooks/useTrendSearch';

import controls from './controls';
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
				{controls.map((Item) => {
					const ele = { ...Item };
					return (
						<div>
							<div style={{ marginLeft: '10px' }}>
								{ele.label}
							</div>
							<div>
								<RadioGroupController
									{...ele}
									name={ele.name}
									options={ele.options}
									control={control}
									style={{ padding: '0px' }}
								/>
							</div>
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
					className={styles.button}
					size="md"
					themeType="secondary"
					onClick={handleClick}
					disabled={loading}
					style={{ border: 'None' }}
				>
					{' '}
					Search
					{' '}

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
							((hscodeArr || []).map((Item) => (
								<div className={styles.individual}>
									<div className={styles.individual_text}>
										{Item}
									</div>
								</div>
							)))
						}
						</div>
						<div className={styles.button_group}>
							<div>
								<Button
									size="md"
									themeType="primary"
									className={styles.build_report_button}
									onClick={handleSubmit(getReport)}
								>
									Build Report
								</Button>
							</div>
							<div>
								<Button
									className={styles.clearAll}
									themeType="secondary"
									onClick={() => { setHscodeArr([]); setResponsevalue([]); }}
									style={{ border: 'None', backgroundColor: 'transparent', paddingTop: '0px' }}
								>
									Clear all

								</Button>
							</div>
						</div>
					</div>

				) : (
					<div className={styles.text_rect}>
						Select HS Codes for your report below. Your selected codes will show up here.
					</div>
				)
			}
			</div>

			<div>
				<div className={styles.codes}>
					{
					((responsevalue || []).map((Item) => (
						<div>
							<div className={styles.set_css_output}>
								<div className={styles.checkbox}>
									<Checkbox
										key={Item.hs_code}
										id={Item.hs_code}
										className="checkboxes"
										label={Item.hs_code}
										value={Item.hs_code}
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
