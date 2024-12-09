import React, { useState } from "react";
import { motion } from "framer-motion";
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      message: "",
    });
  
    const [formErrors, setFormErrors] = useState({});
    const [submitStatus, setSubmitStatus] = useState("");
  
    // 入力値の検証
    const validateForm = () => {
      const errors = {};
      if (!formData.name.trim()) {
        errors.name = "お名前を入力してください";
      }
      if (!formData.email.trim()) {
        errors.email = "メールアドレスを入力してください";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "有効なメールアドレスを入力してください";
      }
      if (!formData.message.trim()) {
        errors.message = "メッセージを入力してください";
      }
      return errors;
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      // 入力時のエラーをクリア
      if (formErrors[name]) {
        setFormErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const errors = validateForm();
  
      if (Object.keys(errors).length === 0) {
        // フォーム送信処理
        console.log("送信されたデータ:", formData);
        setSubmitStatus("送信が完了しました！");
        // フォームをリセット
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        // 3秒後にステータスメッセージをクリア
        setTimeout(() => setSubmitStatus(""), 3000);
      } else {
        setFormErrors(errors);
      }
    };
  
    return (
      <div className="page contact">
        <div className="content">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            お問い合わせ
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            ご質問やご要望がございましたら、以下のフォームよりお気軽にお問い合わせください
          </motion.p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="お名前"
              />
              {formErrors.name && (
                <div className="error-message">{formErrors.name}</div>
              )}
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="メールアドレス"
              />
              {formErrors.email && (
                <div className="error-message">{formErrors.email}</div>
              )}
            </div>
            <div className="form-group">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="メッセージ"
                rows="5"
              ></textarea>
              {formErrors.message && (
                <div className="error-message">{formErrors.message}</div>
              )}
            </div>
            {submitStatus && (
              <div className="success-message">{submitStatus}</div>
            )}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              送信
            </motion.button>
          </form>
        </div>
      </div>
    );
  };
  
  export default Contact;
  