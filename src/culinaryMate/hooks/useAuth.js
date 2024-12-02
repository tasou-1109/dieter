import { useState, useEffect } from 'react';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ユーザーの認証状態を確認
  useEffect(() => {
    const storedUser = localStorage.getItem('culinaryMate_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // ログイン処理
  const login = async (credentials) => {
    setLoading(true);
    try {
      // ここで実際の認証APIを呼び出す
      const mockUser = {
        id: Date.now(),
        name: credentials.username,
        email: credentials.email
      };

      localStorage.setItem('culinaryMate_user', JSON.stringify(mockUser));
      setUser(mockUser);
      setLoading(false);
    } catch (err) {
      setError('ログインに失敗しました');
      setLoading(false);
    }
  };

  // ログアウト処理
  const logout = () => {
    localStorage.removeItem('culinaryMate_user');
    setUser(null);
  };

  return {
    user,
    loading,
    error,
    login,
    logout
  };
};

export default useAuth;