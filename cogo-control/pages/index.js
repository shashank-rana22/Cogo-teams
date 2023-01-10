// import { useSelector } from '@cogoport/store';
import { useRouter } from '@cogoport/next';
import { useEffect } from 'react';
// import React, { useEffect } from 'react';
// import useSWR from 'swr';

// const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Check() {
	const router = useRouter();
	useEffect(() => {
		router.push('/login');
	}, [router]);
	return 'Redirecting to login ...';
}
