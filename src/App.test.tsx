import { render, screen, cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';



//Мне еще не приходилось писать тесты, но теперь знаю что буду изучать дальше.
describe("App tests", () => {
  beforeEach(() => {
    render(<App />);
  })
  
  afterEach(() => {
    cleanup();
  })

  it("should display all 4 buttons", () => {
    expect(screen.getByTestId("all")).toBeInTheDocument();
    expect(screen.getByTestId("active")).toBeInTheDocument();
    expect(screen.getByTestId("completed")).toBeInTheDocument();
    expect(screen.getByTestId("clear")).toBeInTheDocument();
  }),

  it("should create todo element", () => {
    const input = document.querySelector(".input")! as HTMLInputElement;
    input.value = "test";
    const form = document.querySelector("form")! as HTMLFormElement;
    act(() => {
      form.submit();
    })
    expect(screen.getByText("test")).toBeInTheDocument();
  }),

  it("should complete todo task", () => {
    const input = document.querySelector(".input")! as HTMLInputElement;
    input.value = "test";
    const form = document.querySelector("form")! as HTMLFormElement;
    act(() => {
      form.submit();
    })
    act(() => {
      const todoElem = document.querySelector(".todo-elem")!;
      if (todoElem instanceof HTMLElement) {
        todoElem.click();
      }
    })
    expect(document.querySelector(".todo-completed")!).toBeInTheDocument();
  })
  })