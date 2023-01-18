import { Button, Modal } from '@cogoport/components';

import useGetRates from '../../../../hooks/useListRates';
import CardList from '../../../../List/CardList';

import fields from './fields';
import styles from './styles.module.css';

function RateModal({
	service, setShowModal, setSelectedRate, selectedRate, handleOnClose,
}) {
	const {
		systemData, revertedData, loadingRevertedRates, loadingSystemRates,
	} = useGetRates({ service });
	return (
		<div>
			<Modal.Body>
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
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.button}>
					<Button
						themeType="secondary"
						style={{ margin: '4px' }}
						onClick={() => handleOnClose()}
					>
						Cancel

					</Button>
					<Button
						themeType="primary"
						style={{ margin: '4px' }}
						onClick={() => setShowModal(false)}
					>
						Select Rates

					</Button>
				</div>
			</Modal.Footer>
		</div>
	);
}
export default RateModal;
