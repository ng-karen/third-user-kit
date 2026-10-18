import { forwardRef, useId, useRef, type ReactNode } from 'react';
import type { AlertIntent, AlertProps, AlertRole } from './Alert.types';
import './Alert.css';

const DEFAULT_ROLE: Record<AlertIntent, AlertRole> = {
  info: 'status',
  success: 'status',
  warning: 'alert',
  danger: 'alert',
};

const ICONS: Record<AlertIntent, ReactNode> = {
  // Info circle
  info: (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
      <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm6.5-.25A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
    </svg>
  ),
  // Check circle
  success: (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
      <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm11.28-1.72-4 4a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06l1.47 1.47 3.47-3.47a.75.75 0 1 1 1.06 1.06Z" />
    </svg>
  ),
  // Triangle
  warning: (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
      <path d="M6.46 1.88a1.75 1.75 0 0 1 3.08 0l6.08 11.06A1.75 1.75 0 0 1 14.08 15.5H1.92a1.75 1.75 0 0 1-1.54-2.56L6.46 1.88Zm1.76.72a.25.25 0 0 0-.44 0L1.7 13.66a.25.25 0 0 0 .22.34h12.16a.25.25 0 0 0 .22-.34L8.22 2.6ZM9 11.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-.25-5.25v3a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 1 1.5 0Z" />
    </svg>
  ),
  // Octagon
  danger: (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
      <path d="M4.47.22A.75.75 0 0 1 5 0h6a.75.75 0 0 1 .53.22l4.25 4.25c.14.14.22.33.22.53v6a.75.75 0 0 1-.22.53l-4.25 4.25A.75.75 0 0 1 11 16H5a.75.75 0 0 1-.53-.22L.22 11.53A.75.75 0 0 1 0 11V5a.75.75 0 0 1 .22-.53L4.47.22Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5H5.31ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
    </svg>
  ),
};

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * An Alert has no trigger, so focus can't go "back". After dismiss it moves
 * to the next focusable element after the Alert. If there is none, it moves
 * to the closest earlier one, so focus is never dropped onto <body>.
 */
function moveFocusPast(node: HTMLElement | null) {
  if (!node) return;
  const all = Array.from(document.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => !node.contains(el),
  );
  const after = all.find(
    (el) => node.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING,
  );
  const before = [...all]
    .reverse()
    .find((el) => node.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_PRECEDING);
  (after ?? before)?.focus();
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, forwardedRef) {
  const {
    intent = 'info',
    title,
    icon,
    role,
    className,
    compact = false,
    children,
    action,
    secondaryAction,
    dismissible,
    onDismiss,
  } = props;

  const titleId = useId();
  const localRef = useRef<HTMLDivElement | null>(null);

  const setRefs = (node: HTMLDivElement | null) => {
    localRef.current = node;
    if (typeof forwardedRef === 'function') forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  const handleDismiss = () => {
    moveFocusPast(localRef.current);
    onDismiss?.();
  };

  const resolvedIcon = icon === false ? null : (icon ?? ICONS[intent]);
  const classes = ['tuk-alert', `tuk-alert--${intent}`, compact && 'tuk-alert--compact', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={setRefs}
      className={classes}
      role={role ?? DEFAULT_ROLE[intent]}
      aria-labelledby={titleId}
      data-intent={intent}
    >
      {resolvedIcon && <span className="tuk-alert__icon">{resolvedIcon}</span>}

      <div className="tuk-alert__content">
        <p id={titleId} className="tuk-alert__title">
          {title}
        </p>
        {!compact && children && <div className="tuk-alert__body">{children}</div>}
      </div>

      {action && (
        <div className="tuk-alert__actions">
          <button type="button" className="tuk-alert__action" onClick={action.onClick}>
            {action.label}
          </button>
          {!compact && secondaryAction && (
            <button
              type="button"
              className="tuk-alert__action tuk-alert__action--secondary"
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </button>
          )}
        </div>
      )}

      {dismissible && (
        <button
          type="button"
          className="tuk-alert__dismiss"
          aria-label={`Dismiss ${title}`}
          onClick={handleDismiss}
        >
          <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
            <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.75.75 0 1 1 1.06 1.06L9.06 8l3.22 3.22a.75.75 0 1 1-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 0 1-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z" />
          </svg>
        </button>
      )}
    </div>
  );
});
