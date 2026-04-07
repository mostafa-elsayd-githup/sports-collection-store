"use client";

import { useEffect } from "react";
import Link from "next/link";
import style from "./error.module.css"; // استيراد ملف الـ CSS

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Error detected:", error);
  }, [error]);

  return (
    <div className={style.error_wrapper}>
      {/* أيقونة التحذير */}
      <div className={style.icon_box}>
        <i className="fa-solid fa-triangle-exclamation"></i>
      </div>

      <h1 className={style.title}>حدث خطأ غير متوقع</h1>
      
      <p className={style.description}>
        {error.message || "يبدو أن هناك مشكلة في الاتصال بالسيرفر حالياً. لا تقلق، يمكنك المحاولة مرة أخرى أو العودة للرئيسية."}
      </p>

      <div className={style.button_group}>
        {/* زرار إعادة المحاولة */}
        <button
          onClick={() => reset()}
          className={style.btn_reset}
        >
          إعادة المحاولة
        </button>

        {/* زرار العودة للرئيسية */}
        <Link href="/" className={style.btn_home}>
          الرئيسية
        </Link>
      </div>

      {/* كود الخطأ التقني */}
      <small className={style.error_code}>
        Error Code: {error.digest || "FETCH_FAILED"}
      </small>
    </div>
  );
}