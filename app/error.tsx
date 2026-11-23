"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Uygulama hatası:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 p-6 text-white">
      <div className="max-w-md rounded-3xl border border-slate-800 bg-slate-950 p-8 text-center shadow-2xl">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400">
          <AlertTriangle className="h-7 w-7" />
        </div>
        <h2 className="mt-5 text-xl font-bold">Bir Yükleme Sorunu Oluştu</h2>
        <p className="mt-2 text-xs text-slate-400 leading-relaxed">
          Veritabanı bağlantısı veya sunucu isteği sırasında bir sorun meydana geldi. Lütfen tekrar deneyin.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg transition hover:brightness-110 active:scale-95"
        >
          <RefreshCw className="h-4 w-4" />
          Sayfayı Yeniden Yükle
        </button>
      </div>
    </div>
  );
}
