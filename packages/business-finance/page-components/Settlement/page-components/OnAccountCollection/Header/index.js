import { Button, Toggle } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import { ModalInterface } from '../interface';

import DownloadFileFormat from './DownloadFileFormat';
import ManualEntry from './ManualEntry';
import styles from './styles.module.css';
import UploadFile from './UploadFile';

interface HeaderInterface {
	refetch?:()=>void;
	control?:object;
}
function Header({ refetch, control }:HeaderInterface) {
	const { query } = useRouter();
	const [showModal, setShowModal] = useState<ModalInterface>({
		upload_file     : false,
		manual_entry    : false,
		download_format : false,
	});
	const handleVersionChange = () => {
		window.location.href = `/${query.partner_id}/business-finance/settlement/onAccountCollection`;
	};
	return (
		<div className={styles.header_container}>
			<Toggle
				name="toggle"
				size="md"
				onLabel="Old"
				offLabel="New"
				onChange={handleVersionChange}
			/>
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
					refetch={refetch}
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
			{showModal.download_format && (
				<DownloadFileFormat
					showModal={showModal}
					setShowModal={setShowModal}
					control={control}
				/>
			)}
		</div>
	);
}

export default Header;
