import HEADER from '../../constants/header';
import Details from '../Details';

import styles from './styles.module.css';

function SideBarComponent({
	sideBar = '',
	setSideBar = () => {},
	selectedLocation = {},
	setSelectedLocation = () => {},
}) {
	const onClose = () => {
		setSideBar('');
		setSelectedLocation({});
	};

	const renderBody = () => {
		switch (sideBar) {
			case 'details':
				return <Details activeCard={selectedLocation} />;
			default:
				return null;
		}
	};
	return (
		<div
			className={styles.sidebar}
			style={{ width: sideBar ? '420px' : '0', overflowY: sideBar ? '' : 'hidden' }}
		>
			<div className={styles.sidebar_body}>
				<div role="presentation" className={styles.close} onClick={onClose}>&times;</div>
				<h2>{HEADER[sideBar]}</h2>
				<div>{renderBody()}</div>
			</div>
		</div>
	);
}

export default SideBarComponent;
