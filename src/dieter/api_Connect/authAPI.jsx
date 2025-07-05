import { apiClient } from "./apiClient";

/**
 * サインアップ処理を行う関数
 * @param {string} email - メールアドレス
 * @param {string} password - パスワード
 * @param {Object} options - ユーザー情報などの追加オプション
 * @returns {Promise<Object>} - サインアップ結果
 */
export const signUp = async (email, password, options) => {
  try {
    return await apiClient.signUp(email, password, options);
  } catch (error) {
    alert(error.message);
  }
};

/**
 * サインイン処理を行う関数
 * @param {string} email - メールアドレス
 * @param {string} password - パスワード
 * @returns {Promise<Object>} - サインイン結果
 */
export const signIn = async (email, password) => {
  try {
    return await apiClient.signIn(email, password);
  } catch (error) {
    alert(error.message);
  }
};

/**
 * サインアウト処理を行う関数
 * @returns {Promise<Object>} - サインアウト結果
 */
export const signOut = async () => {
  try {
    return await apiClient.signOut();
  } catch (error) {
    alert(error.message);
  }
};

/**
 * セッション情報とユーザー情報を取得する関数
 * @returns {Promise<Object>} - セッション詳細
 */
export const getSessionDetail = async () => {
  let sessionDetail = {};
  try {
    const { data } = await apiClient.getSession();
    if (data && data.session) {
      const user = await apiClient.getUser();
      sessionDetail["session"] = data.session.access_token;
      sessionDetail["user_id"] = user.data.user.id;
      sessionDetail["user_name"] = user.data.user.user_metadata.Name;
    }
    return sessionDetail;
  } catch (error) {
    alert(error.message);
  }
};

/**
 * セッション情報を取得する関数
 * @returns {Promise<Object>} - セッション情報
 */
export const getSession = async () => {
  try {
    return await apiClient.getSession();
  } catch (error) {
    alert(error.message);
  }
};
