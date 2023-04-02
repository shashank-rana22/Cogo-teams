import { Modal, Button } from '@cogoport/components';
import { useState } from 'react';

import useSaveReport from '../../../../hooks/useSaveReport';

import styles from './styles.module.css';

function Review({
	fclExportVolumePer,
	fclImportVolumePer,
	lclExportVolumePer,
	lclImportVolumePer,
	oceanCustomVolumePer,
	airExportVolumePer,
	airImportVolumePer,
	airCustomVolumePer,
	FTLVolumePer,
	LTLVolumePer,
	railVolumePer,
	fclExportValuePer,
	fclImportValuePer,
	lclExportValuePer,
	lclImportValuePer,
	oceanCustomValuePer,
	airExportValuePer,
	airImportValuePer,
	airCustomValuePer,
	FTLValuePer,
	LTLValuePer,
	railValuePer,
	totalVolumePer,
	totalPer,
	totalPerSurface,
	totalPerRail,
	totalPerOcean,
	totalPerAir,
	totalPerValueSurface,
	totalPerRailValue,
}) {
	const [modalData, setModalData] = useState(false);

	const { refetch, turnoverLoading } = useSaveReport({
		setModalData,
		fclExportVolumePer,
		fclImportVolumePer,
		lclExportVolumePer,
		lclImportVolumePer,
		oceanCustomVolumePer,
		airExportVolumePer,
		airImportVolumePer,
		airCustomVolumePer,
		FTLVolumePer,
		LTLVolumePer,
		railVolumePer,
		fclExportValuePer,
		fclImportValuePer,
		lclExportValuePer,
		lclImportValuePer,
		oceanCustomValuePer,
		airExportValuePer,
		airImportValuePer,
		airCustomValuePer,
		FTLValuePer,
		LTLValuePer,
		railValuePer,
		totalVolumePer,
		totalPer,
		totalPerSurface,
		totalPerRail,
		totalPerOcean,
		totalPerAir,
		totalPerValueSurface,
		totalPerRailValue,
	});
	return (
		<div>
			<div className={styles.button_flex}>
				<Button themeType="primary" size="md" onClick={() => { setModalData(true); }}>Save</Button>

			</div>
			{modalData && (
				<Modal show={modalData} onClose={() => { setModalData(false); }}>
					<Modal.Header />
					<Modal.Body>
						<div className={styles.body_flex}>
							<div className={styles.bold_data}>Are you sure you want to do save this?</div>
							<div>You can’t undo this step & delete the data once it’s saved</div>
						</div>

					</Modal.Body>
					<Modal.Footer>
						<div className={styles.button_flex}>
							<Button onClick={() => { refetch(); }} loading={turnoverLoading}>Confirm</Button>
						</div>
					</Modal.Footer>
				</Modal>
			)}
		</div>
	);
}
export default Review;
