// import { useForm } from '@cogoport/forms';

// import { getFieldController } from '../../../../common/Form/getFieldController';
import SearchInput from '../../../../common/SearchInput';
// import enrichmentFilters from '../../../../configurations/get-enrichment-filter-controls';

import styles from './styles.module.css';

function Filters(props) {
	const {
		debounceQuery,
		searchValue,
		setSearchValue,
	} = props;

	return (
		<section className={styles.container} id="filters">
			{/* <div className={styles.select_container}>

				{
				enrichmentFilters.map((el) => {
					const Element = getFieldController(el.type);

					if (!Element) return null;

					if (secondaryTab === 'uploaded_files' && el.name === 'organization_id') return null;

					const className = el.type === 'asyncSelect' ? styles.select : styles.date_picker;

					return (
						<Element
							key={el.name}
							className={className}
							value={filters[el.name]}
							onChange={(value) => onChangeFilters({
								...filters,
								[el.name]: value || undefined,
							})}
							{...el}
							control={control}
						/>
					);
				})
			}
			</div> */}

			<div className={styles.search_container}>

				<SearchInput
					size="md"
					placeholder="Search"
					setGlobalSearch={setSearchValue}
					debounceQuery={debounceQuery}
					value={searchValue}
					// disabled={disabled}
				/>
			</div>

		</section>
	);
}

export default Filters;
