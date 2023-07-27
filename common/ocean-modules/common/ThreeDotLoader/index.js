import { Loader } from '@cogoport/components';
import PropTypes from 'prop-types';

import styles from './styles.module.css';

const PERCENTAGE_OF_FONT_SIZE = 18;
const TOTAL_PERCENTAGE = 100;

function ThreeDotLoader({ message = 'Loading', themeType = 'primary', size = 24, fontSize = 14 }) {
	const threeDotWidth = (fontSize * PERCENTAGE_OF_FONT_SIZE) / TOTAL_PERCENTAGE;
	const loaderWidth = `${threeDotWidth}px`;
	document.documentElement.style.setProperty('--dot-loader-width', loaderWidth);

	return (
		<section className={styles.three_dot_loader}>
			<Loader themeType={themeType} style={{ width: `${size}px` }} />
			<div className={styles.loading_dots}>
				<span style={{ fontSize: `${fontSize}px` }}>{message}</span>
				<span className={styles.loading_dots_item} />
			</div>
		</section>
	);
}

// Prop types validation for the component
ThreeDotLoader.propTypes = {
	message   : PropTypes.string, // Message to display during loading (optional)
	themeType : PropTypes.string, // Theme type for the loader (optional)
	size      : PropTypes.number, // Width of the loader (optional)
	fontSize  : PropTypes.number, // Font size for the message (optional)
};

export default ThreeDotLoader;
