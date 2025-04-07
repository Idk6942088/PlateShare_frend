// @vitest-environment jsdom <- Control Comment!!! VAGY vite.config.js (defineConfig részbe) -> test: { environment: 'jsdom' }
import { describe, test, expect } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import Etelek from "./Etelek";
import { Home } from "./Home";
import { createBrowserRouter } from "react-router-dom";


describe('Etelek.jsx', () => {
  /*
  test('kereso input', async () => {
  
    const user = userEvent.setup();
    render(<Etelek db={db} />);
    screen.debug();
    const input = screen.getByPlaceholderText('Keresés... (Élelmiszer neve, helyszín, kategória)');
    await user.clear(input);
    await user.type(input, 'alma')
    expect(input).toHaveValue('alma');
    cleanup();
  
  })
  */
 test('Home.jsx', async () => {
  render(<Home />)
  screen.debug();
  /* Megkeressük a linket
  const linkElement = screen.getByText(/kattintással!/i);
  
  // Kattintunk a linkre
  fireEvent.click(linkElement);
  
  // Ellenőrizzük, hogy a helyes URL-re navigáltunk
  expect(window.location.pathname).toBe('/etelek');
  */
 })
 
  
})

