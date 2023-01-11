import { Button } from '@cogoport/components';

import useGetRates from '../../../../hooks/useListRates';
import CardList from '../../../../List/CardList';

import fields from './fields';
import styles from './styles.module.css';

function RateModal({
	service, setShowModal, setSelectedRate, selectedRate,
}) {
	const {
		systemData, revertedData, loadingRevertedRates, loadingSystemRates,
	} = useGetRates({ service });
	const handleOnClick = () => {
		setSelectedRate(null);
		setShowModal(false);
	};
	return (
		<div>
			<div className={styles.heading}>System Rates</div>
			<CardList
				fields={fields}
				headerRequired={false}
				list={systemData?.list}
				paginationRequired={false}
				loading={loadingSystemRates}
				setSelectedRate={setSelectedRate}
				selectedRate={selectedRate}
			/>
			<div className={styles.heading}>Reverted Rates</div>
			<CardList
				fields={fields}
				headerRequired={false}
				list={revertedData?.list}
				paginationRequired={false}
				loading={loadingRevertedRates}
				setSelectedRate={setSelectedRate}
				selectedRate={selectedRate}
			/>
			<div className={styles.button}>
				<Button themeType="accent" style={{ margin: '4px' }} onClick={() => handleOnClick()}>Cancel</Button>
				<Button
					themeType="accent"
					style={{ margin: '4px' }}
					onClick={() => setShowModal(false)}
				>
					Select Rates

				</Button>
			</div>
		</div>
	);
}
export default RateModal;
