import { Popover, Modal } from '@cogoport/components';
import { IcMOverflowDot as ViewMoreActionIcon } from '@cogoport/icons-react';
import { useState, useRef } from 'react';

import FREIGHT_DETAILS_MAPPING from '../../../utlis/freight-details-mapping';
import SERVICE_TYPES_MAPPING from '../../../utlis/service-types-mapping';
import ShowMoreTNC from '../ShowMoreTnC';

import PopOverContent from './PopContent';
import styles from './style.module.css';

function TermCard({
	listItem = {},
	showMoreTnC = false,
	onClickUpdateTerms = () => {},
	onClickShowMoreTnC = () => {},
	refetch = () => {},
	description = [],
	tncLevel = 'basicInfo',
	setTncLevel = () => {},
	organizationId = null,
	setEditTncModalId = () => {},
	EditForm = () => {},
}) {
	const [showEdit, setShowEdit] = useState(false);

	const editRef = useRef(null);

	// const onEditSubmit = () => {
	// 	editRef.current.formSubmit();
	// };

	const LABEL_MAPPING = {
		fcl_freight : 'Shipping Line',
		air_freight : 'Airline',
	};
	const { id = '', service = '', status = '' } = listItem;
	const [visible, setVisible] = useState(false);
	const callBack = () => setShowEdit(null);
	return (
		<div>
			<div
				className={styles.container}
				style={showMoreTnC ? {
					'background-color'        : '#f6f5fe',
					'border-top-left-radius'  : '8px',
					'border-top-right-radius' : '8px',
				} : null}
			>
				<div
					className={styles.freight_item_header}
					onClick={onClickShowMoreTnC}
					role="presentation"
				>
					<div
						className={styles.freight_stroke}
						style={{ backgroundColor: SERVICE_TYPES_MAPPING?.[service]?.color }}
					/>

					<div className={styles.row} style={{ width: '100%' }}>
						{Object.values(FREIGHT_DETAILS_MAPPING).map((freightItem) => {
							const { key, label, value } = freightItem;
							const valueItem = value(listItem);
							let labelName = label;
							if (
								key === 'line_name'
							&& ['air_freight', 'fcl_freight'].includes(service)
							) {
								labelName = LABEL_MAPPING[service];
							}

							return (
								<div key={key} className={styles.column}>
									{labelName ? (
										<span className={styles.label}>
											{labelName}
											:
										</span>
									) : null}

									<p className={styles.value}>{valueItem || '___'}</p>
								</div>
							);
						})}

					</div>

				</div>
				<div className={styles.freight_item_header_right}>
					<ViewMoreActionIcon
						style={{ cursor: 'pointer' }}
						onClick={() => setVisible(!visible)}
					/>
					<Popover
						placement="left"
						onClickOutside={() => setVisible(false)}
						caret={false}
						render={(
							<PopOverContent
								setShowEdit={setShowEdit}
								setEditTncModalId={setEditTncModalId}
								item={listItem}
								setVisible={setVisible}
								onClickUpdateTerms={onClickUpdateTerms}
								status={status}
								propsForUpdation={{
									id,
									status,
									refetch,
								}}
							/>
						)}
						visible={visible}
					/>

				</div>

			</div>

			{showMoreTnC && (
				<div className={styles.freight_item_main}>
					<ShowMoreTNC description={description} />
				</div>
			)}

			{showEdit ? (
				<Modal
					show={showEdit}
					onClose={() => { setShowEdit(null); setTncLevel('basicInfo'); }}
					size="lg"
					placement="top"
				>
					<Modal.Header title="Update Terms And Condition" />
					<Modal.Body>
						<EditForm
							item={listItem}
							ref={editRef}
							tncLevel={tncLevel}
							setTncLevel={setTncLevel}
							organizationId={organizationId}
							setEditTncModalId={setEditTncModalId}
							// handleSubmitForm={handleSubmitForm}
							setShowEdit={setShowEdit}
							callBack={callBack}
							refetch={refetch}
						/>
					</Modal.Body>
				</Modal>
			) : null}
		</div>
	);
}
export default TermCard;
