import { Popover, Modal, Tooltip, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowRotateDown, IcMArrowRotateUp, IcMOverflowDot as ViewMoreActionIcon } from '@cogoport/icons-react';
import { useState, useRef } from 'react';

import useUpdateTnc from '../../../hooks/useUpdateTnc';
import FREIGHT_DETAILS_MAPPING from '../freight-details-mapping';
import ShowMoreTNC from '../ShowMoreTnC';

import PopOverContent from './PopContent';
import styles from './style.module.css';

const LABEL_MAPPING = {
	fcl_freight : 'Shipping Line',
	air_freight : 'Airline',
};

function TermCard({
	listItem = {},
	showMoreTnC = false,
	onClickUpdateTerms = () => {},
	onClickShowMoreTnC = () => {},
	refetch = () => {},
	tncLevel = 'basicInfo',
	setTncLevel = () => {},
	organizationId = null,
	setEditTncModalId = () => {},
	EditForm = () => {},
}) {
	const [showEdit, setShowEdit] = useState(false);
	const [visibleToolTip, setShowVisibleToolTip] = useState(false);
	const editRef = useRef(null);

	const { id = '', service = '', status = '', description = [] } = listItem;

	const [visible, setVisible] = useState(false);
	const callBack = () => setShowEdit(null);

	function GetToolTipContent({ list = [] }) {
		return (
			<div>
				{list?.map((countryObj, i) => (
					<div key={countryObj.id}>
						{i + GLOBAL_CONSTANTS.one}
						.
						{countryObj?.name}
					</div>
				))}
			</div>
		);
	}
	const { apiTrigger } = useUpdateTnc({
		refetch: () => {
			setShowEdit(false);
			refetch();
			setEditTncModalId(null);
			setTncLevel('basicInfo');
		},
	});
	const handleSubmitForm = ({ values, editFormValue }) => {
		apiTrigger({ values, editFormValue });
	};

	return (
		<div>
			<div className={styles.container}>
				<div
					className={styles.freight_item_header}
					role="presentation"
				>

					<div className={styles.row} style={{ width: '100%' }}>
						{Object.values(FREIGHT_DETAILS_MAPPING).map((freightItem) => {
							const { key, label, value } = freightItem;
							const valueItem = value(listItem);
							let labelName = label;
							if (key === 'line_name' && ['air_freight', 'fcl_freight'].includes(service)) {
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

									<div
										role="presentation"
										onClick={() => (key === 'paying_party_countries'
											? setShowVisibleToolTip(!visibleToolTip) : null)}
										className={styles.value}
										onMouseEnter={() => setShowVisibleToolTip(true)}
										onMouseLeave={() => setShowVisibleToolTip(false)}
									>
										{key === 'paying_party_countries' && (
											<Tooltip
												content={GetToolTipContent({ list: listItem?.paying_party_countries })}
												visible={visibleToolTip}
											/>
										)}
										{valueItem || '___'}

									</div>
								</div>
							);
						})}

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
				<div className={styles.actions_container}>
					{showMoreTnC ? (
						<Button onClick={onClickShowMoreTnC} size="xs" themeType="link">
							{' '}
							View Less
							{' '}
							<IcMArrowRotateUp />
						</Button>
					) : (
						<Button onClick={onClickShowMoreTnC} size="xs" themeType="link">
							{' '}
							View More
							{' '}
							<IcMArrowRotateDown />
						</Button>
					)}
				</div>
			</div>

			{showMoreTnC ? (
				<div className={styles.freight_item_main}>
					<ShowMoreTNC description={description} />
				</div>
			) : null}

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
							handleSubmitForm={handleSubmitForm}
							organizationId={organizationId}
							setEditTncModalId={setEditTncModalId}
							callBack={callBack}
							refetch={() => { refetch(); setShowEdit(false); }}
						/>
					</Modal.Body>
				</Modal>
			) : null}
		</div>
	);
}
export default TermCard;
