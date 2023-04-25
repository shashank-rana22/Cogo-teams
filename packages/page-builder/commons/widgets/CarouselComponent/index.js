/* eslint-disable import/no-cycle */
import { Tooltip } from '@cogoport/components';
import { IcMPlusInCircle, IcMDelete } from '@cogoport/icons-react';
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
	const { children } = widget || {};
	// const { selectedRowId } = selectedRow || {};

	console.log('ashjahis', childId);

	const handleSubmitClick = ({ index, parentId }) => {
		setParentComponentId({ childId: index, parentId });
		setShowContentModal(true);
	};

	const handleAddSlides = () => {
		const { parentId, id } = selectedRow || {};

		const data = components;

		const selectedComponentIndex = (data.layouts || []).findIndex(
			(component) => component.id === id,
		);

		const index = (data.layouts[selectedComponentIndex].children || []).length;

		data.layouts[selectedComponentIndex].children = [...data.layouts[selectedComponentIndex].children, {
			id         : index,
			width      : '100%',
			parentId,
			isRendered : false,
			style      : {
				width          : '100%',
				border         : '1px dashed #9ab7fe',
				margin         : '2px',
				display        : 'flex',
				justifyContent : 'center',
				alignItems     : 'center',
			},
			icon       : <IcMPlusInCircle style={{ cursor: 'pointer', fill: '#222' }} width={20} height={20} />,
			attributes : {
				onClick: () => handleSubmitClick({ index, parentId }),
			},
		},
		];

		setComponents((prev) => ({ ...prev, layouts: data.layouts }));
	};

	const handleRemovelides = (idx) => {
		const { id } = selectedRow || {};

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
					const { id, style: allStyles, icon, attributes, type } = childComponent || {};

					// const isChildSelected = childId === id && componentId === selectedRowId && type;
					// const border = isChildSelected ? '1px solid red' : allStyles.border;

					return (

						<div
							role="presentation"
							style={{ ...allStyles, position: 'relative', background: 'red' }}
							onClick={() => setChildId(id)}
						>

							{!type ? (
								<div
									role="presentation"
									onClick={attributes.onClick}
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
								/>
							) }

							<Tooltip content="Click here to remove current slides" placement="bottom">
								<IcMDelete
									height="24px"
									width="24px"
									cursor="pointer"
									onClick={() => handleRemovelides(idx)}
								/>
							</Tooltip>
						</div>

					);
				})}
			</Carousel>
			<div role="presentation" className={styles.change}>
				<Tooltip content="Click here to add more slides" placement="bottom">
					<IcMPlusInCircle
						height="24px"
						width="24px"
						cursor="pointer"
						onClick={handleAddSlides}
					/>
				</Tooltip>
			</div>
		</div>
	);
}

export default CarouselComponent;
