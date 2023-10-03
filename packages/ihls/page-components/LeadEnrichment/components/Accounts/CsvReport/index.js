import { Button } from '@cogoport/components';
import { IcMDown } from '@cogoport/icons-react';

import FileFilter from '../../../commons/FileFilter';
import useGetRegistrationStatus from '../../../hooks/useGetRegistrationStatus';

import styles from './styles.module.css';

function CsvReport({ fileName = '', onRemoveCsvFilter = () => {}, params = {} }) {
	const file_url = params?.filters?.csv_filter;
	const { loading, downloadTemplate } = useGetRegistrationStatus({ file_url });

	return (
		<div className={styles.container}>

			<FileFilter
				fileName={fileName}
				onRemoveCsvFilter={onRemoveCsvFilter}
			/>

			<div>
				<Button
					loading={loading}
					className="primary"
					onClick={() => downloadTemplate()}
				>
					<IcMDown style={{ marginRight: '4px' }} />
					Download Report

				</Button>
			</div>
		</div>
	);
}
export default CsvReport;
