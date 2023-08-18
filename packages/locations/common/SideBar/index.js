import { useTranslation } from 'next-i18next';

import getHeader from '../../constants/header';
import Details from '../Details';

import CreateUpdateForm from './CreateUpdate';
import styles from './styles.module.css';

function SideBarComponent({
	sideBar = '',
	setSideBar = () => {},
	selectedLocation = {},
	setSelectedLocation = () => {},
}) {
	const { t } = useTranslation(['locations']);

	const onClose = () => {
		setSideBar('');
		setSelectedLocation({});
	};

	const header = getHeader(t);

	const renderBody = () => {
		switch (sideBar) {
			case 'details':
				return <Details activeCard={selectedLocation} />;
			case 'create':
				return <CreateUpdateForm />;
			default:
				return null;
		}
	};
	return (
		<div className={styles.sidebar}>
			<div className={styles.sidebar_body}>
				<div role="presentation" className={styles.close} onClick={onClose}>
					&times;
				</div>
				<h2>{header[sideBar]}</h2>
				<div>{renderBody()}</div>
			</div>
		</div>
	);
}

export default SideBarComponent;
