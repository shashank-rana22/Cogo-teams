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
		addCheckedHSCodes,
	} = useTrendSearch();

	return (
		<div className={styles.main_container}>
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
			<div className={styles.selected_hscode_container}>
				{
				!isEmpty(hscodeArr) ? (

					<div className={styles.selected_hscodes}>
						Selected HS Codes
						<div className={styles.display_selected_code}>
							{
							((hscodeArr || []).map((item) => (
								<div key={item} className={styles.hscode}>
									<div className={styles.hscode_text}>
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
								style={{ marginTop: '24px' }}
								themeType="tertiary"
								onClick={() => { setHscodeArr([]); setResponsevalue([]); }}
							>
								Clear all

							</Button>

						</div>
					</div>

				) : (
					<div className={styles.selected_hscode_container_text}>
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
										label={item.hs_code}
										value={item.hs_code}
										onChange={(e) => addCheckedHSCodes(e)}
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
