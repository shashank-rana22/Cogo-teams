import React, { useState } from 'react';

import SearchInput from '../../../../../../../common/SearchInput';

import ExtraFilters from './ExtraFilters';
import styles from './styles.module.css';

const rateListTabs = ['missing_rates', 'disliked_rates'];

function Header({
	filters = {},
	filterProps = {},
	setFilters = () => {},
	type = '',
	serviceType = '',
	setServiceType = () => {},
}) {
	const [isOpen, setIsOpen] = useState(false);

	const {
		controls = [],
		searchKey = null,
		searchPlaceholder = null,
		...rest
	} = filterProps;
	const otherFilters = filters || {};

	const isRateList = rateListTabs.includes(type);

	const searchParam = searchKey ? { [searchKey]: filters?.[searchKey] } : {};

	// const { reset, applyFilters, fields, processedControls } = getLocalFilters({
	// 	controls,
	// 	type,
	// 	setFilters,
	// 	searchParam,
	// });

	// const handleReset = () => {
	// 	reset();
	// 	setFilters({
	// 		...otherFilters,
	// 		...processedControls.reduce(
	// 			(pv, cv) => ({
	// 				...pv,
	// 				[cv.name]: '',
	// 			}),
	// 			{},
	// 		),
	// 		page: 1,
	// 	});
	// };

	let searchBar = null;

	if (searchKey) {
		searchBar = (
			<SearchInput
				type="search"
				style={{ marginRight: 8 }}
				onChange={(val) => {
					setFilters({
						...otherFilters,
						[searchKey] : val,
						page        : 1,
					});
				}}
				size="sm"
				value={filters?.[searchKey]}
				placeholder={searchPlaceholder || 'Org Name email phone'}
			/>
		);
	}

	return (
		<div className={styles.container}>

			<div className={styles.search_bar}>
				{searchBar}
			</div>

			<div className={styles.extra_filters}>
				<ExtraFilters
					type={type}
					filters={filters}
					serviceType={serviceType}
					setFilters={setFilters}
					setServiceType={setServiceType}
				/>
			</div>

			{/* {!isEmpty(controls) ? (
					<FilterContainer>
						<FiltersUi
							controls={processedControls}
							fields={fields}
							applyFilters={applyFilters}
							reset={handleReset}
							setOpen={setIsOpen}
							open={isOpen}
							isScrollable={false}
							showElements={isRateList ? showElements(serviceType, type) : {}}
							name="Filters"
						>
							<Main>
								<Button
									type="button"
									size="sm"
									ghost
									onClick={() => setIsOpen((pv) => !pv)}
								>
									<IconContainer>
										<IcMFilter style={{ width: 18, height: 18, padding: 2 }} />
									</IconContainer>
									Filter
								</Button>
							</Main>
						</FiltersUi>
					</FilterContainer>
				) : null} */}

		</div>
	);
}

export default Header;
