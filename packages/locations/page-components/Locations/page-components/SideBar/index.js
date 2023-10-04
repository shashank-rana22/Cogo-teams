import { Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useRef } from 'react';

import getHeader from '../../constants/header';
import useUpdateLocation from '../../hooks/useUpdateLocation';
import Details from '../Details';

import CreateUpdateForm from './AddEdit';
import Form from './AddEdit/Form';
import styles from './styles.module.css';

function SideBarComponent({
	sideBar = '',
	setSideBar = () => {},
	selectedLocation = {},
	setSelectedLocation = () => {},
	refetch = () => {},
}) {
	const { t } = useTranslation(['locations']);

	const onClose = () => {
		setSideBar('');
		setSelectedLocation({});
	};
	const { loading = false, apiTrigger = () => {} } = useUpdateLocation({
		refetch: () => {
			setSideBar('');
			refetch();
		},
	});
	const editRef = useRef(null);
	const onEditSubmit = () => {
		editRef.current.formSubmit();
	};
	const handleEditSubmit = ({ data = {} }) => {
		apiTrigger({ data, id: selectedLocation?.id });
	};
	const callBack = () => setSideBar(null);

	const header = getHeader({ t });

	const renderBody = () => {
		switch (sideBar) {
			case 'details':
				return (
					<div>
						<Details
							loading={loading}
							apiTrigger={apiTrigger}
							activeCard={selectedLocation}
							setSideBar={setSideBar}
						/>
					</div>
				);
			case 'create':
				return <CreateUpdateForm setSideBar={setSideBar} refetch={refetch} item={selectedLocation} />;
			case 'update':
				return (
					<div>
						<Form
							item={selectedLocation}
							refetch={refetch}
							ref={editRef}
							handleSubmitForm={handleEditSubmit}
							callBack={callBack}
						/>
						<div className={styles.btn_align}>
							<Button
								themeType="secondary"
								style={{ marginRight: 8 }}
								disabled={loading}
								onClick={() => setSideBar(null)}
							>
								Cancel
							</Button>

							<Button
								onClick={onEditSubmit}
								disabled={loading}
							>
								Update
							</Button>
						</div>
					</div>

				);
			default:
				return null;
		}
	};

	return (
		<div className={styles.sidebar}>
			<div role="presentation" className={styles.close} onClick={onClose}>
				&times;
			</div>
			<h1 className={styles.sidebar_title}>
				{header[sideBar]}
			</h1>
			<div className={styles.sidebar_body}>
				{renderBody()}
			</div>
		</div>
	);
}

export default SideBarComponent;
