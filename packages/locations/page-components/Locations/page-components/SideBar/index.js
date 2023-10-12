import { Button } from '@cogoport/components';
import { dynamic } from '@cogoport/next';
import { useTranslation } from 'next-i18next';
import { useRef, useMemo } from 'react';

import getHeader from '../../constants/header';
import useUpdateLocation from '../../hooks/useUpdateLocation';

import styles from './styles.module.css';

const CreateUpdateForm = dynamic(() => import('./AddEdit'), { ssr: false });
const Form = dynamic(() => import('./AddEdit/Form'), { ssr: false });
const Details = dynamic(() => import('../Details'), { ssr: false });

function SideBarComponent({
	sideBar = '',
	setSideBar = () => {},
	selectedLocation = {},
	setSelectedLocation = () => {},
	refetch = () => {},
}) {
	const editRef = useRef(null);
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

	const onEditSubmit = () => {
		editRef.current.formSubmit();
	};

	const handleEditSubmit = ({ data = {} }) => {
		apiTrigger({ data, id: selectedLocation?.id });
	};

	const callBack = () => setSideBar(null);

	const header = useMemo(() => getHeader({ t }), [t]);

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
