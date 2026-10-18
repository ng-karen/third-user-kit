import type { ReactNode } from 'react';

/**
 * Severity of the Alert. Sets colour, icon, and the default ARIA role.
 * This prop is named `intent`. Not `variant`, `type`, `status`, or `severity`.
 */
export type AlertIntent = 'info' | 'success' | 'warning' | 'danger';

/** `status` announces politely. `alert` interrupts the screen reader. */
export type AlertRole = 'status' | 'alert';

export interface AlertAction {
  /** Starts with a verb and names the object: "Retry reassignment", not "Retry". */
  label: string;
  onClick: () => void;
}

interface AlertBaseProps {
  /** Defaults to `info`. */
  intent?: AlertIntent;
  /** Required. One line, sentence case, no final period. Must make sense with the icon hidden. */
  title: string;
  /** Defaults to the intent's icon. Pass `false` to hide it. A custom icon must match the intent's severity. */
  icon?: ReactNode | false;
  /** Defaults from `intent`. Override only when the default announcement is wrong for the context. */
  role?: AlertRole;
  /** Layout and spacing only. Do not override colour or typography. */
  className?: string;
}

/** If the Alert can be dismissed, it must say what happens on dismiss. */
type DismissProps =
  | { dismissible?: false; onDismiss?: never }
  | { dismissible: true; onDismiss: () => void };

/** A secondary action only exists next to a primary one. Never more than two. */
type ActionProps =
  | { action?: undefined; secondaryAction?: never }
  | { action: AlertAction; secondaryAction?: AlertAction };

/**
 * Compact is a single line for toolbars and side panels:
 * title plus one action, no body, and never `danger`. A failure deserves the room.
 */
type LayoutProps =
  | { compact?: false; children?: ReactNode }
  | {
      compact: true;
      intent?: Exclude<AlertIntent, 'danger'>;
      children?: never;
      secondaryAction?: never;
    };

export type AlertProps = AlertBaseProps & DismissProps & ActionProps & LayoutProps;
