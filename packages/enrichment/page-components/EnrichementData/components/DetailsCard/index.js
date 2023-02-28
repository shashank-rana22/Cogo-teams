import { Button } from '@cogoport/components';
import { useState, useEffect } from 'react';

import { cardHeading, cardLabelsMapping, mobileNumberMapping } from '../../../../constants/get-card-details';
import CreateResponse from '../../common/CreateResponse';

import styles from './styles.module.css';
import RenderWorkscopes from './Workscopes';

function DetailsCard({
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
					<div style={{ marginLeft: '12px' }}>
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

				{Object.keys(cardLabelsMapping[activeTab]).map((key) => {
					const item = cardLabelsMapping[activeTab];

					return (
						<div className={styles.card_item}>
							<div>{item[key]}</div>

							{key === ('mobile_number' || 'whatsapp_number') ? (
								<div className={styles.item_value}>

									{user[mobileNumberMapping[key]]}
									{' '}
									-
									{' '}
									{user?.[key] || '-'}
								</div>
							) : (
								<div className={styles.item_value}>

									{user?.[key] || '-'}

								</div>
							)}

						</div>

					);
				})}

				{activeTab === 'user' && (
					<div className={styles.card_item}>
						<div>Workscopes</div>

						{user.work_scopes ? <RenderWorkscopes work_scopes={user.work_scopes} /> : '-'}

					</div>
				)}

			</div>

		</div>

	);
}

export default DetailsCard;
