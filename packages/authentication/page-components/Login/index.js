import { FluidContainer, Button, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcCMicrosoft } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import useFormLoginwithMS from '../../hooks/useFormLoginwithMS';
import EmailBasedLoginForm from '../EmailBasedLoginForm';
import OtpBasedLoginForm from '../OtpBasedLoginForm';
import OtpForm from '../OtpForm';

import styles from './styles.module.css';

const TABS = ['email', 'mobile'];

function Login() {
	const { t } = useTranslation(['login']);

	const [activeTab, setActiveTab] = useState('email');
	const [mode, setMode] = useState('login');
	const [mobileNumber, setMobileNumber] = useState({});

	const [otpId, setOtpId] = useState('');

	const { onLogin = () => {}, socialLoginLoading = false } = useFormLoginwithMS();

	const LOGIN_FLOW_MAPPING = {
		login : OtpBasedLoginForm,
		otp   : OtpForm,
	};

	const componentProps = {
		login: {
			setMode,
			setMobileNumber,
			setOtpId,
			mobileNumber,
		},
		otp: {
			otpId,
			mobileNumber,
			setMode,
		},
	};

	const Component = LOGIN_FLOW_MAPPING[mode] || null;

	function MobileLogin() {
		if (Component) {
			return (
				<Component
					key={mode}
					{...(componentProps[mode] || {})}
				/>
			);
		}
		return null;
	}
	const ACTIVE_TAB = {
		email  : <EmailBasedLoginForm />,
		mobile : <MobileLogin />,
	};

	return (
		<FluidContainer className={styles.container}>
			<div className={styles.box_container}>
				<Image
					src={GLOBAL_CONSTANTS.image_url.cogoport_login_logo}
					width={400}
					height={50}
					alt="logo"
					className={styles.logo}
				/>

				<div className={styles.tabs}>
					{(TABS || []).map((itm) => (
						<div
							className={cl`${styles.tab} ${activeTab === itm ? styles.active_tab : ''}`}
							onClick={() => setActiveTab(itm)}
							key={itm}
							role="presentation"
						>
							{startCase(itm)}
						</div>
					))}
				</div>

				<div className={styles.input_container}>
					<div className={styles.active_components}>
						{ACTIVE_TAB[activeTab]}
					</div>

					<div className={styles.or}>
						<hr className={styles.line} />
						{t('login:or_label')}
						<hr className={styles.line} />
					</div>

					<Button
						loading={socialLoginLoading}
						themeType="secondary"
						className={styles.submit_button}
						style={{ fontWeight: '500' }}
						onClick={onLogin}
					>
						<IcCMicrosoft />
						<p className={styles.micro}>{t('login:continue_with_microsoft')}</p>
					</Button>
				</div>
			</div>
		</FluidContainer>
	);
}
export default Login;
