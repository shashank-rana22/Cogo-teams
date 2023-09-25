import { Modal } from '@cogoport/components';
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

	const header = getHeader({ t });

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

			<Modal
				show={sideBar}
				onClose={onClose}
				closeOnOuterClick={setSideBar}
				placement="right"
				size="sm"
			>
				<Modal.Header title={header[sideBar]} />
				<Modal.Body>
					<div>{renderBody()}</div>
				</Modal.Body>
			</Modal>
		</div>
	);
}

export default SideBarComponent;
