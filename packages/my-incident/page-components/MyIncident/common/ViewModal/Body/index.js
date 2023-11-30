import { Textarea } from '@cogoport/components';
import { IcMEyeopen } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function Body({
	MAPPING = [],
	documentUrl = [],
	setRemarks = () => {},
	userNotes = '',
}) {
	return (
		<>
			{MAPPING?.map((section) => {
				const { label = '', key = '', subItems = [] } = section || {};
				return (
					<>
						<h4 key={key}>{label}</h4>
						<div className={styles.sub_items_container}>
							{subItems.map((subSection) => {
								const { subLabel = '', value = '', subKey = '' } = subSection || {};
								return (
									<div className={styles.sub_item} key={subKey}>
										<h6>{subLabel}</h6>
										<p className={styles.sub_value}>{value}</p>
									</div>
								);
							})}
						</div>
					</>
				);
			})}

			{!isEmpty(documentUrl) ? (
				<div className={styles.document_container}>

					<h4> Documents : </h4>

					{(documentUrl || []).map((url) => (
						<a key={url} href={url} target="_blank" rel="noreferrer">
							View Document
							<IcMEyeopen className={styles.icon} />
						</a>
					))}

				</div>
			) : null}

			<div className={styles.remarks_style}>
				<h4> Notes (only visible to self) </h4>

				<Textarea
					name="remarks"
					className={styles.text_area}
					size="lg"
					placeholder="Enter here..."
					onChange={setRemarks}
					defaultValue={userNotes}
				/>
			</div>
		</>
	);
}

export default Body;
