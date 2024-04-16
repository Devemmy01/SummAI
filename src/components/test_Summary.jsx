import { render, screen, fireEvent } from "@testing-library/react";
import Summary from "./Summary";

describe("Summary component", () => {
  test("renders form inputs correctly", () => {
    render(<Summary />);
    
    const paragraphLengthInput = screen.getByPlaceholderText("Paragraph length");
    const languageDropdown = screen.getByText("English");
    const urlInput = screen.getByPlaceholderText("Enter a URL ");
    const submitButton = screen.getByRole("button", { name: "Send" });

    expect(paragraphLengthInput).toBeInTheDocument();
    expect(languageDropdown).toBeInTheDocument();
    expect(urlInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test("updates state when form inputs change", () => {
    render(<Summary />);
    
    const paragraphLengthInput = screen.getByPlaceholderText("Paragraph length");
    const languageDropdown = screen.getByText("English");
    const urlInput = screen.getByPlaceholderText("Enter a URL ");

    fireEvent.change(paragraphLengthInput, { target: { value: "5" } });
    fireEvent.click(languageDropdown);
    fireEvent.click(screen.getByText("Spanish"));
    fireEvent.change(urlInput, { target: { value: "https://example.com" } });

    expect(paragraphLengthInput.value).toBe("5");
    expect(languageDropdown.textContent).toBe("Spanish");
    expect(urlInput.value).toBe("https://example.com");
  });

  test("submits form and updates state on successful API response", async () => {
    render(<Summary />);
    
    const urlInput = screen.getByPlaceholderText("Enter a URL ");
    const submitButton = screen.getByRole("button", { name: "Send" });

    fireEvent.change(urlInput, { target: { value: "https://example.com" } });
    fireEvent.click(submitButton);

    // Simulate successful API response
    const mockSummary = "This is a summary";
    jest.spyOn(global, "fetch").mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ summary: mockSummary }),
      })
    );

    // Wait for API response and state update
    await screen.findByText(mockSummary);

    expect(screen.getByText(mockSummary)).toBeInTheDocument();
  });

  test("copies URL and summary to clipboard", () => {
    render(<Summary />);
    
    const urlInput = screen.getByPlaceholderText("Enter a URL ");
    const submitButton = screen.getByRole("button", { name: "Send" });

    fireEvent.change(urlInput, { target: { value: "https://example.com" } });
    fireEvent.click(submitButton);

    // Simulate successful API response
    const mockSummary = "This is a summary";
    jest.spyOn(global, "fetch").mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ summary: mockSummary }),
      })
    );

    fireEvent.click(screen.getByText("Copy URL"));
    fireEvent.click(screen.getByText("Copy Summary"));

    expect(screen.getByText("URL copied successfully")).toBeInTheDocument();
    expect(screen.getByText("Summary copied successfully")).toBeInTheDocument();
  });

  test("deletes article and updates state", () => {
    render(<Summary />);
    
    const urlInput = screen.getByPlaceholderText("Enter a URL ");
    const submitButton = screen.getByRole("button", { name: "Send" });

    fireEvent.change(urlInput, { target: { value: "https://example.com" } });
    fireEvent.click(submitButton);

    // Simulate successful API response
    const mockSummary = "This is a summary";
    jest.spyOn(global, "fetch").mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ summary: mockSummary }),
      })
    );

    fireEvent.click(screen.getByText("Delete"));

    expect(screen.queryByText(mockSummary)).not.toBeInTheDocument();
  });
});