/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
import React, { useState } from 'react';
import Text from '@cogoport/front/components/Text';
import DashboardIcon from '@/assets/Icons/dashboard.svg';
import { Responsive, WidthProvider } from 'react-grid-layout';

// import LayoutWidgets from './LayoutWidgets';
import {
	Container, GridContainer, CloseContainer, NoWidgetsText, LoadingContainer,
} from './styles';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
// import CloseIcon from '../../icons/icon-close.svg';

// import Loading from '@/page-components/common/loading/general-loading';

const ResponsiveGridLayout = WidthProvider(Responsive);

function GridLayout({
	editDashboard,
	items,
	layouts,
	handleRemoveWidget,
	onLayoutChange,
	dashboardFilter,
	setSelectedDashboardFilter,
	selectedDashboardFilter,
	loading,
	access,
	setFilterDashboardVal,
	filterDashboardVal,
	latestLayout,
	appliedFiltersOnDashboard,
	modalDashboardFilters,
	setmodalDashboardFilters,
	dashboard_filter,
}) {
	const [eligibleWidgets, setEligibleWidgets] = useState();
	const [newFilters, setNewFilters] = useState();
	const [showZIndex, setshowZIndex] = useState(false);
	const onResize = (layout, oldLayoutItem, layoutItem, placeholder) => {
		const layoutItems = layoutItem;
		const placeHolder = placeholder;

		const { i } = layoutItem;

		const { widget_type } = items.find((val) => val.i === i);

		if (widget_type === 'title') {
			if (layoutItem.w < 4) {
				layoutItems.w = 4;
				placeHolder.w = 4;
			}

			if (layoutItems.h < 3) {
				layoutItems.h = 3;
				placeHolder.h = 3;
			}
		} else if (widget_type === 'table') {
			if (layoutItem.w < 4) {
				layoutItems.w = 4;
				placeHolder.w = 4;
			}

			if (layoutItems.h < 10) {
				layoutItems.h = 10;
				placeHolder.h = 10;
			}
		} else {
			if (layoutItem.w < 4) {
				layoutItems.w = 4;
				placeHolder.w = 4;
			}

			if (layoutItems.h < 8) {
				layoutItems.h = 8;
				placeHolder.h = 8;
			}
		}
	};

	const LAYOUT_PROPS = {
		rowHeight : 24,
		cols      : {
			lg  : 12,
			md  : 12,
			sm  : 12,
			xs  : 12,
			xxs : 12,
		},
		margin             : [16, 16],
		useCSSTransforms   : true,
		horizontalCompact  : true,
		measureBeforeMount : false,
		compactType        : 'vertical',
		onLayoutChange,
		onResize,
		isBounded          : true,
	};

	if (loading) {
		return <LoadingContainer><Loading /></LoadingContainer>;
	}

	return (
		<Container>
			{items.length > 0 ? (
				<ResponsiveGridLayout
					className="layout"
					layouts={layouts}
					isDraggable={editDashboard}
					isResizable={editDashboard}
					{...LAYOUT_PROPS}
				>
					{(items || []).map(
						(item, index) => item.status !== 'delete' && (
							<GridContainer
								key={item.i}
								className={showZIndex === item.widget_id ? 'z-10' : 'z-1'}
								style={{ borderRadius: '4px' }}
							>
								{editDashboard && (
									<CloseContainer>
										<CloseIcon onClick={() => handleRemoveWidget(item.i)} />
									</CloseContainer>
								)}
								<LayoutWidgets
									widget_id={item.widget_id}
									widgetData={item}
									editDashboard={editDashboard}
									dashboardFilter={dashboardFilter}
									selectedDashboardFilter={selectedDashboardFilter}
									setSelectedDashboardFilter={setSelectedDashboardFilter}
									access={access}
									setFilterDashboardVal={setFilterDashboardVal}
									filterDashboardVal={filterDashboardVal}
									setEligibleWidgets={setEligibleWidgets}
									eligibleWidgets={eligibleWidgets}
									newFilters={newFilters}
									setNewFilters={setNewFilters}
									latestLayout={latestLayout[index]}
									appliedFiltersOnDashboard={appliedFiltersOnDashboard}
									modalDashboardFilters={modalDashboardFilters}
									setmodalDashboardFilters={setmodalDashboardFilters}
									showZIndex={setshowZIndex}
									dashboard_filter={dashboard_filter}
								/>
							</GridContainer>
						),
					)}
				</ResponsiveGridLayout>
			) : (
				<NoWidgetsText>
					<DashboardIcon style={{ height: '150px', width: '80px', color: 'rgb(80, 158, 227)' }} />
					<Text size="32px" bold>
						No widgets to show
					</Text>
					{' '}
					<Text marginTop="12px">
						To Add click on Edit, then click on Add Widget
					</Text>
				</NoWidgetsText>
			)}
		</Container>
	);
}

export default GridLayout;
