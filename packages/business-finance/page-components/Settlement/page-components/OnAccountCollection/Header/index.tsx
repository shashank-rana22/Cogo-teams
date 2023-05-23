import { Button } from '@cogoport/components';
import { useState } from 'react';

import { ModalInterface } from '../interface';

import ManualEntry from './ManualEntry';
import styles from './styles.module.css';
import UploadFile from './UploadFile';

function Header({ refetch, loading }) {
	const [showModal, setShowModal] = useState<ModalInterface>({
		upload_file     : false,
		manual_entry    : false,
		download_format : false,
	});
	return (
		<div className={styles.header_container}>
			<div>
				<Button
					type="button"
					themeType="secondary"
					size="md"
					onClick={() => {
						setShowModal({
							upload_file: !showModal.upload_file,
						});
					}}
				>
					Upload File

				</Button>
			</div>

			{showModal.upload_file && (
				<UploadFile
					showModal={showModal}
					setShowModal={setShowModal}
				/>
			)}

			<div>
				<Button
					type="button"
					themeType="secondary"
					size="md"
					onClick={() => {
						setShowModal({
							manual_entry: !showModal.manual_entry,
						});
					}}
				>
					Add Manual Entry

				</Button>

			</div>

			{showModal.manual_entry && (
				<ManualEntry
					refetch={refetch}
					showModal={showModal}
					setShowModal={setShowModal}
				/>
			)}

			<div>
				<Button
					type="button"
					themeType="secondary"
					size="md"
					onClick={() => {
						setShowModal({
							download_format: !showModal.download_format,
						});
					}}
				>
					Download File Format

				</Button>
			</div>
		</div>
	);
}

export default Header;
