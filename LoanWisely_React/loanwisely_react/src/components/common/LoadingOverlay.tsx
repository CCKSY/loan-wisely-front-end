// Full-screen loading overlay component.
import type { ReactNode } from "react";

type LoadingOverlayProps = {
  visible: boolean;
  title?: string;
  message?: ReactNode;
};

const LoadingOverlay = ({ visible, title, message }: LoadingOverlayProps) => {
  if (!visible) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40"
      role="alert"
      aria-live="polite"
    >
      <div className="w-full max-w-md rounded-3xl border border-stone-200 bg-white px-6 py-6 text-center shadow-soft-lg">
        <div className="text-lg font-semibold text-stone-900">
          {title ?? "처리 중"}
        </div>
        {message ? (
          <p className="mt-2 text-sm text-stone-600">{message}</p>
        ) : null}
        <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-stone-100">
          <div className="h-full w-2/3 animate-pulse rounded-full bg-amber-200" />
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;


