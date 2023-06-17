// import FiltersUi from '@cogo/business-modules/components/filters';
// import SearchInput from '@cogo/commons/components/SearchInput';
import { Toggle } from '@cogoport/components';
import { IcMArrowNext, IcMFilter, IcMRefresh } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import {
	FilterContainer,
	Main,
	IconContainer,
} from '../../../components/styles';
import getLocalFilters from '../../../utils/get-local-filters';
import SearchInput from '../../SearchInput';

import ExtraFilters from './ExtraFilters';
import showElements from './showElements';
import { Heading, Container, Button, Row } from './styles';

const rateListTabs = ['missing_rates', 'disliked_rates'];

function Header({
	heading = '',
	filters = {},
	filterProps = {},
	setFilters = () => {},
	href = '',
	as = '',
	type = '',
	serviceType = '',
	setServiceType = () => {},
}) {
	const { push } = useRouter();

	const [isOpen, setIsOpen] = useState(false);

	const {
		controls = [],
		searchKey = null,
		searchPlaceholder = null,
		...rest
	} = filterProps;
	const otherFilters = filters || {};

	// const filtersToButton = {};
	// (controls || []).forEach((control) => {
	// 	if (otherFilters[control.name]) {
	// 		filtersToButton[control.name] = otherFilters[control.name];
	// 	}
	// });

	const isRateList = rateListTabs.includes(type);

	const searchParam = searchKey ? { [searchKey]: filters?.[searchKey] } : {};

	const { reset, applyFilters, fields, processedControls } = getLocalFilters({
		controls,
		type,
		setFilters,
		searchParam,
	});

	const handleReset = () => {
		reset();
		setFilters({
			...otherFilters,
			...processedControls.reduce(
				(pv, cv) => ({
					...pv,
					[cv.name]: '',
				}),
				{},
			),
			page: 1,
		});
	};

	let searchBar = null;
	if (searchKey) {
		searchBar = (
			<SearchInput
				type="search"
				style={{ marginRight: 8 }}
				onChange={(e) => {
					setFilters({
						...otherFilters,
						[searchKey] : e.target.value,
						page        : 1,
					});
				}}
				value={filters?.[searchKey]}
				placeholder={searchPlaceholder || 'Org Name email phone'}
			/>
		);
	}

	return (
		<Container>
			<Heading>
				{heading}

				{href ? (
					<Button type="button" onClick={() => push(href, as)}>
						<IcMArrowNext width={28} height={28} />
					</Button>
				) : null}
			</Heading>

			<Row>
				{searchBar}

				<ExtraFilters
					type={type}
					filters={filters}
					serviceType={serviceType}
					setFilters={setFilters}
					setServiceType={setServiceType}
				/>

				{rest.showToggle && (
					<Container>
						<Toggle
							onLabel={{ label: rest.toggle?.onLabel, value: rest.toggle?.on }}
							offLabel={{
								label : rest.toggle?.offLabel,
								value : rest.toggle?.off,
							}}
							value={filters[rest.toggle?.key]}
							onChange={(e) => {
								setFilters({
									...otherFilters,
									[rest.toggle?.key] : e,
									page               : 1,
								});
							}}
						/>
					</Container>
				)}

				{rest.showReset && (
					<Main>
						<Button size="sm" ghost onClick={() => reset()}>
							<IcMRefresh width={21} height={21} />
							&nbsp; Reset Filters
						</Button>
					</Main>
				)}

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

				{/* {type === 'shipments' ? searchBar : null} */}
			</Row>
		</Container>
	);
}

export default Header;
