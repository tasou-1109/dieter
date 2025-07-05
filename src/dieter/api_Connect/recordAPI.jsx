import { apiClient } from "./apiClient";

/**
 * データを削除する関数
 * @param {Object} condition - 削除条件（例: { id: 1 }）
 * @returns {Promise<Object>} - 削除結果
 */
export const deleteRecord = async (condition) => {
  return await apiClient.delete("record", condition);
};

/**
 * データを挿入する関数
 * @param {Object} data - 挿入するデータオブジェクト
 * @returns {Promise<Object>} - 挿入結果
 */
export const insertRecord = async (data) => {
  return await apiClient.insert("record", data);
};

/**
 * データを取得する関数
 * @param {Object} condition - 取得条件（例: { user_id: 1 }）
 * @returns {Promise<Object>} - 取得結果
 */
export const selectRecord = async (condition) => {
  return await apiClient.select("record", condition);
};

/**
 * データを更新する関数
 * @param {Object} updates - 更新するデータ（例: { name: "新しい名前" }）
 * @param {Object} condition - 更新条件（例: { id: 1 }）
 * @returns {Promise<Object>} - 更新結果
 */
export const updateRecord = async (updates, condition) => {
  return await apiClient.update("record", updates, condition);
};
