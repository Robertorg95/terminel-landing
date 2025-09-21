import { useEffect } from "react";

export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;

  // Cerrar con ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      {/* cuadro */}
      <div className="relative bg-white w-[min(92vw,720px)] max-h-[85vh] rounded-2xl shadow p-6 overflow-auto">
        <button
          aria-label="Cerrar"
          onClick={onClose}
          className="absolute right-3 top-3 text-slate-500 hover:text-slate-700"
        >
          ×
        </button>
        {title && (
          <h3 className="font-[Bodoni Moda] text-xl mb-3 text-slate-900">{title}</h3>
        )}
        <div className="text-slate-700 leading-relaxed whitespace-pre-line">
          {children}
        </div>
      </div>
    </div>
  );
}
