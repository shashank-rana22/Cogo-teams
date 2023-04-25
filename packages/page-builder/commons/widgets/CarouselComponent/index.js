/* eslint-disable import/no-cycle */
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

function CarouselComponent({ widget, selectedRow, components, setComponents, setChildId, setSelectedItem, childId }) {
	const { children, id: componentId } = widget || {};
	const { selectedRowId } = selectedRow || {};

	return (
		<div className={styles.container}>
			<Carousel {...CAROUSEL_SETTINGS}>
				{(children || []).map((childComponent, idx) => {
					const { id, style: allStyles, icon, attributes, type } = childComponent || {};

					const isChildSelected = childId === id && componentId === selectedRowId && type;
					const border = isChildSelected ? '1px solid red' : allStyles.border;

					return (

						<div
							role="presentation"
							className={styles.content_container}
							style={{ ...allStyles, border }}
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

						</div>
					);
				})}
			</Carousel>
		</div>
	);
}

export default CarouselComponent;
