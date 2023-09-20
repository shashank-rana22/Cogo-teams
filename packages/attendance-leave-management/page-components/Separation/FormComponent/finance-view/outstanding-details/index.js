import { Button } from '@cogoport/components';
import { UploadController } from '@cogoport/forms';
import { IcMArrowDown, IcMDownload } from '@cogoport/icons-react';
import React from 'react';

import StyledTable from '../../commons/StyledTable';

import styles from './styles.module.css';

function OutstandingDetails({
	control = {},
	handleDownloadSheet = () => {},
	setOutStandingShow = () => {},
	outStandingShow = false,
	columnsout = {},
	outstanding_amount_details = {},
	is_complete = false,
}) {
	return (
		<div className={styles.container}>
			<div
				className={styles.heading_container}
			>
				<div className={styles.heading}>
					B. Outstanding Amount
				</div>
				<div className={styles.btn_and_arrow}>
					<div className={styles.heading_btn}>
						<Button
							size="md"
							themeType="secondary"
							onClick={() => handleDownloadSheet()}
						>
							<IcMDownload />
							{' '}
							Download Outstanding Sheet
						</Button>
					</div>
					<IcMArrowDown
						width={22}
						height={22}
						aria-hidden
						onClick={() => setOutStandingShow(!outStandingShow)}
						className={outStandingShow ? styles.caret_active : styles.caret_arrow}
					/>
				</div>
			</div>

			<div className={outStandingShow ? styles.show_application : styles.hide_application}>
				<div className={styles.table_update_out_amount}>
					<div className={styles.outstanding_heading}>Outstanding Amount Details</div>
					<StyledTable columns={columnsout} data={outstanding_amount_details} loading={false} />
				</div>
				{is_complete ?	null : (
					<div className={styles.fnf_excel_sheet_container}>
						<div className={styles.outstanding_fnf_heading}> FNF Excel Sheet</div>
						<UploadController
							name="fnffile"
							control={control}
							placeholder="Only Image, pdf/doc..."
							size="md"
							disabled={is_complete}
							className={is_complete ? styles.uploadbtn : null}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
export default OutstandingDetails;
