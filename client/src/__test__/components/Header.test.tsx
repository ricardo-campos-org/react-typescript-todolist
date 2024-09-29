import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Header from '../../components/Header';

describe('Header component test', () => {
  it('should renders the Header with all elements', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    const logo = screen.getByAltText('TaskNote logo');
    const homeLink = screen.getByText('Home');
    const tasksLink = screen.getByText('Tasks');
    const notesLink = screen.getByText('Notes');
    const aboutLink = screen.getByText('About');

    expect(logo).toBeDefined();
    expect(homeLink).toBeDefined();
    expect(tasksLink).toBeDefined();
    expect(notesLink).toBeDefined();
    expect(aboutLink).toBeDefined();
  });
});