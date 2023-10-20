import { cl, Select } from '@cogoport/components';
// import { IcMArrowRotateLeft, IcMArrowRotateRight } from '@cogoport/icons-react';

import styles from './styles.module.css';

function FileViewer({ verifyAccount = {}, documentOptions = {}, selectDoc = {}, setSelectDoc = () => {} }) {
	const {
		showAccountDetails = false,
		// accountData = {},
	} = verifyAccount || {};

	const { docUrl = '', docType = '' } = selectDoc || {};

	return (
		<div className={cl`${!showAccountDetails ? styles.full_screen : styles.viewer}`}>
			<Select
				value={docType}
				onChange={(val, obj) => setSelectDoc(() => ({ docType: val, docUrl: obj?.url }))}
				options={documentOptions}
				size="sm"
				placeholder="Select document type"
			/>
			<div className={styles.content}>
				{/* <div className={styles.top_section}>
					{DOCUMENT_OPTIONS.map((item) => (
						<div key={item?.value} className={styles.preview_docs}>
							<object
								type="application/pdf"
								data={item?.url}
								width={100}
								height={108}
								aria-label="PDF document"
							/>
						</div>
					))}
				</div> */}
				{/* <div className={styles.preview}> */}
				<iframe
					loading="lazy"
					src={docUrl}
					width={showAccountDetails ? 734 : 765}
					height={showAccountDetails ? 460 : 408}
					title="PDF document"
				/>
			</div>
		</div>
	);
}

export default FileViewer;
