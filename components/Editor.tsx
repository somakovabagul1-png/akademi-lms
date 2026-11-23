"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import DOMPurify from "isomorphic-dompurify";
import { useState } from "react";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Sparkles,
  Eye,
} from "lucide-react";

export default function Editor() {
  const [previewContent, setPreviewContent] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: `
      <h2>Yeni Bir Duyuru veya Ödev Başlığı</h2>
      <p>TipTap editörünü burada doğrudan test edebilirsiniz. <strong>Kalın</strong>, <em>italik</em> veya liste elemanları ekleyebilirsiniz:</p>
      <ul>
        <li>Modern ve temiz arayüz</li>
        <li>isomorphic-dompurify ile güvenli XSS koruması</li>
        <li>Zengin metin biçimlendirme araçları</li>
      </ul>
      <blockquote>Eğitimde teknoloji, öğrenmeyi daha erişilebilir kılar.</blockquote>
    `,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose min-h-[160px] p-4 focus:outline-none text-slate-800 dark:text-slate-100 text-sm leading-relaxed text-left",
      },
    },
  });

  if (!editor) return null;

  const handlePreview = () => {
    const rawHtml = editor.getHTML();
    const cleanHtml = DOMPurify.sanitize(rawHtml);
    setPreviewContent(cleanHtml);
    setShowPreview(!showPreview);
  };

  return (
    <div className="rounded-2xl border border-indigo-100 bg-white p-5 shadow-xl shadow-indigo-100/40 dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-none">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white shadow-md shadow-indigo-500/30">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              TipTap Zengin Metin Editörü
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Ödev & duyuru oluşturma aracı (Canlı Önizleme)
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handlePreview}
          className="flex items-center gap-1.5 rounded-xl bg-indigo-50 px-3.5 py-1.5 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-950/60 dark:text-indigo-400 dark:hover:bg-indigo-900/60"
        >
          <Eye className="h-3.5 w-3.5" />
          {showPreview ? "Editöre Dön" : "Güvenli Çıktıyı İncele"}
        </button>
      </div>

      {/* Toolbar */}
      <div className="mt-3 flex flex-wrap items-center gap-1 rounded-xl bg-slate-50 p-1.5 dark:bg-slate-800/60">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`rounded-lg p-2 transition ${
            editor.isActive("bold")
              ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-700 dark:text-indigo-400"
              : "text-slate-600 hover:bg-white/60 dark:text-slate-300 dark:hover:bg-slate-700/50"
          }`}
          title="Kalın"
        >
          <Bold className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`rounded-lg p-2 transition ${
            editor.isActive("italic")
              ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-700 dark:text-indigo-400"
              : "text-slate-600 hover:bg-white/60 dark:text-slate-300 dark:hover:bg-slate-700/50"
          }`}
          title="İtalik"
        >
          <Italic className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`rounded-lg p-2 transition ${
            editor.isActive("strike")
              ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-700 dark:text-indigo-400"
              : "text-slate-600 hover:bg-white/60 dark:text-slate-300 dark:hover:bg-slate-700/50"
          }`}
          title="Üstü Çizili"
        >
          <Strikethrough className="h-4 w-4" />
        </button>

        <div className="mx-1 h-5 w-px bg-slate-200 dark:bg-slate-700" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`rounded-lg p-2 transition ${
            editor.isActive("heading", { level: 1 })
              ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-700 dark:text-indigo-400"
              : "text-slate-600 hover:bg-white/60 dark:text-slate-300 dark:hover:bg-slate-700/50"
          }`}
          title="Başlık 1"
        >
          <Heading1 className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`rounded-lg p-2 transition ${
            editor.isActive("heading", { level: 2 })
              ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-700 dark:text-indigo-400"
              : "text-slate-600 hover:bg-white/60 dark:text-slate-300 dark:hover:bg-slate-700/50"
          }`}
          title="Başlık 2"
        >
          <Heading2 className="h-4 w-4" />
        </button>

        <div className="mx-1 h-5 w-px bg-slate-200 dark:bg-slate-700" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`rounded-lg p-2 transition ${
            editor.isActive("bulletList")
              ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-700 dark:text-indigo-400"
              : "text-slate-600 hover:bg-white/60 dark:text-slate-300 dark:hover:bg-slate-700/50"
          }`}
          title="Madde İmleri"
        >
          <List className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`rounded-lg p-2 transition ${
            editor.isActive("orderedList")
              ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-700 dark:text-indigo-400"
              : "text-slate-600 hover:bg-white/60 dark:text-slate-300 dark:hover:bg-slate-700/50"
          }`}
          title="Numaralı Liste"
        >
          <ListOrdered className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`rounded-lg p-2 transition ${
            editor.isActive("blockquote")
              ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-700 dark:text-indigo-400"
              : "text-slate-600 hover:bg-white/60 dark:text-slate-300 dark:hover:bg-slate-700/50"
          }`}
          title="Alıntı"
        >
          <Quote className="h-4 w-4" />
        </button>

        <div className="mx-1 h-5 w-px bg-slate-200 dark:bg-slate-700" />

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="rounded-lg p-2 text-slate-600 transition hover:bg-white/60 disabled:opacity-30 dark:text-slate-300 dark:hover:bg-slate-700/50"
          title="Geri Al"
        >
          <Undo className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="rounded-lg p-2 text-slate-600 transition hover:bg-white/60 disabled:opacity-30 dark:text-slate-300 dark:hover:bg-slate-700/50"
          title="İleri Al"
        >
          <Redo className="h-4 w-4" />
        </button>
      </div>

      {/* Editor Content or Sanitized Preview */}
      <div className="mt-3 overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-inner dark:border-slate-800 dark:bg-slate-950/60">
        {showPreview ? (
          <div className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                ✓ DOMPurify ile sterilize edilmiş HTML çıktısı:
              </span>
              <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-mono text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                Safe HTML
              </span>
            </div>
            <div
              className="prose prose-sm max-w-none rounded-lg bg-slate-50 p-3 text-slate-800 dark:bg-slate-900 dark:text-slate-200"
              dangerouslySetInnerHTML={{ __html: previewContent }}
            />
          </div>
        ) : (
          <EditorContent editor={editor} />
        )}
      </div>
    </div>
  );
}
