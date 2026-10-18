import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';
import { Alert } from './Alert';

describe('Alert', () => {
  describe('roles', () => {
    it.each([
      ['info', 'status'],
      ['success', 'status'],
      ['warning', 'alert'],
      ['danger', 'alert'],
    ] as const)('%s defaults to role="%s"', (intent, role) => {
      render(<Alert intent={intent} title="Something happened" />);
      expect(screen.getByRole(role)).toBeInTheDocument();
    });

    it('defaults to info when no intent is given', () => {
      render(<Alert title="Changes apply to new tickets only" />);
      expect(screen.getByRole('status')).toHaveAttribute('data-intent', 'info');
    });

    it('lets role be overridden', () => {
      render(<Alert intent="warning" role="status" title="Response due in 40 minutes" />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('is named by its title', () => {
      render(<Alert intent="danger" title="Three tickets could not be reassigned" />);
      expect(screen.getByRole('alert', { name: 'Three tickets could not be reassigned' })).toBeInTheDocument();
    });
  });

  describe('content', () => {
    it('renders the body', () => {
      render(
        <Alert title="Changes apply to new tickets only">
          Tickets already in this queue keep their current routing.
        </Alert>,
      );
      expect(screen.getByText(/keep their current routing/)).toBeInTheDocument();
    });

    it('hides the icon when icon={false}', () => {
      const { container } = render(<Alert title="No icon" icon={false} />);
      expect(container.querySelector('.tuk-alert__icon')).toBeNull();
    });
  });

  describe('actions', () => {
    it('calls the primary and secondary actions', async () => {
      const retry = vi.fn();
      const download = vi.fn();
      render(
        <Alert
          intent="danger"
          title="Three of twelve tickets could not be reassigned"
          action={{ label: 'Retry the three', onClick: retry }}
          secondaryAction={{ label: 'Download the list', onClick: download }}
        />,
      );
      await userEvent.click(screen.getByRole('button', { name: 'Retry the three' }));
      await userEvent.click(screen.getByRole('button', { name: 'Download the list' }));
      expect(retry).toHaveBeenCalledOnce();
      expect(download).toHaveBeenCalledOnce();
    });
  });

  describe('dismiss', () => {
    it('names the dismiss control after the title', () => {
      render(<Alert title="Response due in 40 minutes" dismissible onDismiss={() => {}} />);
      expect(screen.getByRole('button', { name: 'Dismiss Response due in 40 minutes' })).toBeInTheDocument();
    });

    it('calls onDismiss and moves focus to the next focusable element', async () => {
      const onDismiss = vi.fn();
      render(
        <div>
          <Alert title="Response due in 40 minutes" dismissible onDismiss={onDismiss} />
          <button type="button">Next thing</button>
        </div>,
      );
      await userEvent.click(screen.getByRole('button', { name: /^Dismiss/ }));
      expect(onDismiss).toHaveBeenCalledOnce();
      expect(screen.getByRole('button', { name: 'Next thing' })).toHaveFocus();
    });

    it('falls back to the previous focusable element when nothing follows', async () => {
      render(
        <div>
          <button type="button">Before</button>
          <Alert title="Last thing on the page" dismissible onDismiss={() => {}} />
        </div>,
      );
      await userEvent.click(screen.getByRole('button', { name: /^Dismiss/ }));
      expect(screen.getByRole('button', { name: 'Before' })).toHaveFocus();
    });
  });

  describe('compact', () => {
    it('drops the body even if one is passed at runtime', () => {
      // @ts-expect-error compact does not accept children
      render(<Alert compact title="Filters hide 4 rows">Should not render</Alert>);
      expect(screen.queryByText('Should not render')).toBeNull();
    });
  });

  describe('type contract', () => {
    it('rejects misuse at compile time', () => {
      // These lines exist for the type checker. Each must fail to compile.
      // @ts-expect-error dismissible requires onDismiss
      void (<Alert title="x" dismissible />);
      // @ts-expect-error secondaryAction requires action
      void (<Alert title="x" secondaryAction={{ label: 'Download the list', onClick: () => {} }} />);
      // @ts-expect-error compact cannot be danger
      void (<Alert compact intent="danger" title="x" />);
      // @ts-expect-error the prop is intent, not variant
      void (<Alert variant="warning" title="x" />);
      expect(true).toBe(true);
    });
  });

  describe('accessibility', () => {
    it.each(['info', 'success', 'warning', 'danger'] as const)('%s has no axe violations', async (intent) => {
      const { container } = render(
        <Alert
          intent={intent}
          title="Something happened"
          action={{ label: 'Open details', onClick: () => {} }}
          dismissible
          onDismiss={() => {}}
        >
          Supporting detail.
        </Alert>,
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
