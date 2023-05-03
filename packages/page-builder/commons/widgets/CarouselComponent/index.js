/* eslint-disable max-len */
/* eslint-disable import/no-cycle */
import { Tooltip } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import Carousel from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import RenderComponent from '../../../page-components/PageBuilder/DNDComponent/DNDBody/RightPanel/DropBox/Components/RenderElement';

import CarouselPreview from './CarouselPreview';
import styles from './styles.module.css';

const CAROUSEL_SETTINGS = {
	dots           : true,
	infinite       : true,
	speed          : 1000,
	autoplaySpeed  : 3000,
	slidesToShow   : 1,
	slidesToScroll : 1,
	autoplay       : true,
	arrows         : false,
	pauseOnHover   : true,
};

function CarouselComponent({
	widget,
	pageConfiguration,
	setPageConfiguration,
	setSelectedItem,
	// childId,
	setParentComponentId,
	setShowContentModal,
	rowData,
	setSelectedRow,
	setSelectedColumn,
	// columnData,
	setSelectedNestedColumn,
	// nestedColumData,
	selectedItem,
	selectedRow,
	selectedColumn,
	selectedNestedColumn,
	modeType,
}) {
	const { component, id: componentId } = widget || {};

	const { children, isDraggingPreview } = component || {};

	const { id: columnChildId } = selectedColumn || {};

	const { id: selectedRowId } = selectedRow || {};

	const { id: nestedColumnId } = selectedNestedColumn || {};

	const handleSubmitClick = ({ id, parentId }) => {
		if (modeType === 'edit') {
			setParentComponentId({ childId: id, parentId });
			setShowContentModal(true);
		}
	};

	const handleRemovelides = (e, idx, itemList) => {
		e.stopPropagation();
		const { id } = itemList || {};

		const data = pageConfiguration;

		const selectedComponentIndex = (data.layouts || []).findIndex(
			(selectedRowIndex) => selectedRowIndex.id === id,
		);

		data.layouts[selectedComponentIndex].component.children.splice(idx, 1);

		setPageConfiguration({ ...data });
	};

	const handleClick = (e, columnData) => {
		if (modeType === 'edit') {
			e.stopPropagation();
			setSelectedRow({ ...rowData });
			setSelectedColumn({ ...columnData });
			setSelectedNestedColumn({});
			setSelectedItem({});
		}
	};

	const handleNestedClick = (e, columnData, nestedData) => {
		if (modeType === 'edit') {
			e.stopPropagation();
			setSelectedRow({ ...rowData });
			setSelectedColumn({ ...columnData });
			setSelectedNestedColumn({ ...nestedData });
			setSelectedItem({});
		}
	};

	if (isDraggingPreview) {
		return (
			<CarouselPreview />
		);
	}

	return (
		<div className={styles.container}>
			<Carousel {...CAROUSEL_SETTINGS}>
				{(children || []).map((childComponent, idx) => {
					const {
						id,
						parentId,
						component: childrenComponent,
					} = childComponent || {};

					const { style, icon, type, children: childChildren } = childrenComponent || {};

					const isChildSelected = columnChildId === id && componentId === selectedRowId;
					const border = isChildSelected ? '5px solid pink' : style.border;

					if (!isEmpty(childChildren)) {
						return 	(
							<div
								role="presentation"
								onClick={(e) => handleClick(e, childComponent)}
								className={styles.content_container}
								style={{ ...style, display: 'block' }}
							>
								{ (childChildren || []).map((nestedChildComponent, childrenIndex) => {
									const {
										id: childrenId,
										component: nestedComponent,
									} = nestedChildComponent || {};

									const {
										style: childrenStyles,
										type: childrenType,
									} = nestedComponent || {};

									const isNestedChildSelected = columnChildId === id && componentId === selectedRowId && childrenId === nestedColumnId;

									const nestedBorder = isNestedChildSelected ? '5px solid grey' : childrenStyles.border;

									return (

										<div
											role="presentation"
											className={styles.content_container}
											style={{ ...childrenStyles, nestedBorder }}
											onClick={(e) => handleNestedClick(e, childComponent, nestedChildComponent)}
										>
											<RenderComponent
												componentType={childrenType}
												widget={nestedChildComponent}
												pageConfiguration={pageConfiguration}
												setPageConfiguration={setPageConfiguration}
												elementId={childrenId}
												childId={childrenIndex}
												setSelectedItem={setSelectedItem}
												index={childrenIndex}
												setParentComponentId={setParentComponentId}
												setShowContentModal={setShowContentModal}
												rowData={rowData}
												columnData={childComponent}
												setSelectedRow={setSelectedRow}
												setSelectedColumn={setSelectedColumn}
												setSelectedNestedColumn={setSelectedNestedColumn}
												nestedColumData={nestedChildComponent}
												selectedItem={selectedItem}
												selectedRow={selectedRow}
												selectedColumn={selectedColumn}
												selectedNestedColumn={selectedNestedColumn}

											/>
										</div>
									);
								})}
							</div>
						);
					}

					return (
						<div>
							<div
								key={id}
								role="presentation"
								style={{ ...style, border }}
								className={styles.block_wrapper}
								onClick={(e) => handleClick(e, childComponent)}
							>

								{!type ? (
									<div
										role="presentation"
										onClick={() => handleSubmitClick({ id, parentId })}
									>
										{icon}
									</div>
								) : (
									<RenderComponent
										componentType={type}
										widget={childComponent}
										pageConfiguration={pageConfiguration}
										setPageConfiguration={setPageConfiguration}
										elementId={id}
										childId={idx}
										setSelectedItem={setSelectedItem}
										index={idx}
										setParentComponentId={setParentComponentId}
										setShowContentModal={setShowContentModal}
										rowData={rowData}
										columnData={childComponent}
										setSelectedRow={setSelectedRow}
										setSelectedColumn={setSelectedColumn}
										setSelectedNestedColumn={setSelectedNestedColumn}
										nestedColumData={{}}
										selectedItem={selectedItem}
										selectedRow={selectedRow}
										selectedColumn={selectedColumn}
										selectedNestedColumn={selectedNestedColumn}
									/>
								) }

								{modeType === 'edit' && (
									<div role="presentation" className={styles.show_wrapper}>
										<Tooltip content="Click here to remove current slides" placement="bottom">
											<IcMDelete
												height="24px"
												width="24px"
												cursor="pointer"
												fill="#ee3425"
												onClick={(e) => handleRemovelides(e, idx, widget)}
											/>
										</Tooltip>
									</div>
								)}
							</div>
						</div>
					);
				})}
			</Carousel>
		</div>
	);
}

export default CarouselComponent;
