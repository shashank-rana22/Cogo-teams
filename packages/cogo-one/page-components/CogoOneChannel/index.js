import { IcMDownload } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';

import { firebaseConfig } from '../../configurations/firebase-config';
import { ANDRIOD_APK } from '../../constants';
import { hasPermission } from '../../constants/IDS_CONSTANTS';
import useAgentWorkPrefernce from '../../hooks/useAgentWorkPrefernce';
import useCreateUserInactiveStatus from '../../hooks/useCreateUserInactiveStatus';
import useListChats from '../../hooks/useListChats';
import useListChatSuggestions from '../../hooks/useListChatSuggestions';

import Conversations from './Conversations';
import Customers from './Customers';
import DialCallModal from './DialCallModal';
import EmptyChatPage from './EmptyChatPage';
import ProfileDetails from './ProfileDetails';
import styles from './styles.module.css';

function CogoOne({ token }) {
	const {
		agentStatus = {},
		fetchworkPrefernce = () => {},
	} = useAgentWorkPrefernce();

	const { status = '' } = agentStatus || {};

	const [activeTab, setActiveTab] = useState('message');
	const [toggleStatus, setToggleStatus] = useState(false);
	const [activeVoiceCard, setActiveVoiceCard] = useState({});
	const [searchValue, setSearchValue] = useState('');
	const [showBotMessages, setShowBotMessages] = useState(false);
	const [filterVisible, setFilterVisible] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const { suggestions = [] } = useListChatSuggestions();
	const [showDialModal, setShowDialModal] = useState(false);
	const [modalType, setModalType] = useState({ type: null, data: {} });
	const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

	useEffect(() => {
		const auth = getAuth();
		signInWithCustomToken(auth, token)
			.then((userCredential) => {
				console.log('userCredential:', userCredential);
				// Signed in

			// ...
		  })
			.catch((error) => {
				console.log(error.message);
			});
	}, [token]);

	const firestore = getFirestore(app);

	const { userRoleIds, userId } = useSelector(({ profile }) => ({
		userRoleIds : profile.partner?.user_role_ids || [],
		userId      : profile?.user?.id,
	}));

	const isomniChannelAdmin = userRoleIds?.some((eachRole) => hasPermission.includes(eachRole)) || false;

	const {
		loading:statusLoading,
		updateUserStatus = () => {},
	} = useCreateUserInactiveStatus({ fetchworkPrefernce, setOpenModal });

	const {
		listData = {},
		setActiveMessage = () => {},
		activeMessageCard = {},
		setAppliedFilters = () => {},
		appliedFilters,
		loading,
		setActiveCardId,
		activeCardId,
		firstLoading,
		updateLeaduser,
		handleScroll,
	} = useListChats({
		firestore,
		userId,
		isomniChannelAdmin,
		showBotMessages,
		searchValue,
	});
	const { messagesList = [], unReadChatsCount } = listData;

	useEffect(() => {
		if (!firstLoading) {
			setActiveVoiceCard({});
			setActiveCardId('');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeTab, showBotMessages]);

	useEffect(() => {
		setToggleStatus(status === 'active');
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(agentStatus)]);

	const renderComponent = () => {
		if ((activeTab === 'message' && !isEmpty(activeMessageCard))
			|| (activeTab === 'voice' && !isEmpty(activeVoiceCard))) {
			return (
				<>
					<Conversations
						activeTab={activeTab}
						activeMessageCard={activeMessageCard}
						firestore={firestore}
						activeVoiceCard={activeVoiceCard}
						suggestions={suggestions}
						userId={userId}
						isomniChannelAdmin={isomniChannelAdmin}
						showBotMessages={showBotMessages}
					/>
					<ProfileDetails
						activeMessageCard={activeMessageCard}
						activeTab={activeTab}
						activeVoiceCard={activeVoiceCard}
						firestore={firestore}
						updateLeaduser={updateLeaduser}
						activeCardId={activeCardId}
						setModalType={setModalType}
					/>
				</>
			);
		}
		return (
			<EmptyChatPage
				displayMessage={activeTab === 'message' ? 'chat' : 'call log'}
			/>
		);
	};

	return (
		<div className={styles.layout_container}>
			<Customers
				setActiveCardId={setActiveCardId}
				isomniChannelAdmin={isomniChannelAdmin}
				setActiveMessage={setActiveMessage}
				activeMessageCard={activeMessageCard}
				setActiveVoiceCard={setActiveVoiceCard}
				activeVoiceCard={activeVoiceCard}
				setSearchValue={setSearchValue}
				searchValue={searchValue}
				setFilterVisible={setFilterVisible}
				filterVisible={filterVisible}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				setToggleStatus={setToggleStatus}
				toggleStatus={toggleStatus}
				messagesList={messagesList}
				unReadChatsCount={unReadChatsCount}
				appliedFilters={appliedFilters}
				setAppliedFilters={setAppliedFilters}
				fetchworkPrefernce={fetchworkPrefernce}
				messagesLoading={loading}
				setOpenModal={setOpenModal}
				openModal={openModal}
				updateUserStatus={updateUserStatus}
				statusLoading={statusLoading}
				activeCardId={activeCardId}
				setShowBotMessages={setShowBotMessages}
				showBotMessages={showBotMessages}
				setShowDialModal={setShowDialModal}
				handleScroll={handleScroll}
				setModalType={setModalType}
				modalType={modalType}
			/>

			<div className={styles.chat_details_continer}>
				{renderComponent()}
			</div>
			<div
				className={styles.download_apk}
			>
				<div
					role="presentation"
					className={styles.download_div}
					// eslint-disable-next-line no-undef
					onClick={() => window.open(ANDRIOD_APK, '_blank')}
				>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/cogo-logo-without-bg"
						alt="bot"
						className={styles.bot_icon_styles}
					/>
					<div className={styles.text_styles}>
						<div className={styles.flex}>
							<IcMDownload
								fill="#EE3425"
								className={styles.download_icon}
							/>
							<div>Get the</div>
						</div>
						app now
					</div>
				</div>
			</div>
			{showDialModal && (
				<DialCallModal
					setShowDialModal={setShowDialModal}
					showDialModal={showDialModal}
				/>
			)}
		</div>
	);
}

CogoOne.getInitialProps = async () => {
	const admin = require('firebase-admin');

	const serviceAccount = {
		type           : 'service_account',
		project_id     : 'fir-cogoport',
		private_key_id : 'bfa8d7ed395e706326e650373123e8df2d73df5b',
		private_key:
			'-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDbl5V5D13nsqRo\nXRMzXjOfF3cWUucUOk1Yna/F/1tjVZsOViCi+jBTudlSHI8knviu/1VxJQZ1HTFN\nz8abiPHirh9WyXOOK9QA42zesDTS85xmz0d1VrS3cGPHuuohAKhQrg0Brght+HYJ\nxyAoTfH6DNjYcJL4epGn6WHedkg8QzHZZ1lAv07SzUCxnBlMX5vJ17mTNpgZvQ0P\nikOPdDcyMaWLvre1dHauVfFJJ3lYz5SN1+UckeAEA84AS/m6GUDgYJnwJar3CcQw\nmqBqKtIO1VzaHJmjhzpHDKiWsTWdRkTB9pCSOfixUF3m0pRF68wh8roqln3lJba7\n/YDx7PpHAgMBAAECggEAKP3xDzpJI1l7y2ekj/BD3qz4tBghvurrSWGWUHXMz4xJ\nd7GoQgRGRTrqUKO4LPPoJHLRtl9dBzu92nKw9pPn45LxkrfkdGPGHaxWxHNMSRzk\n02RaSJM5BQ1b8wr3bdW7leQH1YpxVGYPUt/zJtL2GuGPEUhihzQKQLgWZvrZnTXt\nbGF/tlFFMH8laiQMngFQGpwAyoGZ5jDhlSbMff3ZUT3TdlLIYF7vg6klFOAiecHY\n4N+fHannyj/Ll2Nu9GoxSDtLpH5DG6Mf7SN0HT9epUs9X6wM/47RezK8PK8jCjQy\nriQOfwPqOzDX3cR1zdmY7HYQ6l4xHAqPvAmtUJ0hIQKBgQDx42Hqbcs9eWj+ZKSL\n7G9Dt+tyqQqKyKtXbix53Ng8XR6N2+h6IZOstvLjvgJlf0kLJ4p2Zo04oeqU8nVM\nQ1w4wQ5DPGazsgwluUpUNavDF8JmMLh2XKtCnWZ4itpH1Dp1nhjHF91QUkDGGhHG\n9FK3xtpmPVGEMVgUDEmny8yiHwKBgQDoZzUutnl0tRRIzWrrHnGzrrwemhqMzELO\nEgUn4wX1vt6uTdFUUfpR9+AWP37Rmj2epQap0aj4fIPR02TLhAXbqwxzaoJqnJ72\nTg/dCQY88e3JRs2hC8UjGm6Uf/I4oMKNWAniW0zanFl6nf/Lzj3UPVGM9cil9Ff/\nikzoy4Ky2QKBgFZHFJXZs7SpqZmTrF18Z/Nvlru/L9Nw4Cy/T33oF/jv/gX7emCV\nuWbRmrFBBPnO/O7Nm8W/rn+UwWd/U/dvz2Uu9zdkQ/20dEDAZpLC0hE0WFK67hDJ\n3QxVuEcmv9T/DhsF2TCqgnYz4IbIpa6hVx/V/fCZzomoUBJWj68aMlNhAoGBAM0j\n9PzT02fiQxJ0SFFcIS9jKOi2TINF9h4iJ+zqZyNhpPwk8obEifn6nBHnYFEyHfxA\nXR5fVBBrEIyRVaKTWfxqAuaJ+K6Uq3hstXH9ekUnpCaL2gyy8AOpXDy2p5+2v6S2\nNptYzgEWC6HBf75twYPr0GVluwRKJ7cIZBUFNswZAoGAVKBPuSJQsrUyaaGcdLAZ\ncq3HJAGbaMvyVei4li5RwCRanz5NQ6jBkfBZxM66Iwp3emA/4MOGnhPhP9ktbQOJ\nh9kzHWBf3Ubn/Oh99qSe97PHeMnjpTtdRvsqPiG3l6uHxmLXtRgNC21lVNeggP3H\nF5hQryA0ExnpkJB2R49gUmQ=\n-----END PRIVATE KEY-----\n',
		client_email:
			'firebase-adminsdk-om6pz@fir-cogoport.iam.gserviceaccount.com',
		client_id                   : '101209778079293410230',
		auth_uri                    : 'https://accounts.google.com/o/oauth2/auth',
		token_uri                   : 'https://oauth2.googleapis.com/token',
		auth_provider_x509_cert_url : 'https://www.googleapis.com/oauth2/v1/certs',
		client_x509_cert_url:
			'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-om6pz%40fir-cogoport.iam.gserviceaccount.com',
	};
	const config = {
		credential  : admin.credential.cert(serviceAccount),
		databaseURL : 'https://fir-cogoport-default-rtdb.firebaseio.com',
	};
	const appExists = admin.apps.some((val) => val.name === 'secondary');

	const secondary_app = appExists
		? admin.app('secondary')
		: admin.initializeApp(config, 'secondary');

	const uid = process.env.FIREBASE_AUTH_UID;
	const adminAuth = admin.auth(secondary_app);
	let token = 'io';

	await adminAuth
		.createCustomToken(uid)
		.then((customToken) => {
			token = customToken;
		})
		.catch((error) => {
			console.log(error);
		});

	return { layout: 'desktop', token };
};

export default CogoOne;
