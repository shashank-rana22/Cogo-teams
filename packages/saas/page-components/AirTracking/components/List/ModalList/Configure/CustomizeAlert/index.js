import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import useGetAlertInfo from '../../../../../hooks/useGetAlertInfo';

import AddAlert from './AddAlert';
import SelectContact from './SelectContact';
import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const COMPONENT_MAPPING = {
	select_contact : SelectContact,
	add_alert      : AddAlert,
};

function CustomizeAlert({ closeHandler, shipmentId = '', activeTab = 'ocean' }) {
	const [step, setStep] = useState('select_contact');
	const [selectContactList, setSelectContactList] = useState([]);
	const {
		loading, data = [], alertList = [], alertListLoading,
	} = useGetAlertInfo({ shipmentId, step, activeTab });

	useEffect(() => {
		if (!isEmpty(data)) {
			setStep('add_alert');
		}
	}, [data]);

	const nextStepHandler = () => setStep('add_alert');
	const prevStepHandler = () => setStep('select_contact');

	const Component = COMPONENT_MAPPING[step];

	return (
		<div className={styles.container}>
			{loading ? (
				<Image
					className={styles.loader}
					src={GLOBAL_CONSTANTS.image_url.loading}
					alt="loading"
					width={100}
					height={100}
				/>
			) : (
				<Component
					activeTab={activeTab}
					closeHandler={closeHandler}
					nextStepHandler={nextStepHandler}
					selectContactList={selectContactList}
					setSelectContactList={setSelectContactList}
					prevStepHandler={prevStepHandler}
					prevAlertData={data}
					alertList={alertList}
					alertListLoading={alertListLoading}
					shipmentId={shipmentId}
				/>
			)}
		</div>
	);
}

export default CustomizeAlert;
