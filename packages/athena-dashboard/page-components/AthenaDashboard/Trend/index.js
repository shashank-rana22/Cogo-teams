import { useTranslation } from 'next-i18next';

import getControls from '../../../configurations/trend-controls';
import getCountryOptions from '../../../constants/country-name-value';
import useTrendSearch from '../hooks/useTrendSearch';

import Header from './Header';
import HsCodeContainer from './HsCodeContainer';
import HsCodeList from './HsCodeList';
import SearchContainer from './SearchContainer';
import styles from './styles.module.css';

function Trends() {
	const { t } = useTranslation(['athenaDashboard']);

	const {
		searchValue,
		setSearchValue,
		responseData,
		hscodeArr,
		setHscodeArr,
		control,
		loading,
		handleClick,
		handleSubmit,
		getReport,
		addCheckedHSCodes,
	} = useTrendSearch();

	const countryNameValue = getCountryOptions({ t });

	const controls = getControls({ t });

	return (
		<div className={styles.main_container}>
			<Header
				countryNameValue={countryNameValue}
				control={control}
				controls={controls}
			/>
			<SearchContainer
				searchValue={searchValue}
				setSearchValue={setSearchValue}
				handleClick={handleClick}
				loading={loading}
			/>

			<HsCodeContainer
				hscodeArr={hscodeArr}
				handleSubmit={handleSubmit}
				getReport={getReport}
				setHscodeArr={setHscodeArr}
			/>

			<HsCodeList
				hscodeArr={hscodeArr}
				responseData={responseData}
				addCheckedHSCodes={addCheckedHSCodes}
			/>
		</div>
	);
}
export default Trends;
