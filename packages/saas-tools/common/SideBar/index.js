import HEADER from '../../constants/header';
// import Details from '../Details';

import CreateUpdateForm from './CreateUpdate';
import styles from './styles.module.css';

function SideBarComponent({
	sideBar = '',
	setSideBar = () => {},
	selected = {},
	setSelected = () => {},
}) {
	const onClose = () => {
		setSideBar('');
		setSelected({});
	};

	const renderBody = () => {
		switch (sideBar) {
			case 'create':
				return <CreateUpdateForm onClose={onClose} />;
			case 'update':
				return <CreateUpdateForm selected={selected} onClose={onClose} />;
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
