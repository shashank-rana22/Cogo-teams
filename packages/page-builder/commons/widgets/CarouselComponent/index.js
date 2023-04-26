/* eslint-disable import/no-cycle */
import { Tooltip } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import Carousel from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import RenderComponents from '../../../page-components/CreatePage2/RightPanel/RenderComponent';

import styles from './styles.module.css';

const CAROUSEL_SETTINGS = {
	dots           : true,
	infinite       : false,
	speed          : 1000,
	autoplaySpeed  : 5000,
	slidesToShow   : 1,
	slidesToScroll : 1,
	autoplay       : false,
	arrows         : false,
	pauseOnHover   : true,
};

function CarouselComponent({
	widget,
	selectedRow,
	components,
	setComponents,
	setChildId,
	setSelectedItem,
	childId,
	setParentComponentId,
	setShowContentModal,
}) {
	const { children, id: componentId } = widget || {};

	const { id: selectedRowId } = selectedRow || {};

	const handleSubmitClick = ({ index, parentId }) => {
		setParentComponentId({ childId: index, parentId });
		setShowContentModal(true);
	};

	const handleRemovelides = (e, idx, itemList) => {
		e.stopPropagation();
		const { id } = itemList || {};

		const data = components;

		const selectedComponentIndex = (data.layouts || []).findIndex(
			(component) => component.id === id,
		);

		data.layouts[selectedComponentIndex].children.splice(idx, 1);

		setComponents({ ...data });
	};

	return (
		<div className={styles.container}>
			<Carousel {...CAROUSEL_SETTINGS}>
				{(children || []).map((childComponent, idx) => {
					const { id, style, icon, type, parentId, children: childChildren } = childComponent || {};

					const isChildSelected = childId === id && componentId === selectedRowId && type;
					const border = isChildSelected ? '1px solid red' : style.border;

					if (!isEmpty(childChildren)) {
						return 	(
							<div
								className={styles.content_container}
								style={{ ...style, display: 'block' }}
							>
								{ (childChildren || []).map((childrenComponent, childrenIndex) => {
									const {
										id: childrenId,
										style: childrenStyles,
										type: childrenType,
									} = childrenComponent || {};

									// const isChildSelected = childId === id && componentId === selectedRowId && type;
									// const border = isChildSelected ? '1px solid red' : allStyles.border;

									return (

										<div
											role="presentation"
											className={styles.content_container}
											style={{ ...childrenStyles }}
											onClick={() => setChildId(id)}
										>
											<RenderComponents
												componentType={childrenType}
												widget={childrenComponent}
												components={components}
												setComponents={setComponents}
												elementId={childrenId}
												childId={childId}
												selectedRow={selectedRow}
												setSelectedItem={setSelectedItem}
												index={childrenIndex}
												setChildId={setChildId}
												setParentComponentId={setParentComponentId}
												setShowContentModal={setShowContentModal}
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
								onClick={() => setChildId(idx)}
							>

								{!type ? (
									<div
										role="presentation"
										onClick={() => handleSubmitClick({ index: idx, parentId })}
									>
										{icon}
									</div>
								) : (
									<RenderComponents
										componentType={type}
										widget={childComponent}
										components={components}
										setComponents={setComponents}
										elementId={id}
										childId={childId}
										selectedRow={selectedRow}
										setSelectedItem={setSelectedItem}
										index={idx}
										setChildId={setChildId}
										setParentComponentId={setParentComponentId}
										setShowContentModal={setShowContentModal}
									/>
								) }
								<div role="presentation" className={styles.show_wrapper}>
									<Tooltip content="Click here to remove current slides" placement="bottom">
										<IcMDelete
											height="24px"
											width="24px"
											cursor="pointer"
											onClick={(e) => handleRemovelides(e, idx, widget)}
										/>
									</Tooltip>
								</div>
							</div>
						</div>
					);
				})}
			</Carousel>
		</div>
	);
}

export default CarouselComponent;
