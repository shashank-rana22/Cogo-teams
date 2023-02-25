import { Tooltip, Pill, Button } from '@cogoport/components';
import { IcMLocation, IcMProfile } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import DetailsForm from '../DetailsForm';

import styles from './styles.module.css';

const cardHeader = {
	user: {
		icon  : <IcMProfile />,
		label : 'POC',
	},
	address: {
		icon  : <IcMLocation />,
		label : 'Address',
	},
};

const cardMapping = {
	user: {
		name                    : 'Point Of Contact',
		email                   : 'Email',
		// mobile_country_code     : '',
		mobile_number           : 'Mobile Number',
		alternate_mobile_number : 'Alternate Mobile Number',
		// whatsapp_country_code   : '',
		whatsapp_number         : 'Whatsapp Number',

	},
	address: {
		address    : 'Address',
		city       : 'City',
		state      : 'State',
		country    : 'Country',
		pincode    : 'Pincode',
		tax_number : 'Tax Number',

	},
};

const mobileNumberMapping = {
	mobile_number   : 'mobile_country_code',
	whatsapp_number : 'whatsapp_country_code',
};

function DetailsCard({
	user = {},
	index = 1,
	loading = false,
	activeTab = '',
}) {
	const [showDetailsForm, setShowDetailsForm] = useState(false);

	useEffect(() => {
		setShowDetailsForm(false);
	}, [activeTab]);

	function RenderWorkscopes({ work_scopes = [] }) {
		const totalWorkScopes = work_scopes.length;

		if (totalWorkScopes === 0) {
			return '___';
		}

		const renderToolTip = work_scopes.map((workscope) => (
			<Pill size="md" color="orange">
				{startCase(workscope)}
			</Pill>
		));

		return (
			<Tooltip content={renderToolTip} placement="bottom">
				<div className={styles.overflow_flex}>
					<div className={styles.workscopes_container}>
						{startCase(work_scopes?.[0] || '___')}
					</div>
					{totalWorkScopes > 1 && (
						<strong>
							(+
							{totalWorkScopes - 1}
							)
						</strong>
					)}
				</div>
			</Tooltip>
		);
	}

	if (showDetailsForm) {
		return (
			<DetailsForm
				loading={loading}
				activeTab={activeTab}
				user={user}
				isMainForm={false}
				index={index}
				setShowDetailsForm={setShowDetailsForm}
			/>
		);
	}

	return (

		<div className={styles.card}>

			<div className={styles.card_header}>
				<div className={styles.left_header}>
					{cardHeader[activeTab].icon}
					<div style={{ marginLeft: '12px' }}>
						{cardHeader[activeTab].label}
						-
						{' '}
						{index + 1}
					</div>
				</div>

				<div>

					<Button themeType="secondary" type="button" size="md" onClick={() => setShowDetailsForm(true)}>
						Edit
					</Button>
				</div>
			</div>

			<div className={styles.card_body}>

				{Object.keys(cardMapping[activeTab]).map((key) => {
					const item = cardMapping[activeTab];

					return (

						<div className={styles.card_item}>
							<div>
								{item[key]}
							</div>

							{key === ('mobile_number' || 'whatsapp_number')

								? (
									<div className={styles.item_value}>

										{user[mobileNumberMapping[key]]}
										{' '}
										-
										{' '}
										{user?.[key] || '-'}
									</div>
								)
								: (
									<div className={styles.item_value}>

										{user?.[key] || '-'}

									</div>
								)}

						</div>

					);
				})}

				{
					activeTab === 'user' && (
						<div className={styles.card_item}>
							<div>Workscopes</div>

							{user.work_scopes ? <RenderWorkscopes work_scopes={user.work_scopes} /> : '-'}

						</div>
					)
				}

			</div>

		</div>

	);
}

export default DetailsCard;
