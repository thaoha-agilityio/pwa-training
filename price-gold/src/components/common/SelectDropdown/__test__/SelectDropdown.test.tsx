import { render, screen } from '@testing-library/react';

import { SelectDropdown } from '..';

const DropdownOption = [
  {
    label: 'USD',
    value: 'usd',
    icon: '/public/images/us.png',
  },
  {
    label: 'Euro',
    value: 'euro',
    icon: '/public/images/euro.png',
  },
];

const mockProps = {
  options: DropdownOption,
  onSelect: jest.fn(),
};
describe('SelectDropdown Component', () => {
  it('renders correctly with given props', () => {
    const container = render(<SelectDropdown {...mockProps} />);

    expect(container).toMatchSnapshot();
  });

  it('renders error message when provided', () => {
    render(<SelectDropdown {...mockProps} errorMessage="Required field" />);

    expect(screen.getByText('Required field')).toBeInTheDocument();
  });

  it('shows the selected value when provided', () => {
    render(<SelectDropdown {...mockProps} selectedValue="usd" />);

    expect(screen.getByText('USD')).toBeInTheDocument();
  });
});
