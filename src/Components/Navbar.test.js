import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar'; 
import '@testing-library/jest-dom';

describe('Navbar', () => {
  test('Deberia renderizar el titulo "Prei Plant Applicatie"', () => {
    render(
        <MemoryRouter>
            <Navbar />
        </MemoryRouter>
    );

    // Verificar si el título está en el documento
    const titleElement = screen.getByText(/Prei Plant Applicatie/i);
    expect(titleElement).toBeInTheDocument(); // Aseguramos que el título esté presente
  });
});