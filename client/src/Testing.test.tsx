import React from 'react';
import { render } from '@testing-library/react';
import Testing from './Testing';

test('should render page with text and test ids', () => {
    const { getByText, getByTestId } = render(<Testing />);
    const testElementText = getByText("testing");
    expect(testElementText).toBeInTheDocument();
    const testElementById = getByTestId(("testing"));
    expect(testElementById).toBeInTheDocument();
});

