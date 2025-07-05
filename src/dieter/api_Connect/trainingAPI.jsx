import { apiClient } from "./apiClient";

/**
 * トレーニングメニューを削除する関数
 * @param {number} delete_id - 削除するトレーニングメニューのID
 * @returns {Promise<Object>} - 削除結果
 */
export const deleteTraining = async (delete_id) => {
  try {
    return await apiClient.delete("workout_menu", { workout_id: delete_id });
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * トレーニングメニューを挿入する関数
 * @param {Object} trainingData - 挿入するトレーニングデータ
 * @returns {Promise<Object>} - 挿入結果
 */
export const insertTraining = async (trainingData) => {
  try {
    return await apiClient.insert("workout_menu", trainingData);
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * トレーニングメニューを取得する関数
 * @param {string} user_name - ユーザー名
 * @returns {Promise<Object[]>} - トレーニングメニューのリスト
 */
export const selectWorkOut = async (user_name) => {
  try {
    return await apiClient.select("workout_menu", { user_name });
  } catch (error) {
    alert(error.message);
  }
};

/**
 * トレーニングメニューを更新する関数
 * @param {Object} updates - 更新するデータ
 * @param {Object} condition - 更新条件
 * @returns {Promise<Object>} - 更新結果
 */
export const updateTraining = async (updates, condition) => {
  try {
    return await apiClient.update("workout_menu", updates, condition);
  } catch (error) {
    alert(error.message);
  }
};
