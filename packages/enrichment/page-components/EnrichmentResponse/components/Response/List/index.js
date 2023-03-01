import { Button } from '@cogoport/components';
import { useState, useEffect } from 'react';

import {
	getCardHeaders, CARD_LABELS_MAPPING,
	MOBILE_NUMBERS_MAPPING,
} from '../../../../../constants/get-card-details';
import CreateResponse from '../CreateResponse';

import styles from './styles.module.css';
import Workscopes from './Workscopes';

const cardHeading = getCardHeaders('card');

function List({
	user = {},
	index = 1,
	loading = false,
	activeTab = '',
	responseData = [],
	setResponseData = () => {},
}) {
	const [showDetailsForm, setShowDetailsForm] = useState(false);

	useEffect(() => {
		setShowDetailsForm(false);
	}, [activeTab]);

	if (showDetailsForm) {
		return (
			<CreateResponse
				loading={loading}
				activeTab={activeTab}
				responseData={responseData}
				setResponseData={setResponseData}
				user={user}
				index={index}
				setShowDetailsForm={setShowDetailsForm}
				type="edit"
			/>
		);
	}

	return (

		<div className={styles.card}>

			<div className={styles.card_header}>
				<div className={styles.left_header}>
					{cardHeading[activeTab].icon}
					<div className={styles.card_heading_label}>
						{cardHeading[activeTab].label}
						-
						{' '}
						{index + 1}
					</div>
				</div>

				<div>

					<Button
						themeType="secondary"
						type="button"
						size="md"
						onClick={() => setShowDetailsForm(true)}
					>
						Edit
					</Button>
				</div>
			</div>

			<div className={styles.card_body}>

				{Object.keys(CARD_LABELS_MAPPING[activeTab]).map((key) => {
					const item = CARD_LABELS_MAPPING[activeTab];

					return (
						<div className={styles.card_item}>
							<div>{item[key]}</div>

							{['mobile_number', 'whatsapp_number', 'alternate_mobile_number'].includes(key) ? (
								<div className={styles.item_value}>

									{user[MOBILE_NUMBERS_MAPPING[key]]}
									{' '}
									-
									{' '}
									{user?.[key] || '-'}
								</div>
							) : (
								<div className={styles.item_value}>
									{user?.[key] || '-'}
									{' '}
								</div>
							)}

						</div>

					);
				})}

				{activeTab === 'user' && (
					<div className={styles.card_item}>
						<div>Workscopes</div>

						{user.work_scopes ? <Workscopes work_scopes={user.work_scopes} /> : '-'}

					</div>
				)}

			</div>

		</div>

	);
}

export default List;
