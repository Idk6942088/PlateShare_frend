// @vitest-environment jsdom <- Control Comment!!! VAGY vite.config.js (defineConfig részbe) -> test: { environment: 'jsdom' }
import { describe, test, expect } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import Etelek from "./Etelek";
import { Home } from "./Home";
import { createBrowserRouter, Link, MemoryRouter } from "react-router-dom";


describe('Home.jsx Link to /...', () => {
  test('should render Ételek button and link to /etelek', () => {
    render(
      <MemoryRouter>
        <Link to='/etelek' className='home_bg_gombok_reg'>
          <input type="button" value="Ételek" />
        </Link>
      </MemoryRouter>
    )
    const button = screen.getByRole('button', { name: /ételek/i })
    expect(button).toBeInTheDocument()
    expect(button.closest('a')).toHaveAttribute('href', '/etelek')
    expect(button.closest('a')).toHaveClass('home_bg_gombok_reg')
  })

  test('should render Kapcsolat button and link to /kapcsolat', () => {
    render(
      <MemoryRouter>
        <Link to='/kapcsolat' >
          <input type="button" value="Kapcsolat" />
        </Link>
      </MemoryRouter>
    )
    const button = screen.getByRole('button', { name: /kapcsolat/i })
    expect(button).toBeInTheDocument()
    expect(button.closest('a')).toHaveAttribute('href', '/kapcsolat')
  })

  test('should render "kattintással!" button and link to /etelek', () => {
    render(
      <MemoryRouter>
        <Link to='/etelek' className='bg-green-400 ml-1 rounded-sm italic'>
          <input type="button" value="kattintással!" />
        </Link>
      </MemoryRouter>
    )
    const button = screen.getByRole('button', { name: /kattintással!/i })
    expect(button).toBeInTheDocument()
    expect(button.closest('a')).toHaveAttribute('href', '/etelek')
    expect(button.closest('a')).toHaveClass('bg-green-400 ml-1 rounded-sm italic')
  })
})

describe('Layout.jsx Link to /blog', () => {
  test('should render Blog button and link to /blog', () => {
    render(
      <MemoryRouter>
        <Link className='footer_link' to='/blog'>
          <input type="button" value="Blog" />
        </Link>
      </MemoryRouter>
    )
    const button = screen.getByRole('button', { name: /blog/i })
    expect(button).toBeInTheDocument()
    expect(button.closest('a')).toHaveAttribute('href', '/blog')
    expect(button.closest('a')).toHaveClass('footer_link')
  })
})

describe('Blog.jsx Link to /blog/receptupload', () => {
  test('should render Blog button and link to /blog', () => {
    render(
      <MemoryRouter>
        <Link to="/blog/receptupload">
          <button className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Recept feltöltése
          </button>
        </Link>
      </MemoryRouter>
    )
    const button = screen.getByRole('button', { name: /recept feltöltése/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-blue-500')
    const link = button.closest('a')
    expect(link.closest('a')).toHaveAttribute('href', '/blog/receptupload')
  })
})
