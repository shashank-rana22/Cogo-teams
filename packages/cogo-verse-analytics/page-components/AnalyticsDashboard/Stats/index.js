/* eslint-disable max-len */
import { Placeholder, cl } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import React, { useEffect } from 'react';

import chartData from '../../../configurations/chart-data';
import { imgURL } from '../../../constants/image-urls';
import useGetUsersStats from '../../../hooks/useGetUsersStats';

import LeaderBoard from './LeaderBoard';
import Charts from './LineChart';
import PrimaryStats from './PrimaryStats';
import styles from './styles.module.css';

function Stats(props = {}) {
	const { userStats = {}, getUserSats, firebaseLoading = false } = useGetUsersStats();
	const {
		chatLoading = false,
		platFormChatData = {},
		token = '',
	} = props || {};
	console.log('token:', token);

	useEffect(() => {
		const auth = getAuth();
		signInWithCustomToken(auth, token)
			.catch((error) => {
				console.log('firestore_auth_error:', error.message);
			});
		getUserSats();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const { bot_data = {}, customer_support_data = {} } = platFormChatData || {};
	const GraphData = chartData({ platFormChatData }) || [];
	const hideChart = isEmpty(bot_data) && isEmpty(customer_support_data);

	return (
		<div className={styles.main_container}>

			<div className={styles.cogoverse_header}>

				<img src={imgURL.cogoverse_animated_icon} style={{ marginLeft: '10px' }} alt="Cogoverse Icon" width="18px" />
				<div className={cl`${styles.cogoverse}`}>ogoVerse Analytics</div>
			</div>

			<PrimaryStats userStats={userStats} firebaseLoading={firebaseLoading} />

			<div className={styles.line_chart_container}>
				<div className={styles.chart_heading}>
					<div className={styles.chart_heading_content}>Responsive Time Analysis</div>
					{
						!chatLoading && !hideChart && (
							<div>
								<div className={styles.legend_field}>
									<div className={styles.legend_icon_1} />
									<div className={styles.legend_content}>CogoAssist</div>
								</div>
								<div className={styles.legend_field}>
									<div className={styles.legend_icon_2} />
									<div className={styles.legend_content}>Customer support</div>
								</div>
							</div>
						)
					}

				</div>
				<div className={styles.the_chart}>
					{
						!chatLoading ? <Charts GraphData={GraphData} hideChart={hideChart} />
							: (
								<div className={styles.chart_empty}>
									<Placeholder height="1px" margin="10px 0px" />
									<Placeholder height="1px" margin="10px 0px" />
									<Placeholder height="1px" margin="10px 0px" />
									<Placeholder height="1px" margin="10px 0px" />
									<Placeholder height="1px" margin="10px 0px" />

									<object
										data={imgURL.empty_bot}
										type="image/svg+xml"
										aria-label="Loading Chart..."
										className={styles.empty_bot_svg}
									/>
								</div>
							)
					}

				</div>

			</div>

			<LeaderBoard {...props} />

		</div>
	);
}

Stats.getInitialProps = async () => {
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
	let token = '';

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

export default Stats;
