import { Button, Input, ToolTip, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import Loader from '../../../../commons/Loader';
import useGetDocumentsHistory from '../../../../hooks/useGetDocumentHistory';
import { TRUCK_STATE_KEYS } from '../../../../utils/pageMappings';
import ToolTipContent from '../ToolTipContent';

import styles from './styles.module.css';

const SINGLE_VALUE = 1;
const LOADING_ROW_SIZE = 3;
const LOADING_COLUMN_SIZE = 3;

const LOADING_ROWS = Array.from(Array(LOADING_ROW_SIZE).keys());
const LOADING_COLUMNS = Array.from(Array(LOADING_COLUMN_SIZE).keys());

function ModalContent(props) {
	const {
		shipment_data = {},
		truckNumber = {},
		setShowHistory = () => {},
	} = props;
	const [formattedList, setFormattedList] = useState([]);
	const [filterValue, setFilterValues] = useState('');

	const { loading, initialList } = useGetDocumentsHistory({
		shipment_id  : shipment_data?.id,
		truck_number : truckNumber[TRUCK_STATE_KEYS.SELECTED_TRUCK_NUMBER],
		setFormattedList,
	});

	const handleFilterValue = (val) => {
		let newList = [];
		if (!isEmpty(val)) {
			newList = initialList.filter((listItem) => listItem?.documents?.some((docItem) => docItem?.name
				?.toLowerCase()
				?.includes(val?.replace(GLOBAL_CONSTANTS.regex_patterns.white_space_characters, '')?.toLowerCase())));
		} else {
			newList = initialList;
		}

		setFormattedList(newList);
	};

	if (loading) {
		return <Loader rowArray={LOADING_ROWS} columnArray={LOADING_COLUMNS} />;
	}

	return (
		<div>
			<div className={styles.modal_heading}>
				<div>Document History</div>
				<div className={styles.filter}>
					<Input
						placeholder="Search Document Type"
						size="md"
						value={filterValue}
						onChange={(val) => {
							setFilterValues(val);
							handleFilterValue(val);
						}}
					/>
				</div>
			</div>

			<div className={styles.modal_body}>
				<div className={styles.table}>
					<div className={cl`${styles.table_header} ${styles.grid_table}`}>
						<div>Files</div>
						<div>Uploaded By</div>
						<div>Created At</div>
					</div>
					<div className={styles.table_body}>
						{formattedList?.map((item) => (
							<div className={cl`${styles.grid_table} ${styles.single_row}`} key={item?.id}>
								<div>
									{!isEmpty(item?.documents) ? (
										<ToolTip
											placement="bottom"
											content={<ToolTipContent documents={item?.documents} />}
										>
											<div>
												{' '}
												See
												{' '}
												{item?.docs_length}
												{' '}
												{item?.docs_length > SINGLE_VALUE ? 'Files' : 'File'}
												{' '}
											</div>
										</ToolTip>
									) : (
										'No Files'
									)}
								</div>
								<div>{item?.uploaded_by?.name}</div>
								<div>
									{' '}
									{item?.updated_at}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className={styles.modal_footer}>
				<Button
					size="md"
					themeType="accent"
					onClick={() => setShowHistory(false)}
					disabled={loading}
				>
					Close
				</Button>
			</div>
		</div>
	);
}

export default ModalContent;
