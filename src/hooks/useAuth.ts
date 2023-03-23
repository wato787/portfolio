import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';

function useAuth() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,(user) => {
      if (!user) {
          router.push('/'); // ログインページへリダイレクト
      }
    });

    return unsubscribe;
  }, [router]);
}

export default useAuth;
