import { Tabpanel, Placeholder } from '@cogoport/components';
// import { useSelector } from '@cogoport/store';
// import React, { useCallback } from 'react';

// import EmptyState from '../EmptyState';

import CardHeader from './CardList/CardHeader';
import Item from './CardList/Item';
import Header from './Header';
import styles from './styles.module.css';
// import Loader from './Loader';
import Tabs from './Tabs';

function List({
	setActiveCard,
	onCardClick,
	activeCard,
	listProps,
	tabs,
	globalActions,
	formatData,
	setViewToShow = () => {},
	showScopeSelect = true,
	id_prefix = '',
}) {
	const {
		active, tabs: tabsObj, filterKey, applyMaxTab,
	} = tabs;
	// const { isMobile } = useSelector(({ general }) => ({
		// isMobile: general.isMobile,
	// }));
	const {
		fields: rawFields,
		filterProps,
		// empty,
		formatCardFields,
		functions,
		// customCard,
	} = tabsObj[active];

	const fields = formatCardFields
		? formatCardFields(rawFields, active)
		: rawFields;
	const {
		loading,
		page,
		filters,
		list,
		hookSetters,
		setCurrentTab,
		currentTab,
	} = listProps;

	const listNew = formatData ? formatData(list) : list;

	const { data, total_page, total } = listNew;

	const handleTabChange = (val) => {
		if (currentTab !== val) {
			setCurrentTab(val);
			if (filterKey) {
				hookSetters.setFilters({ page: 1, [filterKey]: val });
			} else {
				hookSetters.setFilters({ page: 1 });
			}
			hookSetters.setList({
				data       : [],
				total      : 0,
				total_page : 0,
			});
			setViewToShow('empty');
			setActiveCard(null);
		}
	};
	const renderItems = () => {
		if (loading) return <Placeholder width="100%" height="500px" />;

		if (data.length === 0) return <h4>No data</h4>;

		return (data || []).map((item, i) => (
			<Item
				key={item.id}
				// isMobile={isMobile}
				item={item}
				fields={fields}
				setViewToShow={setViewToShow}
				setActiveCard={setActiveCard}
				activeCard={activeCard}
				functions={functions}
				onCardClick={onCardClick}
				currentTab={currentTab}
				id={`${id_prefix}_${i}`}
			/>

		));
	};

	const renderTabPanel = (name, title) => (
		<Tabpanel name={name} title={title} id={`${id_prefix}_${title}`}>
			<CardHeader fields={fields} />
			{renderItems()}
		</Tabpanel>
	);

	return (
		<div className={styles.container}>
			<div className={styles.main}>
				<Header
					filters={filters}
					hookSetters={hookSetters}
					filterProps={filterProps}
					globalActions={globalActions}
					showScopeSelect={showScopeSelect}
					id_prefix={id_prefix}
				/>
				<Tabs
					handleChange={handleTabChange}
					activeTab={currentTab}
					applyMaxTab={applyMaxTab}
				>
					{Object.keys(tabsObj).map((tab) => renderTabPanel(tab, tabsObj[tab].title?.toUpperCase()))}

				</Tabs>
			</div>
		</div>
	);
}

export default List;
