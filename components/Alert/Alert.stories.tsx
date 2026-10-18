import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useState } from 'react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: { layout: 'padded' },
  argTypes: {
    intent: { control: 'inline-radio', options: ['info', 'success', 'warning', 'danger'] },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

/* The three flows from the doc. Every example is tied to a real product flow. */

export const ApproachingSlaBreach: Story = {
  name: 'Ticket detail: approaching SLA breach',
  args: {
    intent: 'warning',
    title: 'Response due in 40 minutes',
    action: { label: 'Open reply editor', onClick: fn() },
    children: 'This ticket is covered by the Priority Support agreement.',
  },
};

export const BulkReassignmentPartialFailure: Story = {
  name: 'Bulk reassignment: partial failure',
  args: {
    intent: 'danger',
    title: 'Three of twelve tickets could not be reassigned',
    action: { label: 'Retry the three', onClick: fn() },
    secondaryAction: { label: 'Download the list', onClick: fn() },
    dismissible: true,
    onDismiss: fn(),
    children: 'The assignee is at capacity for this queue.',
  },
};

export const QueueSettingsConsequence: Story = {
  name: 'Queue settings: configuration consequence',
  args: {
    intent: 'info',
    title: 'Changes apply to new tickets only',
    children: 'Tickets already in this queue keep their current routing.',
  },
};

export const CompactInToolbar: Story = {
  name: 'Ticket list toolbar: compact',
  args: {
    compact: true,
    intent: 'info',
    title: 'Filters hide 4 tickets',
    action: { label: 'Clear filters', onClick: fn() },
  },
};

export const AllIntents: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      <Alert intent="info" title="Changes apply to new tickets only" />
      <Alert intent="success" title="Twelve tickets reassigned to Priya" />
      <Alert intent="warning" title="Response due in 40 minutes" />
      <Alert intent="danger" title="Three of twelve tickets could not be reassigned" />
    </div>
  ),
};

/* Try dismiss with the keyboard: focus should land on "Next field", not on <body>. */
export const DismissFocus: Story = {
  render: function DismissDemo() {
    const [open, setOpen] = useState(true);
    return (
      <div style={{ display: 'grid', gap: 12, maxWidth: 560 }}>
        {open ? (
          <Alert
            intent="warning"
            title="Response due in 40 minutes"
            dismissible
            onDismiss={() => setOpen(false)}
          />
        ) : (
          <button type="button" onClick={() => setOpen(true)}>
            Show the Alert again
          </button>
        )}
        <label>
          Next field <input />
        </label>
      </div>
    );
  },
};
