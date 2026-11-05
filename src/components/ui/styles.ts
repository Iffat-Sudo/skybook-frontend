// Shared Tailwind classes for forms, so all forms look the same (from the Figma style guide)
export const fieldClass =
  "h-12 w-full rounded-lg border border-neutral-200 bg-white px-3 text-small text-neutral-900 " +
  "focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100 " +
  "disabled:bg-neutral-50 disabled:text-neutral-600";

export const labelClass = "flex flex-col gap-1";

export const labelTextClass = "text-caption text-neutral-600";

export const primaryButtonClass =
  "h-12 rounded-lg bg-primary-600 px-6 text-small font-medium text-white hover:bg-primary-700 " +
  "disabled:cursor-not-allowed disabled:opacity-60";

export const errorBoxClass = "rounded-lg bg-error-50 px-3 py-2 text-small text-error-600";